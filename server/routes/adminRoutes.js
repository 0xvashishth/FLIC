const Adminauth = require("../middlewares/adminAuth");
const express = require("express");
const router = express.Router();
const userC = require("../controllers/user-controller");
// const existingUserValidation = require("../middlewares/existingUserValidation")
// const { verificationAndBannedCheck } = require("../middlewares/verificationAndBannedCheck")
const userC = require("../controllers/user-controller");
const adminAuth = require("../middlewares/adminAuth");

// Admin Auth
router.get("/", adminAuth, userC.getAllUser);
router.get("/:id", adminAuth, userC.getUserById);
router.delete('/:id', adminAuth, userC.deleteUserByAdmin);

module.exports = router;