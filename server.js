require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { connectDB, sequelize } = require("./src/config/db");
require("./src/models/User");
require("./src/models/Scan");
const routes = require("./src/routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", routes);

// Root Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to SecureScan API 🚀",
  });
});

// Start Server
const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`✅ SecureScan Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
  }
};

startServer();