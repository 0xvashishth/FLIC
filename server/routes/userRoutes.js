const auth = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const userC = require("../controllers/user-controller");
const existingUserValidation = require("../middlewares/existingUserValidation")
const { verificationAndBannedCheck } = require("../middlewares/verificationAndBannedCheck")

// Get list of all users
router.get("/", userC.getAllUser);

// user signup
router.post("/signup", existingUserValidation, userC.signup);

// User Login
router.post("/login", loginValiations, userC.login);

// User Update
router.put("/edit", auth, verificationAndBannedCheck, userC.updateProfile);

// User Detele All Records
router.put("/delete", auth, verificationAndBannedCheck, userC.deleteProfile);

// Curently logged in user
router.get("/me", auth, verificationAndBannedCheck, userC.getMe);

// Update user details
// router.put("/user:id", userC.updateUser);

module.exports = router;