const User = require("../models/user");
const {
  validateEmailAndPasswordForSignup,
} = require("../middlewares/emailAndPasswordValidation");
const userDetails = require("../models/userDetails");
const Chat = require("../models/chat");
const Form = require("../models/form");
const Url = require("../models/url");
// const { sendEmail } = require("../utils/sendEmail")
const { sendEmailWithTemplate } = require("../utils/sendgridEmail");
const { generateVerificationLink } = require("../utils/generateVerifyLink");
const { addDataToLogs } = require("./log-controller");
const {
  verificationAndBannedCheckForLogin,
} = require("../middlewares/userMiddleware");
const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var { sendEmail } = require("../utils/sendEmail");

const login = async (req, res, nxt) => {
  const { user } = req.body;
  const { password, email } = user;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingUser = await User.findOne({ email: email }).session(session);

    if (existingUser) {
      const matched = await bcrypt.compare(password, existingUser.password);
      const token = await existingUser.generateAuthToken();

      if (matched) {
        var chkAccess = await verificationAndBannedCheckForLogin(existingUser);

        if (!chkAccess) {
          await session.abortTransaction(); // Rollback the transaction
          session.endSession();
          return res.status(401).json({
            error:
              "Your email is not verified, Or you are banned to this platform! Please check your email!",
          });
        }

        addDataToLogs("User Login", existingUser._id);
        await session.commitTransaction(); // Commit the transaction
        session.endSession();

        const publicProfile = existingUser.getPublicProfile();

        return res.status(200).json({
          user: publicProfile,
          token,
          message: "User logged in successfully",
        });
      } else {
        await session.abortTransaction(); // Rollback the transaction
        session.endSession();
        return res.status(401).json({ error: "Password is not correct" });
      }
    } else {
      await session.abortTransaction(); // Rollback the transaction
      session.endSession();
      return res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

const signup = async (req, res, nxt) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    const { user } = req.body;

    const { password, email, firstName, lastName } = user;

    const validationResult = validateEmailAndPasswordForSignup(email, password);

    if (validationResult.error) {
      console.error("Validation error:", validationResult.message);
      throw new Error(validationResult.message);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    var emailVerificationLink = generateVerificationLink();
    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      emailVerificationLink,
    });
    const saveUserPromise = await newUser.save({ session });

    const newUserDetails = new userDetails({
      userID: saveUserPromise._id,
    });
    await newUserDetails.save({ session });

    var dynamicTemplateData = {
      firstName,
      lastName,
      emailVerificationLink,
    };
    // await sendEmailWithTemplate(process.env["VERIFYEMAILTEMPLATEID"], [email], dynamicTemplateData)
    //   .then(async () => {
    addDataToLogs("User signUp", saveUserPromise._id).then(async () => {
      await session.commitTransaction(); // Commit the transaction
      session.endSession();
      return res.status(201).json({
        message:
          "Verification Link Sent Successfully, Please check your emailBox for verification!",
      });
    });

    // })
    // .catch((error) => {
    //   throw error;
    // });
  } catch (err) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const forgotPassword = async (req, res, next) => {
  const { user } = req.body;
  const { email } = user;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    var existingUser = await User.findOne({ email: email }).session(session);

    if (existingUser) {
      var chkAccess = await verificationAndBannedCheckForLogin(existingUser);

      if (!chkAccess) {
        await session.abortTransaction(); // Rollback the transaction
        session.endSession();
        return res.status(401).json({
          error:
            "Your email is not verified, Or you are banned to this platform! Please check your email!",
        });
      }
      const token = await existingUser.generateAuthToken();
      existingUser.isForgotPasswordInitiated = true;
      existingUser.forgotPasswordToken = token;
      var currentDateTime = Date.now();
      existingUser.forgotPasswordInitiatedDate = currentDateTime;
      var url =
        process.env.CLIENT_ROOT_URL +
        "/forgotPassword/resetPassword?token=" +
        token +
        "&email=" +
        email +
        "&time=" +
        currentDateTime;
      var emailBody = `
        Hey ${existingUser.firstName}, Here's your link to reset your password: ${url}
        This Link is only valid for 30 mins :)
      `;
      await sendEmail("Password Reset Link", [email], emailBody);
      await existingUser.save();
      addDataToLogs("User Forgot Password Initiated", existingUser._id);
      await session.commitTransaction(); // Commit the transaction
      session.endSession();
      return res.status(200).json({
        message: "Reset link sent successfully to youe email 🚀",
      });
    } else {
      await session.abortTransaction(); // Rollback the transaction
      session.endSession();
      return res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

const forgotPasswordReset = async (req, res, next) => {
  const { user } = req.body;
  const { email, time, token, password } = user;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    var existingUser = await User.findOne({
      email: email,
      forgotPasswordInitiatedDate: time,
      forgotPasswordToken: token,
      isForgotPasswordInitiated: true,
    }).session(session);

    if (existingUser) {
      var chkAccess = await verificationAndBannedCheckForLogin(existingUser);

      if (!chkAccess) {
        await session.abortTransaction(); // Rollback the transaction
        session.endSession();
        return res.status(401).json({
          error:
            "Your email is not verified, Or you are banned to this platform! Please check your email!",
        });
      }
      const currentTime = Date.now();
      const linkCreationTime = parseInt(
        existingUser.forgotPasswordInitiatedDate
      );
      const timeDifference = currentTime - linkCreationTime;
      const thirtyMinutesInMillis = 30 * 60 * 1000;

      if (timeDifference > thirtyMinutesInMillis) {
        existingUser.forgotPasswordToken = token;
        existingUser.Parameter1 = "";
        existingUser.forgotPasswordInitiatedDate = null;
        existingUser.isForgotPasswordInitiated = false;
        await session.commitTransaction(); // Commit the transaction
        session.endSession();
        return res
          .status(401)
          .json({ error: "Reset Password Link Time Period Expired!" });
      }

      existingUser.forgotPasswordToken = "fpt";
      existingUser.Parameter1 = "";
      existingUser.forgotPasswordInitiatedDate = null;
      existingUser.isForgotPasswordInitiated = false;

      const hashedPassword = await bcrypt.hash(password, 12);
      existingUser.password = hashedPassword;

      await existingUser.save();
      addDataToLogs("User Forgot Password Reset Successful", existingUser._id);
      await session.commitTransaction(); // Commit the transaction
      session.endSession();
      return res.status(200).json({
        message: "Password Reset Successfully 🚀",
      });
    } else {
      await session.abortTransaction(); // Rollback the transaction
      session.endSession();
      return res.status(404).json({ error: "Entry Not Found 😥" });
    }
  } catch (err) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

const forgotPasswordResetCheck = async (req, res, next) => {
  const { user } = req.body;
  const { email, time, token } = user;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    var existingUser = await User.findOne({
      email: email,
      forgotPasswordInitiatedDate: time,
      forgotPasswordToken: token,
      isForgotPasswordInitiated: true,
    }).session(session);

    if (existingUser) {
      var chkAccess = await verificationAndBannedCheckForLogin(existingUser);

      if (!chkAccess) {
        await session.abortTransaction(); // Rollback the transaction
        session.endSession();
        return res.status(401).json({
          error:
            "Your email is not verified, Or you are banned to this platform! Please check your email!",
        });
      }
      const currentTime = Date.now();
      const linkCreationTime = parseInt(
        existingUser.forgotPasswordInitiatedDate
      );
      const timeDifference = currentTime - linkCreationTime;
      const thirtyMinutesInMillis = 30 * 60 * 1000;

      if (timeDifference > thirtyMinutesInMillis) {
        existingUser.forgotPasswordToken = token;
        existingUser.Parameter1 = "";
        existingUser.forgotPasswordInitiatedDate = null;
        existingUser.isForgotPasswordInitiated = false;
        await session.commitTransaction(); // Rollback the transaction
        session.endSession();
        return res.status(401).json({ error: "Reset Password Link Expired!" });
      }

      const token = await existingUser.generateAuthToken();
      existingUser.forgotPasswordToken = token;
      existingUser.Parameter1 = "InitialPasswordResetCheckDone";
      await existingUser.save();
      addDataToLogs("User Forgot Password Reset Check", existingUser._id);
      await session.commitTransaction(); // Commit the transaction
      session.endSession();
      return res.status(200).json({
        message: "You can reset your password 🚀",
        newToken: token,
      });
    } else {
      await session.abortTransaction(); // Rollback the transaction
      session.endSession();
      return res.status(404).json({ error: "Entry Not Found 😥" });
    }
  } catch (err) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

const updateProfile = async (req, res, nxt) => {
  const { user } = req.body;
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  const allowedAttributes = [
    "lastName",
    "firstName",
    "email",
    "bio",
    "profilePicture",
    "githubProfile",
    "githubUsername",
  ];

  try {
    const extraAttributes = Object.keys(user).filter(
      (attr) => !allowedAttributes.includes(attr)
    );

    if (extraAttributes.length > 0) {
      throw new Error(`Invalid attributes: ${extraAttributes.join(", ")}`);
    }

    await User.update(
      { _id: req.userId },
      { $set: user },
      { session },
      async (error, result) => {
        if (error) {
          throw new Error("Error in server!");
        } else {
          addDataToLogs("User Updated", req.userId);
          await session.commitTransaction(); // Commit the transaction
          session.endSession();
          return res.status(201).json({
            message: "User Updated Successfully!",
          });
        }
      }
    );
  } catch (error) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err);
    return res.status(500).json({ error: "Something Went Wrong" });
  }
};

const deleteProfile = async (req, res, nxt) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    await User.deleteOne({ _id: req.userId });

    await userDetails.deleteOne({ userID: req.userId });

    await Chat.deleteMany({ agent: req.userId });

    await Form.deleteMany({ userID: req.userId });

    await Url.deleteMany({ userID: req.userId });

    await FormDetails.deleteMany({
      FormID: {
        $in: (await Form.find({ userID: req.userId })).map((form) => form._id),
      },
    });

    await Form.deleteMany({ userID: req.userId });

    addDataToLogs("User All Records Deleted", req.userId);

    await session.commitTransaction(); // Commit the transaction
    session.endSession();

    return res.status(201).json({
      message: "User Deleted Successfully!",
    });
  } catch (error) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err);
    return res.status(500).json({ error: "Something Went Wrong" });
  }
};

const getMe = async (req, res, nxt) => {
  try {
    return res.status(201).json({
      message: "User Retrived Successfully!",
      user: await req.rootUser.getPublicProfile(),
    });
  } catch (error) {
    console.error(err);
    return res.status(500).json({ error: "Something Went Wrong" });
  }
};

//--------------------- Admin Controllers-------------------

const getAllUserByAdmin = async (req, res, nxt) => {
  try {
    // Pagination options (you can customize these)
    const page = req.query.page || 1; // Current page
    const limit = req.query.limit || 10; // Number of items per page

    // Calculate skip value based on the page and limit
    const skip = (page - 1) * limit;

    // Query to fetch users with pagination
    const users = await User.find({}).skip(skip).limit(limit);

    // Total count of users (you may want to calculate this separately)
    const totalCount = await User.countDocuments();

    return res.status(200).json({
      message: "User Retrieved Successfully!",
      users,
      totalCount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the provided ID is valid (mongoose.Types.ObjectId)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user was not found
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // User found, send a success response
    return res.status(200).json({
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    // Handle other errors
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const deleteUserByAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    await User.deleteOne({ _id: req.params.id });

    await userDetails.deleteOne({ userID: req.params.id });

    await Chat.deleteMany({ agent: req.params.id });

    await Form.deleteMany({ userID: req.params.id });

    await Url.deleteMany({ userID: req.params.id });

    await FormDetails.deleteMany({
      FormID: {
        $in: (
          await Form.find({ userID: req.params.id })
        ).map((form) => form._id),
      },
    });

    await Form.deleteMany({ userID: req.params.id });

    addDataToLogs("User All Records Deleted", req.params.id);

    await session.commitTransaction(); // Commit the transaction
    session.endSession();

    return res.status(201).json({
      message: "User Deleted Successfully!",
    });
  } catch (error) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err);
    return res.status(500).json({ error: "Something Went Wrong" });
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  forgotPasswordReset,
  forgotPasswordResetCheck,
  updateProfile,
  deleteProfile,
  getMe,
  getAllUserByAdmin,
  getUserById,
  deleteUserByAdmin,
};
