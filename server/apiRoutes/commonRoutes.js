const express = require('express');
const router = express.Router();

// Import route handlers or controllers
const userR = require('../routes/userRoutes');
const formR = require('../routes/formRoutes');
const adminR = require('../routes/adminRoutes')

// Define routes with the common "/api" prefix
router.use("/user", userR);
router.use("/form", formR);
router.use("/admin", adminR);

module.exports = router;