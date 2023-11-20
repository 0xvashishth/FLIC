const auth = require("../middlewares/auth");
// const adminAuth = require("../middlewares/adminAuth");
const express = require("express");
const router = express.Router();
const formC = require("../controllers/form-controller");
const { verificationAndBannedCheck, isUserPremiumCheck } = require("../middlewares/userMiddleware")
const {formLimitCheck, formBannedCheck, isOwnerOfForm} = require("../middlewares/formMiddleware")

// Normal User Routes
// Form created
// If we need premium user service, use isUserPremiumCheck middleware
router.post("/", auth, verificationAndBannedCheck, formLimitCheck, formC.createForm);


module.exports = router;