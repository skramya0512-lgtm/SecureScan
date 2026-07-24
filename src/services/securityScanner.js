const axios = require("axios");

const scanWebsite = async (url) => {
  try {
    // Automatically add https:// if missing
    if (
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ) {
      url = "https://" + url;
    }

    const startTime = Date.now();

    const response = await axios.get(url, {
      timeout: 10000,
      validateStatus: () => true,
    });

    const endTime = Date.now();
    const headers = response.headers;

    // Calculate Security Score
    let score = 0;

    if (url.startsWith("https://")) {
      score += 20;
    }

    if (headers["content-security-policy"]) {
      score += 20;
    }

    if (headers["strict-transport-security"]) {
      score += 20;
    }

    if (headers["x-frame-options"]) {
      score += 20;
    }

    if (headers["x-content-type-options"]) {
      score += 20;
    }

    // Decide Final Status
    let status = "Malicious";

    if (score >= 80) {
      status = "Safe";
    } else if (score >= 40) {
      status = "Suspicious";
    }

    // Detect vulnerabilities
    const vulnerabilities = [];

    if (!headers["content-security-policy"]) {
      vulnerabilities.push("Missing Content Security Policy header.");
    }

    if (!headers["strict-transport-security"]) {
      vulnerabilities.push("Missing Strict Transport Security header.");
    }

    if (!headers["x-frame-options"]) {
      vulnerabilities.push("Missing X-Frame-Options header.");
    }

    if (!headers["x-content-type-options"]) {
      vulnerabilities.push("Missing X-Content-Type-Options header.");
    }

    // Recommendations
    const recommendations = [];

    if (!headers["content-security-policy"]) {
      recommendations.push("Enable Content Security Policy (CSP).");
    }

    if (!headers["strict-transport-security"]) {
      recommendations.push("Enable HTTP Strict Transport Security (HSTS).");
    }

    if (!headers["x-frame-options"]) {
      recommendations.push("Configure X-Frame-Options.");
    }

    if (!headers["x-content-type-options"]) {
      recommendations.push("Enable X-Content-Type-Options.");
    }

    return {
      success: true,
      url,
      status,
      score,
      statusCode: response.status,
      responseTime: `${endTime - startTime} ms`,
      https: url.startsWith("https://"),
      server: headers.server || "Not Disclosed",

      securityHeaders: {
        contentSecurityPolicy: headers["content-security-policy"]
          ? "Present"
          : "Missing",

        strictTransportSecurity: headers["strict-transport-security"]
          ? "Present"
          : "Missing",

        xFrameOptions: headers["x-frame-options"]
          ? "Present"
          : "Missing",

        xContentTypeOptions: headers["x-content-type-options"]
          ? "Present"
          : "Missing",
      },

      vulnerabilities,
      recommendations,
    };

  } catch (error) {

    let status = "Malicious";

    if (
      error.code === "ECONNABORTED" ||
      error.code === "ENOTFOUND" ||
      error.code === "ECONNREFUSED" ||
      error.code === "EAI_AGAIN"
    ) {
      status = "Suspicious";
    }

    return {
      success: true,

      url,

      status,

      score: 0,

      statusCode: "N/A",

      responseTime: "N/A",

      https: url.startsWith("https://"),

      server: "Unknown",

      securityHeaders: {
        contentSecurityPolicy: "Unknown",
        strictTransportSecurity: "Unknown",
        xFrameOptions: "Unknown",
        xContentTypeOptions: "Unknown",
      },

      vulnerabilities: [
        "Unable to reach the target website.",
      ],

      recommendations: [
        "Verify that the website URL is correct.",
        "Check whether the website is online.",
        "Retry the scan after some time.",
      ],

      message: error.message,
    };
  }
};

module.exports = {
  scanWebsite,
};