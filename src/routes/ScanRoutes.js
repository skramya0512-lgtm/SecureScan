const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

console.log("✅ ScanRoutes loaded");

const authMiddleware = require("../middleware/authMiddleware");
const {
  createScan,
  getAllScans,
  deleteScan,
} = require("../controllers/ScanController");

// Create a Scan
router.post("/", authMiddleware, upload.single("file"), createScan);

// Get All Scans
router.get("/", authMiddleware, getAllScans);

// Delete a Scan
router.delete("/:id", authMiddleware, deleteScan);

module.exports = router;