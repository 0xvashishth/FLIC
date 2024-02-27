const mongoose = require('mongoose');
const Chat = require("../models/chat");
const ChatSession = require("../models/chatSession")
const { addDataToLogs } = require("./log-controller");

const withTransaction = async (operations) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await operations(session);
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// Create a new chat with validation and transaction
const createChat = async (req, res) => {
  try {
    await withTransaction(async (session) => {
      // const newChat = new Chat(req.body.chat);
      const user = req.rootUser;
      const newChat = new Chat({
        ...req.body.chat,
        userID: user._id,
      });
      const validationError = newChat.validateSync();
      if (validationError) {
        console.log(validationError)
        throw { status: 400, message: validationError.message };
      }
      await addDataToLogs("Chat Created", newChat._id);
      const savedChat = await newChat.save({ session });
      res.status(201).json({savedChat, message: "Chat created successfully"});
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

// Get all chats
const getAllChats = async (req, res) => {
  try {
    const user = req.rootUser;
    const chats = await Chat.find({userID: user._id});
    return res.status(200).json({
      message: "Chats Retrieved Successfully!",
      chats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in retrieving Chats' });
  }
};

// Get a specific chat by ID
const getChat = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Chat Retrieved Successfully!",
      chat: req.chat,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const updateChat = async (req, res) => {
  try {
    const user = req.rootUser;
    const { chat } = req.body;

    await withTransaction(async (session) => {
      const updatedChat = await Chat.findOneAndUpdate(
        { _id: chat._id, userID: user._id },
        chat,
        { new: true, session}
      );

      if (!updatedChat) {
        throw { status: 404, message: 'Chat not found or user does not have permission' };
      }
      
      const validationError = updatedChat.validateSync();
      if (validationError) {
        throw { status: 400, message: validationError.message };
      }
      await addDataToLogs("Chat Updated", updatedChat._id);
      res.status(200).json({
        message: "Chat Updated Successfully!",
        chat: updatedChat,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

// Delete a specific chat by ID
const deleteChat = async (req, res) => {
  try {
    const { chat } = req;    
    await withTransaction(async (session) => {
      const deletedChat = await Chat.findByIdAndDelete(chat._id);
      if (!deletedChat) {
        throw { status: 404, message: 'Chat not found or you do not have required permissions' };
      }
      await addDataToLogs("Chat Deleted", chat._id);
      res.status(204).json();
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

module.exports = {
  createChat,
  getAllChats,
  getChat,
  updateChat,
  deleteChat,
};
