const User = require("../models/user")
const { validateEmailAndPasswordForSignup } = require("../middlewares/emailAndPasswordValidation");
const userDetails = require("../models/userDetails");
const Chat = require("../models/chat");
const Form = require("../models/form");
const Url = require("../models/url");
// const { sendEmail } = require("../utils/sendEmail")
const { sendEmailWithTemplate } = require("../utils/sendgridEmail")
const { generateVerificationLink } = require("../utils/generateVerifyLink")
const { addDataToLogs } = require("./log-controller")

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
        addDataToLogs("User Login", existingUser._id);
        await session.commitTransaction(); // Commit the transaction
        session.endSession();

        const publicProfile = existingUser.getPublicProfile();

        return res.status(200).json({
          user: publicProfile,
          token,
          message: 'User logged in successfully',
        });
      } else {
        await session.abortTransaction(); // Rollback the transaction
        session.endSession();
        return res.status(401).json({ error: 'Password is not correct' });
      }
    } else {
      await session.abortTransaction(); // Rollback the transaction
      session.endSession();
      return res.status(404).json({ error: 'User not found' });
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
      console.error('Validation error:', validationResult.message);
      throw new Error(validationResult.message);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    var emailVerificationLink = generateVerificationLink()
    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      emailVerificationLink
    });
    const saveUserPromise = await newUser.save({ session });

    const newUserDetails = new userDetails({
      userID: saveUserPromise._id
    });
    await newUserDetails.save({ session });

    var dynamicTemplateData = {
      firstName,
      lastName,
      emailVerificationLink
    }
    await sendEmailWithTemplate(process.env["VERIFYEMAILTEMPLATEID"], [email], dynamicTemplateData)
      .then(async () => {
        addDataToLogs("User signUp", saveUserPromise._id);
        await session.commitTransaction(); // Commit the transaction
        session.endSession();
        return res.status(201).json({
          message: 'Verification Link Sent Successfully, Please check your emailBox for verification!',
        });
      })
      .catch((error) => {
        throw error;
      });
  } catch (err) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err);
    return res.status(500).json({ error: "Something Went Wrong" });
  }
};

const updateProfile = async (req, res, nxt) => {
  const { user } = req.body;
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  const allowedAttributes = [
    'lastName',
    'firstName',
    'email',
    'bio',
    'profilePicture',
    'githubProfile',
    'githubUsername',
  ];

  try {
    const extraAttributes = Object.keys(user).filter(
      (attr) => !allowedAttributes.includes(attr)
    );

    if (extraAttributes.length > 0) {
      throw new Error(`Invalid attributes: ${extraAttributes.join(', ')}`);
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
            message: 'User Updated Successfully!',
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

}

const deleteProfile = async (req, res, nxt) => {

  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {

    await User.deleteOne(
      { _id: req.userId }
    );

    await userDetails.deleteOne(
      { userID: req.userId }
    );

    await Chat.deleteMany(
      { agent: req.userId }
    );

    await Form.deleteMany(
      { userID: req.userId }
    );

    await Url.deleteMany(
      { userID: req.userId }
    );

    await FormDetails.deleteMany({ FormID: { $in: (await Form.find({ userID: req.userId })).map(form => form._id) } });

    await Form.deleteMany({ userID: req.userId });

    addDataToLogs("User All Records Deleted", req.userId);

    await session.commitTransaction(); // Commit the transaction
    session.endSession();
    
    return res.status(201).json({
      message: 'User Deleted Successfully!',
    });
  } catch (error) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err);
    return res.status(500).json({ error: "Something Went Wrong" });
  }

}

module.exports = { signup, login, updateProfile, deleteProfile };