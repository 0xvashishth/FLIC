const auth = require("../middlewares/auth");
// const adminAuth = require("../middlewares/adminAuth");
const express = require("express");
const router = express.Router();
const urlC = require("../controllers/url-controller");
const existingUserValidation = require("../middlewares/existingUserValidation")
const { verificationAndBannedCheck, verificationAndBannedCheckForLogin } = require("../middlewares/verificationAndBannedCheck")

// Normal User Routes
// Url created
router.post("/", auth, verificationAndBannedCheck, urlC.createUrl);

module.exports = router;