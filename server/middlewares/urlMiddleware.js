const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secret_key = process.env["JWT_SECRET"];
const FREE_USER_URL_COUNT = process.env["FREE_USER_URL_COUNT"];
const PREMIUM_USER_URL_COUNT = process.env["PREMIUM_USER_URL_COUNT"];

const urlLimitCheck = async (req, res, next) => {
  try {
    var userCheck = req.rootUser;
    if (!userCheck.isPremiumUser) {
      if (userCheck.urlCount + 1 > FREE_USER_URL_COUNT) {
        return res.status(400).json({
          error: "Maximum URL limit exceeded, Please upgrade your account.",
        });
      }
    } else {
      if (userCheck.urlCount + 1 > PREMIUM_USER_URL_COUNT) {
        return res.status(400).json({
          error:
            "Premium Account maximum URL limit exceeded, Please delete existing links before creating new one!",
        });
      }
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

const urlBannedCheck = async (req, res, next) => {
  try {
    var url = req.url;
    if (url.isBanned) {
        return res.status(400).json({
          error: "URL is banned, can't perform any actions!",
        });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Something went wrong!" });
  }
};

module.exports = { urlLimitCheck, urlBannedCheck };
