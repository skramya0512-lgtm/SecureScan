const Scan = require("../models/Scan");
const { scanWebsite } = require("../services/securityScanner");

// Create a new scan
const createScan = async (req, res) => {
  try {
    const { filename, filepath } = req.body;

    // Validate required fields
    if (!filename || !filepath) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Perform website security scan
    const scanReport = await scanWebsite(filepath);


    // Save scan to database
    const scan = await Scan.create({
  filename,
  filepath,
  status: scanReport.status,
  score: scanReport.score,
  responseTime: scanReport.responseTime,
  https: scanReport.https,
  userId: req.user.id,
});


    // Send detailed report
    res.status(201).json({
      success: true,
      message: "Scan completed successfully",

      scan,

      report: {
        url: scanReport.url,
        status: scanReport.status,
        score: scanReport.score,
        https: scanReport.https,
        server: scanReport.server,
        responseTime: scanReport.responseTime,
        statusCode: scanReport.statusCode,

        securityHeaders: scanReport.securityHeaders,

        vulnerabilities: scanReport.vulnerabilities,

        recommendations: scanReport.recommendations,
      },
    });

  } catch (error) {

    console.log("========== SCAN ERROR ==========");
    console.log(error.message);
    console.log(error.stack);
    console.log("================================");

    res.status(500).json({
      success: false,
      message: "Internal server error",
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

    console.error("Get Scans Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });

  }
};

module.exports = {
  createScan,
  getAllScans,
};