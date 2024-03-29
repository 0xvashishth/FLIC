const mongoose = require("mongoose");
const Chat = require("../models/chat");
const ChatSession = require("../models/chatSession");
const { addDataToLogs } = require("./log-controller");
const User = require("../models/user");
const { sendEmailWithSendGrid } = require("../utils/sendgridEmail");
const {
  chatCreatedMailScript,
  chatResponseCreatedMailScript,
} = require("../utils/emailScript");
const { verifyToSendEmail } = require("../utils/verifyToSendEmail");

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
      user.chatCount += 1;

      const validationError = newChat.validateSync();
      if (validationError) {
        console.log(validationError);
        throw { status: 400, message: validationError.message };
      }
      const savedChat = await newChat.save({ session });
      await addDataToLogs("Chat Created", newChat._id);
      if (await verifyToSendEmail("user", user)) {
        user.chatEmailNotificationCount += 1;
        await sendEmailWithSendGrid(
          "Chat Created",
          [user.email],
          chatCreatedMailScript(
            user.firstName,
            savedChat.chatTitle,
            savedChat.department,
            savedChat.priority,
            savedChat.defaultAskQuestion
          )
        );
      }
      await user.save({ session });
      res.status(201).json({ savedChat, message: "Chat created successfully" });
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

// Get all chats
const getAllChats = async (req, res) => {
  try {
    const user = req.rootUser;
    const chats = await Chat.find({ userID: user._id });
    return res.status(200).json({
      message: "Chats Retrieved Successfully!",
      chats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in retrieving Chats" });
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
        { new: true, session }
      );

      if (!updatedChat) {
        throw {
          status: 404,
          message: "Chat not found or user does not have permission",
        };
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
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

// Delete a specific chat by ID
const deleteChat = async (req, res) => {
  try {
    const { chat } = req;
    const user = req.rootUser;
    await withTransaction(async (session) => {
      const deletedChat = await Chat.findByIdAndDelete(chat._id);
      // deleting all the sessions as well
      await ChatSession.deleteMany({chatID: chat._id});
      if (!deletedChat) {
        throw {
          status: 404,
          message: "Chat not found or you do not have required permissions",
        };
      }
      user.chatCount -= 1;
      await user.save({ session });
      await addDataToLogs("Chat Deleted", chat._id);
      res.status(204).json();
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

// sdk controllers
// Get a chat data from sdk by ID
const getChatDataFromSdk = async (req, res) => {
  try {
    const chat = req.chat;
    const user = await User.findById(chat.userID);
    await addDataToLogs("SDK Chat Initiated", chat._id);
    return res.status(200).json({
      chat: {
        chatTitle: chat.chatTitle,
        _id: chat._id,
        defaultAskQuestion: chat.defaultAskQuestion,
      },
      agentStatus: user.isOnline,
      chatSessionId: new Date().getTime(),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

const postDefaultAnsFromSdk = async (req, res) => {
  try {
    const chat = req.chat;
    const user = await User.findById(chat.userID);

    let chatSession = await ChatSession.findOne({
      chatID: chat._id,
      chatSessionId: req.body.chatSessionId,
    });
    var oldMessage;
    // If the chat session doesn't exist, create a new one
    if (!chatSession) {
      oldMessage = {
        type: "agent",
        msg: chat.defaultAskQuestion,
        timestamp: Date.now(),
      };

      chatSession = new ChatSession({
        chatID: chat._id,
        chatSessionId: req.body.chatSessionId,
      });
      chatSession.message.push(oldMessage);
    } else {
      // new more responses not adding for now due to size issue!!
      await addDataToLogs("SDK Chat Already Sent Message", chat._id);
      return res.status(200).json({
        newMsg: {
          type: "agent",
          msg: "You have already responded, we will get back to you!",
          timestamp: Date.now(),
        },
        agentStatus: user.isOnline,
      });
    }

    // Create a new message object
    const newMessage = {
      type: "user",
      msg: req.body.msg,
      timestamp: Date.now(),
    };
    // Push the new message to the 'message' array in the chat session
    chatSession.message.push(newMessage);

    // Create a new message object
    const finalMessage = {
      type: "agent",
      msg: "Thanks for sending your details, we will verify and connect with you soon!",
      timestamp: Date.now(),
    };

    if (
      await verifyToSendEmail(
        "chat",
        user,
        chat.EmailnotificationCount,
        chat.isEmailNotification
      )
    ) {
      user.chatEmailNotificationCount += 1;
      chat.EmailnotificationCount += 1;
      await sendEmailWithSendGrid(
        "You Got Response In Chat",
        [user.email],
        chatResponseCreatedMailScript(
          user.firstName,
          chat.chatTitle,
          req.body.msg,
          finalMessage.msg
        )
      );
    }

    chatSession.message.push(finalMessage);
    // increment chatSession count
    chat.sessionCount += 1;
    await chat.save();
    await user.save();
    // Save the updated or new chat session
    await chatSession.save();

    // log data
    await addDataToLogs("SDK ChatSession SendMsg", chatSession._id);

    return res.status(201).json({
      newMsg: {
        type: "agent",
        msg: "Thanks for sending your details, we will verify and connect with you soon!",
        timestamp: Date.now(),
      },
      agentStatus: user.isOnline,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

// again normal controllers
const getChatResponses = async (req, res) => {
  try {
    const user = req.rootUser;
    const chatID = req.chat._id;
    const chatRequestDetails = await ChatSession.find({
      chatID: chatID,
    });
    return res.status(200).json({
      message: "Responses Retrieved Successfully!",
      chatRequestDetails,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const deleteChatResponse = async (req, res) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();
  try {
    const responseId = req.header("ResponseId");
    // Additional validation and checks if needed
    await ChatSession.findByIdAndDelete(responseId, { session });
    const chat = req.chat;
    // decreasing the session count
    chat.sessionCount -= 1;
    await chat.save();
    await addDataToLogs("Chat Response Deleted", responseId);
    await session.commitTransaction(); // Commit the transaction
    session.endSession();
    const chatRequestDetails = await ChatSession.find({
      chatID: req.chat._id,
    });
    return res.status(200).json({
      message: "Response Deleted Successfully!",
      chatRequestDetails,
    });
  } catch (error) {
    await session.abortTransaction(); // Commit the transaction
    session.endSession();
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createChat,
  getAllChats,
  getChat,
  updateChat,
  deleteChat,
  getChatDataFromSdk,
  postDefaultAnsFromSdk,
  getChatResponses,
  deleteChatResponse,
};
