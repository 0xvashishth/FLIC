const auth = require("../middlewares/auth");
// const adminAuth = require("../middlewares/adminAuth");
const express = require("express");
const router = express.Router();
const userC = require("../controllers/user-controller");
const existingUserValidation = require("../middlewares/existingUserValidation")
const { verificationAndBannedCheck, verificationAndBannedCheckForLogin } = require("../middlewares/userMiddleware")

// Normal User Routes
// user signup
router.post("/signup", existingUserValidation, userC.signup);

// User Login
// No middleware needed for now, it's implemented in controller :)
router.post("/login", userC.login);

// User Verification
router.get("/verifyemail", userC.emailVerification);

// User Forgot Password
router.post("/forgot_password", userC.forgotPassword);

// User Forgot Password Reset
router.post("/forgot_password_reset", userC.forgotPasswordReset);

// User Forgot Password Reset Check
router.post("/forgot_password_reset_check", userC.forgotPasswordResetCheck);

// User Update
router.put("/", auth, verificationAndBannedCheck, userC.updateProfile);

// User Detele All Records
router.delete("/", auth, verificationAndBannedCheck, userC.deleteProfile);

// Curently logged in user
router.get("/me", auth, verificationAndBannedCheck, userC.getMe);

//details in user dashboard
router.get("/mydashboard", auth, verificationAndBannedCheck, userC.getUserDashboardDetails);
// Update and Get user details
router.get("/userdetails", auth, verificationAndBannedCheck, userC.getUserPreferences);
router.put("/userdetails", auth, verificationAndBannedCheck, userC.changeUserPreferences);
// for announcement purpose
// not implemented live for publishing the announcement, need to do manually from local system
router.post("/createAnnoucement", userC.addAnnouncementByAdmin);

// router.put("/user:id", userC.updateUser);

module.exports = router;