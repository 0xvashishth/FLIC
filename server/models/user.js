const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const secret_key = process.env["JWT_SECRET"];

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    profilePicture: String,
    bio: String,
    githubProfile: String,
    githubUsername: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    registrationDate: { type: Date, default: Date.now },
    tokens: [{ token: { type: String } }],
    isEmailVerified: { type: Boolean, required: true, default: false },
    isBanned: { type: Boolean, required: true, default: false}
  }
);

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

module.exports = mongoose.model("User", userSchema);
