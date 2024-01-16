// controllers/form-controller.js
const mongoose = require("mongoose");
const Form = require("../models/form");

const createForm = async (req, res) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    const user  = req.rootUser;
    const { form } = req.body;
    console.log(form);
   if(!form.formTitle || !form.redirectUrl){
    return res.status(400).json({
        error: `Missing required field(s)`,
      });
   }

    // Additional validation and checks if needed

    const newForm = new Form({
      ...form,
      userID: user._id,
    });

    await newForm.save();
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
    const user  = req.rootUser;
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
  try {
    const user  = req.rootUser;
    const { form } = req.body;

    // Additional validation and checks if needed

    const deletedForm = await Form.findOneAndDelete({
      _id: form._id,
      userID: user._id,
    });

    if (!deletedForm) {
      return res.status(404).json({
        message: "Form not found or user does not have permission",
      });
    }

    return res.status(200).json({
      message: "Form Deleted Successfully!",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

// getting forms of user
const getForms = async (req, res) => {
  try {
    console.log("Yrs")
    const user  = req.rootUser;
    const forms = await Form.find({ userID: user._id });

    return res.status(200).json({
      message: "Forms Retrieved Successfully!",
      forms,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createForm, updateForm, deleteForm, getForms };
