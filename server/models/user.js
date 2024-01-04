const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const secret_key = process.env["JWT_SECRET"];

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  profilePicture: String,
  bio: String,
  githubProfile: String,
  githubUsername: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  tokens: [{ token: { type: String } }],
  emailVerificationToken: { type: String, require: true },
  isEmailVerified: { type: Boolean, required: true, default: false },
  isBanned: { type: Boolean, required: true, default: false },
  isPremiumUser: { type: Boolean, required: true, default: false },
  forgotPasswordToken: { type: String, required: true, default: "fpt" },
  forgotPasswordInitiatedDate: { type: Date },
  isForgotPasswordInitiated: { type: Boolean, required: true, default: false },
  urlCount: { type: Number, default: 0 },
  qrCount: { type: Number, default: 0 },
  Parameter1: String,
  Parameter2: String,
  Parameter3: Boolean,
  Parameter4: Boolean,
  Parameter5: Date,
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let newtoken = jwt.sign({ _id: this._id }, secret_key, {
      expiresIn: "30d",
    });
    this.tokens = this.tokens.concat({ token: newtoken });
    await this.save();
    return newtoken;
  } catch (err) {
    console.log(err);
  }
};

userSchema.methods.getPublicProfile = function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    bio: this.bio,
    profilePicture: this.profilePicture,
    githubProfile: this.githubProfile,
    githubUsername: this.githubUsername,
    isEmailVerified: this.isEmailVerified,
    isBanned: this.isBanned,
    isPremiumUser: this.isPremiumUser,
    urlCount: this.urlCount,
    qrCount: this.qrCount,
  };
};

const User = mongoose.model('User', userSchema);

module.exports = User;