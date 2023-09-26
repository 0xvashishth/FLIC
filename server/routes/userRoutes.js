const auth = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const userC = require("../controllers/user-controller");
const existingUserValidation = require("../middlewares/existingUserValidation")

// Get list of all users
router.get("/", userC.getAllUser);

// user signup
router.post("/signup", existingUserValidation , userC.signup);

// User Login
router.post("/login", loginValiations, userC.login);

// User Update
router.put("/edit", existingUserValidation);

// Curently logged in user
// router.get("/me", protect, userC.getMe);

// Update user details
// router.put("/user:id", userC.updateUser);

module.exports = router;