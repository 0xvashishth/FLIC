const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const secret_key = process.env["JWT_SECRET_ADMIN"];
// admin schema !!
const adminSchema = new Schema({
  firstName: String,
  lastName: String,
  profilePicture: String,
  bio: String,
  tokens: [{ token: { type: String } }],
  Parameter1: String,
  Parameter2: String,
  Parameter3: Boolean,
  Parameter4: Boolean,
  Parameter5: Date,
});

adminSchema.methods.generateAuthToken = async function () {
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

adminSchema.methods.getPublicProfile = function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    bio: this.bio,
    profilePicture: this.profilePicture,
  };
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;