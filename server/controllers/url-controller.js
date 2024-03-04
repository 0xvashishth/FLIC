const Url = require("../models/url");
const User = require("../models/user");
const { addDataToLogs } = require("./log-controller");
const { cloudinary } = require("../utils/uploadFileToCloudinary");
const mongoose = require("mongoose");
const { linkCreatedMailScript } = require("../utils/emailScript");
const { sendEmailWithSendGrid } = require("../utils/sendgridEmail");
const { verifyToSendEmail } = require("../utils/verifyToSendEmail");

const createUrl = async (req, res) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    const user = req.rootUser;
    const { url } = req.body;
    var { originalURL, shortenedSuffix, title } = url;

    var existingShortenedURL = await Url.findOne({ shortenedSuffix });
    var ShortenedUrl = process.env["SERVER_ROOT_URL"] + "/l/" + shortenedSuffix;
    if (existingShortenedURL) {
      await session.abortTransaction(); // Commit the transaction
      session.endSession();
      return res.status(401).json({ error: "Shortened Suffix Already Exists" });
    } else {
      const newUrl = new Url({
        originalURL,
        shortenedSuffix,
        userID: user._id,
        isPremiumUrl: user.isPremiumUser,
        title,
      });

      const savePromise = await newUrl
        .save({
          session,
        })
        .catch((err) => {
          throw err;
        });
      if (await verifyToSendEmail("user", user)) {
        user.urlEmailNotificationCount += 1;
        await sendEmailWithSendGrid(
          "Link Created",
          [user.email],
          linkCreatedMailScript(
            user.firstName,
            title,
            originalURL,
            ShortenedUrl
          )
        );
      }
      await addDataToLogs("URL Created", savePromise._id);
      // increase the url count
      user.urlCount += 1;
      await user.save({ session });
      await session.commitTransaction(); // Commit the transaction
      session.endSession();
      return res.status(201).json({
        message: "URL Created Successfully!",
        url: newUrl,
      });
    }
  } catch (err) {
    console.error(err.message);
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    // console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

const updateUrl = async (req, res, next) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    // const { user } = req.rootUser;
    const { url } = req.body;
    const _id = req.url._id;
    const { isActive, originalURL, shortenedSuffix, title } = url;
    var existingShortenedURL = await Url.findOne({ shortenedSuffix });
    if (existingShortenedURL) {
      if (shortenedSuffix != req.url.shortenedSuffix) {
        await session.abortTransaction(); // Commit the transaction
        session.endSession();
        return res.status(401).json({ error: "Shortened URL Already Exists" });
      }
    }
    await Url.updateOne(
      { _id }, // this is when we are adding there in the
      { shortenedSuffix, originalURL, title, isActive },
      { session }
    ).catch((err) => {
      throw err;
    });
    await addDataToLogs("URL Updated", _id);
    await session.commitTransaction(); // Commit the transaction
    session.endSession();
    const newUrl = await Url.findById(_id);
    return res.status(201).json({
      message: "URL Updated Successfully!",
      url: newUrl,
    });
  } catch (err) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

const deleteUrl = async (req, res, next) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    const user = req.rootUser;
    const url = req.url;

    const { _id } = url;

    await Url.deleteOne({ _id }, { session }).catch((err) => {
      throw err;
    });

    user.urlCount -= 1;
    await user.save({ session });
    await addDataToLogs("URL Deleted", _id);
    await session.commitTransaction(); // Commit the transaction
    session.endSession();
    return res.status(201).json({
      message: "URL Deleted Successfully!",
    });
  } catch (err) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

const getUrlSuffix = async (req, res) => {
  const shortenedSuffix = req.query.suffixUrl;

  try {
    if (shortenedSuffix == "") {
      return res.status(200).json({
        message: "no",
      });
    } else {
      var existingShortenedURL = await Url.findOne({ shortenedSuffix });
      if (!existingShortenedURL) {
        return res.status(200).json({
          message: "ok",
        });
      } else {
        return res.status(200).json({
          message: "no",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUrls = async (req, res) => {
  try {
    // Not Implementing the pagination for one user

    // Pagination options (you can customize these)
    // const page = req.query.page || 1; // Current page
    // const limit = req.query.limit || 10; // Number of items per page

    // Calculate skip value based on the page and limit
    // const skip = (page - 1) * limit;

    // Query to fetch urls with pagination
    const urls = await Url.find({ userID: req.userId });
    // .skip(skip)
    // .limit(limit);

    // Total count of urls (you may want to calculate this separately)
    // const totalCount = await Url.countDocuments();

    return res.status(200).json({
      message: "URLs Retrieved Successfully!",
      urls,
      // totalCount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

// ------ Admin Controllers -----
const deleteUrlByIdByAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    const user = req.user;
    const urlId = req.params.id;
    const url = Url.findOneById(urlId);
    if (!url) {
      await session.commitTransaction(); // Commit the transaction
      session.endSession();
      return res.status(404).json({
        message: "URL Not Found!",
      });
    }
    const { _id, originalURL, shortenedSuffix, title } = url;

    const linkOwner = await User.findById(url.userID);

    await Url.deleteOne({ _id }, { session }).catch((err) => {
      throw err;
    });
    // decreasing the url count
    linkOwner.urlCount -= 1;
    // sending the url notification to the url owner
    await sendEmailWithSendGrid(
      "URL DELETED BY ADMIN",
      [linkOwner.email],
      `Your URL Named ${title} has been deleted by FLIC Admin`
    );
    await addDataToLogs("URL Deleted By Admin", _id);
    await linkOwner.save({ session });
    await session.commitTransaction(); // Commit the transaction
    session.endSession();
    return res.status(201).json({
      message: "URL Deleted Successfully!",
    });
  } catch (err) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

const getAllUrlsByAdmin = async (req, res) => {
  try {
    // Pagination options (you can customize these)
    const page = req.query.page || 1; // Current page
    const limit = req.query.limit || 10; // Number of items per page

    // Calculate skip value based on the page and limit
    const skip = (page - 1) * limit;

    // Query to fetch urls with pagination
    const urls = await Url.find({}).skip(skip).limit(limit);

    // Total count of urls (you may want to calculate this separately)
    const totalCount = await Url.countDocuments();

    return res.status(200).json({
      message: "URLs Retrieved Successfully!",
      urls,
      totalCount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

const getUrlByIdByAdmin = async (req, res) => {
  try {
    const urlId = req.params.id;

    // Check if the provided ID is valid (mongoose.Types.ObjectId)
    if (!mongoose.Types.ObjectId.isValid(urlId)) {
      return res.status(400).json({ error: "Invalid URL ID" });
    }

    // Find the user by ID
    const url = await Url.findById(urlId);

    // Check if the user was not found
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    // User found, send a success response
    return res.status(200).json({
      message: "URL retrieved successfully",
      url,
    });
  } catch (err) {
    console.error(err.message);
    // Handle other errors
    return res.status(500).json({
      error: err.message,
    });
  }
};

// currently of no use Functions
const createQR = async (req, res) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    const { user } = req.rootUser;
    const { url } = req.body;
    const { _id } = url;
    const uploadedFile = req.file;

    const result = await cloudinary.uploader
      .upload(uploadedFile.path)
      .catch((err) => {
        throw err;
      });
    console.log("File uploaded to Cloudinary:", result.secure_url);
    await Url.updateOne(
      { _id },
      {
        qrCodeImageUrl: result.secure_url,
        qrCodeImagePublicId: result.public_id,
      },
      { session }
    )
      .then(async (response) => {
        addDataToLogs("QR Code Uploaded", _id);
        // changing count in user model
        increaseDecreaseCount(user, true, "increase", session).catch((err) => {
          throw err;
        });
        const newUrl = await Url.findById({ _id });
        await session.commitTransaction(); // Commit the transaction
        session.endSession();

        res
          .status(200)
          .json({ message: "QR Created successfully.", url: newUrl });
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

const deleteQR = async (req, res) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    const { user } = req.rootUser;
    const { url } = req.body;
    const { _id } = url;

    await Url.updateOne(
      { _id },
      { qrCodeImageUrl: "", qrCodeImagePublicId: "" },
      { session }
    )
      .then(async (response) => {
        deleteFileFromCloud(url.qrCodeImagePublicId).catch((err) => {
          throw err;
        });
        addDataToLogs("QR Code Removed", _id);
        // changing count in user model
        increaseDecreaseCount(user, true, "qrdecrease", session).catch(
          (err) => {
            throw err;
          }
        );
        const newUrl = await Url.findById({ _id });
        await session.commitTransaction(); // Commit the transaction
        session.endSession();

        res
          .status(200)
          .json({ message: "QR Removed successfully.", url: newUrl });
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

// ----Support Function But No Use----
const deleteFileFromCloud = async (imageId) => {
  await cloudinary.uploader.destroy(imageId).catch((err) => {
    throw err;
  });
  return;
};

const increaseDecreaseCount = async (user, qr = false, action, session) => {
  if ((action = "qrdecrease")) {
    await User.updateOne(
      { _id: user._id },
      { qrCount: --user.qrCount },
      { session }
    ).catch((err) => {
      throw err;
    });
  } else if ((action = "decrease")) {
    if (qr) {
      await User.updateOne(
        { _id: user._id },
        { qrCount: --user.qrCount, urlCount: --user.urlCount },
        { session }
      ).catch((err) => {
        throw err;
      });
    } else {
      await User.updateOne(
        { _id: user._id },
        { urlCount: --user.urlCount },
        { session }
      ).catch((err) => {
        throw err;
      });
    }
  } else if ((action = "increase")) {
    if (qr) {
      await User.updateOne(
        { _id: user._id },
        { qrCount: ++user.qrCount },
        { session }
      ).catch((err) => {
        throw err;
      });
    } else {
      await User.updateOne(
        { _id: user._id },
        { urlCount: ++user.urlCount },
        { session }
      ).catch((err) => {
        throw err;
      });
    }
  } else {
    throw new Error("Invalid Number, Server Error!");
  }
  return true;
};

module.exports = {
  createUrl,
  updateUrl,
  deleteUrl,
  createQR,
  deleteQR,
  getUrlSuffix,
  deleteUrlByIdByAdmin,
  getAllUrlsByAdmin,
  getUrlByIdByAdmin,
  getUrls,
};
