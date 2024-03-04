const UserDetails = require("../models/userDetails");

async function verifyToSendEmail(
  objectType,
  user,
  count = 0,
  isEmailNotification = true
) {
  const userDetails = await UserDetails.findOne({ userID: user._id });
  if (userDetails.emailNotifications) {
    switch (objectType) {
      case "form":
        if (isEmailNotification) {
          if (user.isPremiumUser) {
            if (count < process.env["PREMIUM_USER_FORM_EMAIL_COUNT"]) {
              return true;
            }
          } else {
            if (count < process.env["FREE_USER_FORM_EMAIL_COUNT"]) {
              return true;
            }
          }
        }
        break;
      case "url":
        if (isEmailNotification) {
          if (user.isPremiumUser) {
            if (count < process.env["PREMIUM_USER_URL_EMAIL_COUNT"]) {
              return true;
            }
          } else {
            if (count < process.env["FREE_USER_URL_EMAIL_COUNT"]) {
              return true;
            }
          }
        }
        break;
      case "chat":
        if (isEmailNotification) {
          if (user.isPremiumUser) {
            if (count < process.env["PREMIUM_USER_CHAT_EMAIL_COUNT"]) {
              return true;
            }
          } else {
            if (count < process.env["FREE_USER_CHAT_EMAIL_COUNT"]) {
              return true;
            }
          }
        }
        break;
      case "user":
        return true;
      default:
        return false;
    }
  }
  return false;
}


module.exports = {verifyToSendEmail}