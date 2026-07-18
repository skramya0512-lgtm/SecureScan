const express = require("express");

const router = express.Router();

const authRoutes = require("./AuthRoutes");
const userRoutes = require("./UserRoutes");
const scanRoutes = require("./ScanRoutes");

// Health Check Route
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SecureScan API Routes Working 🚀",
  });
});

// Authentication Routes
router.use("/auth", authRoutes);

// User Routes
router.use("/user", userRoutes);

// scan Routes
router.use("/scans", scanRoutes);

module.exports = router;