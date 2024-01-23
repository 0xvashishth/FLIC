const auth = require("../middlewares/auth");
// const adminAuth = require("../middlewares/adminAuth");
const express = require("express");
const router = express.Router();
const urlC = require("../controllers/url-controller");
const {
  verificationAndBannedCheck,
  isUserPremiumCheck,
} = require("../middlewares/userMiddleware");
const {
  urlLimitCheck,
  urlBannedCheck,
  isOwnerOfUrl,
} = require("../middlewares/urlMiddleware");

// Normal User Routes
// Url created
// If we need premium user service, use isUserPremiumCheck middleware
router.post(
  "/",
  auth,
  verificationAndBannedCheck,
  urlLimitCheck,
  urlC.createUrl
);
router.put(
  "/",
  auth,
  verificationAndBannedCheck,
  isOwnerOfUrl,
  urlBannedCheck,
  urlC.updateUrl
);
router.delete(
  "/",
  auth,
  verificationAndBannedCheck,
  isOwnerOfUrl,
  urlBannedCheck,
  urlC.deleteUrl
);
// here below multer must be used to handle the files in the request, that is remaining..!
router.put(
  "/createqr",
  auth,
  verificationAndBannedCheck,
  isOwnerOfUrl,
  urlBannedCheck,
  urlC.createQR
);
router.put(
  "/removeqr",
  auth,
  verificationAndBannedCheck,
  isOwnerOfUrl,
  urlBannedCheck,
  urlC.deleteQR
);
router.get("/", auth, verificationAndBannedCheck, urlC.getUrls);
router.get("/checksuffixurl", urlC.getUrlSuffix);
router.get("/:id", auth, verificationAndBannedCheck, urlC.getUrlByIdByAdmin);

module.exports = router;
