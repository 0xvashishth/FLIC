const auth = require("../middlewares/auth");
// const adminAuth = require("../middlewares/adminAuth");
const express = require("express");
const router = express.Router();
const chatC = require("../controllers/chat-controller");
const {
  verificationAndBannedCheck,
  isUserPremiumCheck,
} = require("../middlewares/userMiddleware");
const {
  chatBannedCheck,
  chatLimitCheck,
  isOwnerOfChat,
} = require("../middlewares/chatMiddleware");

// Normal User Routes
// Chat created
// If we need premium user service, use isUserPremiumCheck middleware
router.post(
  "/",
  auth,
  verificationAndBannedCheck,
  chatLimitCheck,
  chatC.createChat
);

router.put(
  "/:id",
  auth,
  verificationAndBannedCheck,
  chatBannedCheck,
  isOwnerOfChat,
  chatC.updateChat
);

router.delete(
  "/:id",
  auth,
  verificationAndBannedCheck,
  chatBannedCheck,
  isOwnerOfChat,
  chatC.deleteChat
);

// router.delete(
//   "/deleteResponse/:id",
//   auth,
//   verificationAndBannedCheck,
//   formBannedCheck,
//   isOwnerOfForm,
//   formC.deleteFormResponse
// );

// router.get(
//   "/getFormResponses/:id",
//   auth,
//   verificationAndBannedCheck,
//   formBannedCheck,
//   isOwnerOfForm,
//   formC.getFormResponses // need to create another function for a perticular form retrival
// );

router.get(
  "/getUserChats",
  auth,
  verificationAndBannedCheck,
  chatC.getAllChats
);

router.get(
  "/:id",
  auth,
  verificationAndBannedCheck,
  chatBannedCheck,
  isOwnerOfChat,
  chatC.getChat
);



module.exports = router;
