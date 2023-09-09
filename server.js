// Import Modules
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const session = require('express-session');

// Import Configuration
const config = require("./config");



// Import Routes
const reportRoutes = require("./routes/report.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

// Initialize Express Application
const app = express();

// Connect to MongoDB
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // Middleware
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(session({  //session configuration
      secret: config.JWT_SECRET,
      resave: false,
      saveUninitialized: true
    }))

    // Routes
    app.use("/api/report", reportRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/auth", authRoutes);

    // Root Route
    app.get("/", (req, res) => {
      res.status(200).json({ message: "Welcome to Backend!" });
    });


    // Start Express Server
    app.listen(config.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${config.PORT}`);
    });
  });
