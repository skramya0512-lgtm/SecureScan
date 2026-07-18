const Scan = require("../models/Scan");
const fs = require("fs");
const path = require("path");

// Create a new scan
const createScan = async (req, res) => {
  try {
    if (!req.file) {
  return res.status(400).json({
    success: false,
    message: "Please upload a file.",
  });
}
    const { status } = req.body;

    const scan = await Scan.create({
      filename: req.file.originalname,
      filepath: req.file.path,
      status,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Scan created successfully",
      scan,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get all scans
const getAllScans = async (req, res) => {
  try {
    const scans = await Scan.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      success: true,
      scans,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a scan
const deleteScan = async (req, res) => {
  try {
    const scan = await Scan.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: "Scan not found",
      });
    }

    const filePath = path.join(__dirname, "../../", scan.filepath);

if (fs.existsSync(filePath)) {
  fs.unlinkSync(filePath);
}
    await scan.destroy();

    res.status(200).json({
      success: true,
      message: "Scan deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Export controllers
module.exports = {
  createScan,
  getAllScans,
  deleteScan,
};