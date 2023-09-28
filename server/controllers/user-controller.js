const User = require("../models/user")
const { validateEmailAndPasswordForSignup } = require("../middlewares/emailAndPasswordValidation");
const userDetails = require("../models/userDetails");
const { sendEmail } = require("../utils/sendEmail")
const { sendEmailWithTemplate } = require("../utils/sendgridEmail")
const { generateVerificationLink } = require("../utils/generateVerifyLink")

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

        await session.commitTransaction(); // Commit the transaction
        session.endSession();

        return res.status(200).json({
          user: existingUser,
          token: token,
          message: 'User logged in successfully',
        });
      } else {
        return res.status(401).json({ error: [{ msg: 'Password is not correct' }] });
      }
    } else {
      return res.status(404).json({ error: [{ msg: 'User not found' }] });
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

    const validationResult = validateEmailAndPassword(email, password);

    if (validationResult.error) {
      console.error('Validation error:', validationResult.message);
      return res.status(400).json({ error: validationResult.message });
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

    dynamicTemplateData = {
      firstName,
      lastName,
      emailVerificationLink
    }
    sendEmailWithTemplate(process.env["VERIFYEMAILTEMPLATEID"], [email], dynamicTemplateData)
      .then(async () => {
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


module.exports = { signup, login };