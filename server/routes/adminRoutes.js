const Adminauth = require("../middlewares/adminAuth");
const express = require("express");
const router = express.Router();
const userC = require("../controllers/user-controller");
// const existingUserValidation = require("../middlewares/existingUserValidation")
// const { verificationAndBannedCheck } = require("../middlewares/verificationAndBannedCheck")
// const userC = require("../controllers/user-controller");
const adminAuth = require("../middlewares/adminAuth");
const urlC = require("../controllers/url-controller");

// Admin Auth For User
router.get("/user", adminAuth, userC.getAllUserByAdmin);
router.get("/user/:id", adminAuth, userC.getUserById);
router.delete('/user/:id', adminAuth, userC.deleteUserByAdmin);

// Admin Auth For Url
router.get("/url", adminAuth, urlC.getAllUrlsByAdmin);
router.get("/url/:id", adminAuth, urlC.getUrlByIdByAdmin);
router.delete("/url/:id", adminAuth, urlC.deleteUrlByIdByAdmin);

module.exports = router;