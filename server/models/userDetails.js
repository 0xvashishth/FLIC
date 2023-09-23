const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const secret_key = process.env["JWT_SECRET"];

const userDetailsSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  preferences: String,
  accountInformation: String,
  theme: String,
  emailNotifications: Boolean,
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

module.exports = mongoose.model("UserDetails", userDetailsSchema);
