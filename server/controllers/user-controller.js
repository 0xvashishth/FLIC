const User = require("../models/user");
const {
  validateEmailAndPasswordForSignup,
} = require("../middlewares/emailAndPasswordValidation");
const userDetails = require("../models/userDetails");
const Chat = require("../models/chat");
const Form = require("../models/form");
const Url = require("../models/url");
const FormDetails = require("../models/formRequestDetails");
// const { sendEmail } = require("../utils/sendEmail")
const { sendEmailWithTemplate } = require("../utils/sendgridEmail");
const {
  generateVerificationLink,
  generatePasswordResetLink,
  getUuidToken,
} = require("../utils/generateVerifyLink");
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
    var { emailVerificationLink, emailVerificationToken } =
      generateVerificationLink(email);
    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      emailVerificationToken,
    });
    const saveUserPromise = await newUser.save({ session });

    const newUserDetails = new userDetails({
      userID: saveUserPromise._id,
    });
    await newUserDetails.save({ session });
    var emailBody = `
        Hey ${firstName}, Click Below link to verify your account: ${emailVerificationLink}
      `;
    await sendEmail("Verfication on FLIC", [email], emailBody)
      .then(() => {
        addDataToLogs("User signUp", saveUserPromise._id).then(async () => {
          await session.commitTransaction(); // Commit the transaction
          session.endSession();
          return res.status(201).json({
            message:
              "Verification Link Sent Successfully, Please check your emailBox for verification!",
          });
        });
      })
      .catch((error) => {
        throw error;
      });
  } catch (err) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const emailVerification = async (req, res) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    const { token, email } = req.query;
    if (!token || !email) {
      return res.send(`
      <html>
          <head>
            <title>FLIC Verification Page..</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 90vh;
                margin: 0;
              }
            </style>
            <script>
              // Display a countdown timer and redirect after 5 seconds
              let countdown = 5;
              function updateTimer() {
                document.getElementById('timer').innerText = countdown;
                countdown--;
  
                if (countdown < 0) {
                  window.location.href = '${process.env.CLIENT_ROOT_URL}';
                } else {
                  setTimeout(updateTimer, 1000);
                }
              }
              
              window.onload = function() {
                updateTimer();
              };
            </script>
          </head>
          <body>
            <img src="https://github.com/vasu-1/FLIC/assets/76911582/ad679078-7ba8-4cd9-8f1f-065ba17b538c" alt="Logo" width="auto" height="300rem">
            <h4>You went wrong, Redirecting to FLIC in <span id="timer">5</span> seconds...</h4>
          </body>
        </html>
      `);
    } else {
      var existingUser = await User.findOne({
        email: email,
        emailVerificationToken: token,
      }).session(session);

      if (existingUser) {
        existingUser.emailVerificationToken = "";
        existingUser.isEmailVerified = true;
        var emailBody = `
        Hey ${existingUser.firstName}, You are verified on FLIC, You may Login now 🚀
      `;
        await sendEmail("You are verified on FLIC", [email], emailBody);
        await existingUser.save();
        addDataToLogs("User Verification", existingUser._id);
        await session.commitTransaction(); // Commit the transaction
        session.endSession();
        return res.send(`
      <html>
          <head>
            <title>FLIC Verification Page..</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 90vh;
                margin: 0;
              }
            </style>
            <script>
              // Display a countdown timer and redirect after 5 seconds
              let countdown = 5;
              function updateTimer() {
                document.getElementById('timer').innerText = countdown;
                countdown--;
  
                if (countdown < 0) {
                  window.location.href = '${process.env.CLIENT_ROOT_URL}/login';
                } else {
                  setTimeout(updateTimer, 1000);
                }
              }
              
              window.onload = function() {
                updateTimer();
              };
            </script>
          </head>
          <body>
            <img src="https://github.com/vasu-1/FLIC/assets/76911582/ad679078-7ba8-4cd9-8f1f-065ba17b538c" alt="Logo" width="auto" height="300rem">
            <h4>You are verified, Redirecting to FLIC in <span id="timer">5</span> seconds...</h4>
          </body>
        </html>
      `);
      } else {
        await session.abortTransaction(); // Rollback the transaction
        session.endSession();
        return res.send(`
      <html>
          <head>
            <title>FLIC Verification Page..</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 90vh;
                margin: 0;
              }
            </style>
            <script>
              // Display a countdown timer and redirect after 5 seconds
              let countdown = 5;
              function updateTimer() {
                document.getElementById('timer').innerText = countdown;
                countdown--;
  
                if (countdown < 0) {
                  window.location.href = '${process.env.CLIENT_ROOT_URL}';
                } else {
                  setTimeout(updateTimer, 1000);
                }
              }
              
              window.onload = function() {
                updateTimer();
              };
            </script>
          </head>s
          <body>
            <img src="https://github.com/vasu-1/FLIC/assets/76911582/ad679078-7ba8-4cd9-8f1f-065ba17b538c" alt="Logo" width="auto" height="300rem">
            <h4>User not found on FLIC, Redirecting in <span id="timer">5</span> seconds...</h4>
          </body>
        </html>
      `);
      }
    }
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
      var currentDateTime = Date.now();
      const { resetLink, token } = generatePasswordResetLink(
        currentDateTime,
        email
      );
      existingUser.isForgotPasswordInitiated = true;
      existingUser.forgotPasswordToken = token;
      existingUser.forgotPasswordInitiatedDate = currentDateTime;
      var emailBody = `
        Hey ${existingUser.firstName}, Here's your link to reset your password: ${resetLink}
        This Link is only valid for 30 mins :)
      `;
      await sendEmail("Password Reset Link", [email], emailBody);
      await existingUser.save();
      addDataToLogs("User Forgot Password Initiated", existingUser._id);
      await session.commitTransaction(); // Commit the transaction
      session.endSession();
      return res.status(200).json({
        message: "Reset link sent successfully to your email 🚀",
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

      // const token = getUuidToken();
      // existingUser.forgotPasswordToken = token;
      existingUser.Parameter1 = "InitialPasswordResetCheckDone";
      await existingUser.save();
      addDataToLogs("User Forgot Password Reset Check", existingUser._id);
      await session.commitTransaction(); // Commit the transaction
      session.endSession();
      return res.status(200).json({
        message: "You can reset your password 🚀",
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
    "bio",
    "profilePicture",
    "githubProfile",
  ];
  try {
    // const extraAttributes = Object.keys(user).filter(
    //   (attr) => !allowedAttributes.includes(attr)
    // );

    const filteredUser = allowedAttributes.reduce((acc, attribute) => {
      if (user.hasOwnProperty(attribute)) {
        acc[attribute] = user[attribute];
      }
      return acc;
    }, {});

    // if (extraAttributes.length > 0) {
    //   throw new Error(`Invalid attributes: ${extraAttributes.join(", ")}`);
    // }
    await User.findByIdAndUpdate(
      { _id: req.userId },
      { $set: filteredUser },
      { session }
    );
    console.log("Updated");
    addDataToLogs("User Updated", req.userId);
    await session.commitTransaction(); // Commit the transaction
    session.endSession();
    return res.status(201).json({
      message: "User Updated Successfully!",
    });

    // return res.status(200).json({message: "profile updated"})
  } catch (error) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(error);
    return res.status(500).json({ error: "Something Went Wrong" });
  }
};

const deleteProfile = async (req, res, nxt) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    await userDetails.findOneAndDelete({ userID: req.userId });

    await Chat.deleteMany({ agent: req.userId });

    await Url.deleteMany({ userID: req.userId });

    await FormDetails.deleteMany({
      FormID: {
        $in: (await Form.find({ userID: req.userId })).map((form) => form._id),
      },
    });

    await Form.deleteMany({ userID: req.userId });

    await User.findByIdAndDelete({ _id: req.userId });

    addDataToLogs("User All Records Deleted", req.userId);

    await session.commitTransaction(); // Commit the transaction
    session.endSession();

    return res.status(201).json({
      message: "User Deleted Successfully!",
    });
  } catch (error) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(error);
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
    

    await Chat.deleteMany({ agent: req.params.id });

    await Url.deleteMany({ userID: req.params.id });

    await FormDetails.deleteMany({
      FormID: {
        $in: (
          await Form.find({ userID: req.params.id })
        ).map((form) => form._id),
      },
    });

    await Form.deleteMany({ userID: req.params.id });

    await User.deleteOne({ _id: req.params.id });

    await userDetails.deleteOne({ userID: req.params.id });

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
  emailVerification,
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
