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
// done
router.post(
  "/",
  auth,
  verificationAndBannedCheck,
  urlLimitCheck,
  urlC.createUrl
);
// done
router.put(
  "/:id",
  auth,
  verificationAndBannedCheck,
  urlBannedCheck,
  isOwnerOfUrl,
  urlC.updateUrl
);
router.delete(
  "/:id",
  auth,
  verificationAndBannedCheck,
  urlBannedCheck,
  isOwnerOfUrl,
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
// done
router.get("/", auth, verificationAndBannedCheck, urlC.getUrls);
// done
router.get("/checksuffixurl", urlC.getUrlSuffix);
// done
router.get("/:id", auth, verificationAndBannedCheck, urlC.getUrlByIdByAdmin);

module.exports = router;
