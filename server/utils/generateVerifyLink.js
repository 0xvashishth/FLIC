const uuid = require('uuid');

function generateVerificationLink() {
    const token = uuid.v4();
    const verificationLink = `${process.env["ROOT_DOMAIN"]}/user/verify/${token}`;
    return verificationLink;
}

module.exports = {generateVerificationLink}