require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { connectDB, sequelize } = require("./src/config/db");

// Load Models
require("./src/models/User");
require("./src/models/Scan");

const routes = require("./src/routes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

const PORT = process.env.PORT || 5000;


// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(helmet());
app.use(
  morgan(process.env.NODE_ENV === "production" ? "combined" : "dev")
);
app.use(express.json());


// Static uploads folder
app.use("/uploads", express.static("uploads"));


// API Routes
app.use("/api", routes);


// Root Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to SecureScan API 🚀",
  });
});


// Global Error Handler (must be last)
app.use(errorHandler);


// Start Server
const startServer = async () => {
  try {

    await connectDB();

   await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`✅ SecureScan Server running on port ${PORT}`);
    });

  } 

  catch (error) {

    console.error("❌ Server startup failed");
    console.error(error);

    process.exit(1);
}

};


startServer();