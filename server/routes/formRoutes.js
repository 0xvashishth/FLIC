const auth = require("../middlewares/auth");
// const adminAuth = require("../middlewares/adminAuth");
const express = require("express");
const router = express.Router();
const formC = require("../controllers/form-controller");
const {
  verificationAndBannedCheck,
  isUserPremiumCheck,
} = require("../middlewares/userMiddleware");
const {
  formLimitCheck,
  formBannedCheck,
  isOwnerOfForm,
} = require("../middlewares/formMiddleware");

// Normal User Routes
// Form created
// If we need premium user service, use isUserPremiumCheck middleware
router.post(
  "/",
  auth,
  verificationAndBannedCheck,
  formLimitCheck,
  formC.createForm
);
router.put(
  "/:id",
  auth,
  verificationAndBannedCheck,
  formBannedCheck,
  isOwnerOfForm,
  formC.updateForm
);
router.delete(
  "/:id",
  auth,
  verificationAndBannedCheck,
  formBannedCheck,
  isOwnerOfForm,
  formC.deleteForm
);

router.delete(
  "/deleteResponse/:id",
  auth,
  verificationAndBannedCheck,
  formBannedCheck,
  isOwnerOfForm,
  formC.deleteFormResponse
);

router.get(
  "/getFormResponses/:id",
  auth,
  verificationAndBannedCheck,
  formBannedCheck,
  isOwnerOfForm,
  formC.getFormResponses // need to create another function for a perticular form retrival
);

router.get(
  "/getUserForms",
  auth,
  verificationAndBannedCheck,
  formC.getForms
);

router.get(
  "/:id",
  auth,
  verificationAndBannedCheck,
  formBannedCheck,
  isOwnerOfForm,
  formC.getForm
);



module.exports = router;
