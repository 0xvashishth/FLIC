const auth = require("../middlewares/auth");
// const adminAuth = require("../middlewares/adminAuth");
const express = require("express");
const router = express.Router();
const urlC = require("../controllers/url-controller");
const existingUserValidation = require("../middlewares/existingUserValidation")
const { verificationAndBannedCheck, isUserPremiumCheck } = require("../middlewares/userMiddleware")
const {urlLimitCheck, urlBannedCheck} = require("../middlewares/urlMiddleware")

// Normal User Routes
// Url created
router.post("/", auth, verificationAndBannedCheck, urlLimitCheck, urlC.createUrl);
router.put("/", auth, verificationAndBannedCheck, isUserPremiumCheck, urlBannedCheck, urlC.updateUrl)
router.delete("/", auth, verificationAndBannedCheck, urlBannedCheck, urlC.deleteUrl);
//increasing, decreasing url count remaining!!
module.exports = router;