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
      res.status(201).json(savedChat);
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
const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      res.status(404).json({ error: 'Chat not found' });
    } else {
      res.status(200).json(chat);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a specific chat by ID with validation and transaction
const updateChatById = async (req, res) => {
  try {
    await withTransaction(async (session) => {
      const updatedChat = await Chat.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        session,
      });

      if (!updatedChat) {
        throw { status: 404, message: 'Chat not found' };
      }

      const validationError = updatedChat.validateSync();
      if (validationError) {
        throw { status: 400, message: validationError.message };
      }

      res.status(200).json(updatedChat);
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

// Delete a specific chat by ID
const deleteChatById = async (req, res) => {
  try {
    await withTransaction(async (session) => {
      const deletedChat = await Chat.findByIdAndDelete(req.params.id);
      if (!deletedChat) {
        throw { status: 404, message: 'Chat not found' };
      }
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
  getChatById,
  updateChatById,
  deleteChatById,
};
