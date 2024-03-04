const mongoose = require("mongoose");
const Form = require("../models/form");
const FormRequestDetails = require("../models/formRequestDetails");
const { addDataToLogs } = require("./log-controller");
const { formCreatedMailScript } = require("../utils/emailScript");
const { sendEmailWithSendGrid } = require("../utils/sendgridEmail");
const { verifyToSendEmail } = require("../utils/verifyToSendEmail");

const createForm = async (req, res) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    const user = req.rootUser;
    const { form } = req.body;
    if (!form.formTitle || !form.redirectUrl) {
      return res.status(400).json({
        error: `Missing required field(s)`,
      });
    }
    const newForm = new Form({
      ...form,
      userID: user._id,
    });
    user.formCount += 1;

    await newForm.save({ session });

    if (await verifyToSendEmail("user", user)) {
      user.formEmailNotificationCount += 1;
      await sendEmailWithSendGrid(
        "Form Created",
        [user.email],
        formCreatedMailScript(
          user.firstName,
          form.formTitle,
          form.redirectUrl,
          form.customMessage ? form.customMessage : ""
        )
      );
    }
    await user.save({ session });
    await addDataToLogs("Form Created", newForm._id);
    await session.commitTransaction(); // Commit the transaction
    session.endSession();
    return res.status(201).json({
      message: "Form Created Successfully!",
      form: newForm,
    });
  } catch (error) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const updateForm = async (req, res) => {
  try {
    const user = req.rootUser;
    const { form } = req.body;

    // Additional validation and checks if needed

    const updatedForm = await Form.findOneAndUpdate(
      { _id: form._id, userID: user._id },
      form,
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({
        message: "Form not found or user does not have permission",
      });
    }
    await addDataToLogs("Form Updated", updatedForm._id);
    return res.status(200).json({
      message: "Form Updated Successfully!",
      form: updatedForm,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const deleteForm = async (req, res) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    const user = req.rootUser;
    const form = req.form;

    // Additional validation and checks if needed
    const deletedResponses = await FormRequestDetails.deleteMany(
      {
        FormID: form._id,
      },
      { session }
    );

    const deletedForm = await Form.findOneAndDelete(
      {
        _id: form._id,
        userID: user._id,
      },
      { session }
    );
    user.formCount -= 1;
    await user.save({ session });
    await addDataToLogs("Form Deleted", deletedForm._id);
    await session.commitTransaction(); // Commit the transaction
    session.endSession();
    return res.status(200).json({
      message: "Form Deleted Successfully!",
    });
  } catch (error) {
    await session.abortTransaction(); // Commit the transaction
    session.endSession();
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

// getting forms of user
// not adding logs
const getForms = async (req, res) => {
  try {
    const user = req.rootUser;
    const forms = await Form.find({ userID: user._id });
    return res.status(200).json({
      message: "Forms Retrieved Successfully!",
      forms,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Error in retrieving Forms" });
  }
};

// not adding logs
const getForm = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Form Retrieved Successfully!",
      form: req.form,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const deleteFormResponse = async (req, res) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();
  try {
    const responseId = req.header("ResponseId");
    const form = req.form;
    // Additional validation and checks if needed
    const deletedResponses = await FormRequestDetails.findByIdAndDelete(
      responseId,
      { session }
    );
    form.requestCount -= 1;
    await addDataToLogs("Form Response Deleted", deletedResponses._id);
    await session.commitTransaction(); // Commit the transaction
    session.endSession();
    const formRequestDetails = await FormRequestDetails.find({
      FormID: req.form._id,
    });
    return res.status(200).json({
      message: "Response Deleted Successfully!",
      formRequestDetails,
    });
  } catch (error) {
    await session.abortTransaction(); // Commit the transaction
    session.endSession();
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

// getting responses of forms of user
// not adding logs
const getFormResponses = async (req, res) => {
  try {
    const formID = req.form._id;
    const formRequestDetails = await FormRequestDetails.find({
      FormID: formID,
    });
    // console.log(formRequestDetails);
    return res.status(200).json({
      message: "Responses Retrieved Successfully!",
      formRequestDetails,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createForm,
  updateForm,
  deleteForm,
  getForms,
  getFormResponses,
  deleteFormResponse,
  getForm,
};
