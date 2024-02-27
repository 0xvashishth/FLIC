const Chat = require("../models/chat");

const FREE_USER_CHAT_COUNT = process.env["FREE_USER_CHAT_COUNT"];
const PREMIUM_USER_CHAT_COUNT = process.env["PREMIUM_USER_CHAT_COUNT"];

const chatLimitCheck = async (req, res, next) => {
  try {
    var userCheck = req.rootUser;
    if (!userCheck.isPremiumUser) {
      if (userCheck.chatCount + 1 > FREE_USER_CHAT_COUNT) {
        return res.status(400).json({
          error: "Maximum CHAT limit exceeded, Please upgrade your account.",
        });
      }
    } else {
      if (userCheck.chatCount + 1 > PREMIUM_USER_CHAT_COUNT) {
        return res.status(400).json({
          error:
            "Premium Account maximum CHAT limit exceeded, Please delete existing CHATs before creating new one!",
        });
      }
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const chatBannedCheck = async (req, res, next) => {
  try {
    var chatId = req.params.id;
    // adding the form object the reqest, so that can be used in subsequent requests
    const chat = await Chat.findById({ _id: chatId });
    if (!chat) {
      return res.status(404).json({
        error: "Chat not found!",
      });
    } else {
      req.chat = chat;
      if (chat.isBanned) {
        return res.status(400).json({
          error: "CHAT is banned, can't perform any actions!",
        });
      }
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const isOwnerOfChat = async (req, res, next) => {
  try {
    console.log(req.userId, req.chat.userID)
    if (req.userId.toString() == req.chat.userID.toString()) {
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

module.exports = { chatLimitCheck, chatBannedCheck, isOwnerOfChat };
