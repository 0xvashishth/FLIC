const express = require('express');
const router = express.Router();

// Import route handlers or controllers
const userR = require('../routes/userRoutes');
const chatR = require('../routes/chatRoutes');
const adminR = require('../routes/adminRoutes')
const urlR = require('../routes/urlRoutes')
const formR = require('../routes/formRoutes')

// Define routes with the common "/api" prefix
router.use("/user", userR);
router.use("/form", formR);
router.use("/admin", adminR);
router.use("/url", urlR);
router.use("/chat", chatR);

module.exports = router;