const Chat = require("../models/chat");
const Form = require("../models/form");
const Url = require("../models/url");
const { addDataToLogs } = require("./log-controller");
const { sendEmailWithTemplate } = require("../utils/sendgridEmail");
const { cloudinary } = require("../utils/uploadFileToCloudinary");

const createUrl = async (req, res) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    const { user } = req.rootUser;
    const { url } = req.body;

    const { originalURL, shortenedURL, description } = url;

    var existingShortenedURL = Url.findOne({ shortenedURL });

    if (existingShortenedURL) {
      return res.send(401).json({ error: "Shortened URL Already Exists" });
    }

    const newUrl = new Url({
      originalURL,
      shortenedURL,
      userID: user._id,
      isPremiumUrl: user.isPremiumUser,
      description,
    });

    const savePromise = await newUrl
      .save({
        session,
      })
      .catch((err) => {
        throw err;
      });
    var dynamicTemplateData = {
      originalURL,
      shortenedURL,
      description,
    };
    await sendEmailWithTemplate(
      process.env["URLCREATEDTEMPLATEID"],
      [user.email],
      dynamicTemplateData
    )
      .then(async () => {
        addDataToLogs("URL Created", savePromise._id);
        await session.commitTransaction(); // Commit the transaction
        session.endSession();
        return res.status(201).json({
          message: "URL Created Successfully!",
          url: newUrl,
        });
      })
      .catch((error) => {
        throw error;
      });
  } catch (err) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

const updateUrl = async (req, res, next) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    const { user } = req.rootUser;
    const { url } = req.body;

    const { _id, originalURL, shortenedURL, description } = url;

    var existingShortenedURL = Url.findOne({ shortenedURL });

    if (existingShortenedURL) {
      return res.send(401).json({ error: "Shortened URL Already Exists" });
    }

    await Url.updateOne(
      { _id },
      { shortenedURL, originalURL, description },
      { session }
    ).catch((err) => {
      throw err;
    });

    var dynamicTemplateData = {
      originalURL,
      shortenedURL,
      description,
    };
    await sendEmailWithTemplate(
      process.env["URLUPDATEDTEMPLATEID"],
      [user.email],
      dynamicTemplateData
    )
      .then(async () => {
        addDataToLogs("URL Updated", _id);
        await session.commitTransaction(); // Commit the transaction
        session.endSession();
        const newUrl = await Url.findById({ _id });
        return res.status(201).json({
          message: "URL Updated Successfully!",
          url: newUrl,
        });
      })
      .catch((error) => {
        throw error;
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
    const { user } = req.rootUser;
    const { url } = req.body;

    const { _id, originalURL, shortenedURL, description } = url;

    await URL.update({ _id }, { session }).catch((err) => {
      throw err;
    });

    var dynamicTemplateData = {
      originalURL,
      shortenedURL,
      description,
    };
    await sendEmailWithTemplate(
      process.env["URLDELETEDTEMPLATEID"],
      [user.email],
      dynamicTemplateData
    )
      .then(async () => {
        addDataToLogs("URL Deleted", _id);
        await session.commitTransaction(); // Commit the transaction
        session.endSession();
        return res.status(201).json({
          message: "URL Deleted Successfully!",
        });
      })
      .catch((error) => {
        throw error;
      });
  } catch (err) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

const createQR = async (req, res) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    // const { user } = req.rootUser;
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
      { qrCodeImageUrl: result.secure_url },
      { session }
    )
      .then(async (response) => {
        addDataToLogs("QR Code Uploaded", _id);
        await session.commitTransaction(); // Commit the transaction
        session.endSession();

        res.status(200).json({ message: "File uploaded successfully." });
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

module.exports = { createUrl, updateUrl, deleteUrl, createQR };
