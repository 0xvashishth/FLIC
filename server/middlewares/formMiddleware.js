const Form = require("../models/form");

const FREE_USER_FORM_COUNT = process.env["FREE_USER_FORM_COUNT"];
const PREMIUM_USER_FORM_COUNT = process.env["PREMIUM_USER_FORM_COUNT"];

const formLimitCheck = async (req, res, next) => {
  try {
    var userCheck = req.rootUser;
    if (!userCheck.isPremiumUser) {
      if (userCheck.formCount + 1 > FREE_USER_FORM_COUNT) {
        return res.status(400).json({
          error: "Maximum FORM limit exceeded, Please upgrade your account.",
        });
      }
    } else {
      if (userCheck.formCount + 1 > PREMIUM_USER_FORM_COUNT) {
        return res.status(400).json({
          error:
            "Premium Account maximum FORM limit exceeded, Please delete existing FORMs before creating new one!",
        });
      }
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const formBannedCheck = async (req, res, next) => {
  try {
    var formId = req.params.id;
    // adding the form object the reqest, so that can be used in subsequent requests
    const form = await Form.findOne({ _id: formId });
    if (!form) {
      return res.status(404).json({
        error: "Form not found!",
      });
    } else {
      req.form = form;
      if (form.isBanned) {
        return res.status(400).json({
          error: "FORM is banned, can't perform any actions!",
        });
      }
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const isOwnerOfForm = async (req, res, next) => {
  try {
    if (req.userId == req.form.userID) {
      next();
    } else {
      return res.status(401).json({
        error: "You are unauthorized to do this action!",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { formLimitCheck, formBannedCheck, isOwnerOfForm };
