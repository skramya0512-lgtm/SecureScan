const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getProfile } = require("../controllers/UserController");

// Protected Profile Route
router.get("/profile", authMiddleware, getProfile);

module.exports = router;