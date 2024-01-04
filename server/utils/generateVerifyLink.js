const uuid = require("uuid");

function generateVerificationLink(email) {
  const emailVerificationToken = uuid.v4();
  const emailVerificationLink = `${process.env["SERVER_ROOT_URL"]}/api/v1/user/verifyemail?token=${emailVerificationToken}&email=${email}`;
  return { emailVerificationLink, emailVerificationToken };
}

function generatePasswordResetLink(currentDateTime, email) {
  const token = uuid.v4();
  const resetLink =
    process.env.CLIENT_ROOT_URL +
    "/forgotPassword/resetPassword?token=" +
    token +
    "&email=" +
    email +
    "&time=" +
    currentDateTime;
  return { resetLink, token };
}

function getUuidToken() {
  return uuid.v4();
}

module.exports = {
  generateVerificationLink,
  generatePasswordResetLink,
  getUuidToken,
};
