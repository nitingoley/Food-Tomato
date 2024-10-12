const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 9000;
const ConnectDB = require("./lib/conn.js");
const cors = require("cors");
const requestIp = require('request-ip');
const UAParser = require("ua-parser-js");
const User = require("./models/User.js");
const publicRoutes = require("./routes/public.js");

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "*",  // Customize based on your needs
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(requestIp.mw());
app.set('trust proxy', true);

// User Middleware: Track users based on IP and device info
app.use(async (req, res, next) => {
  try {
    let user = await User.findOne({ ip: req.clientIp });
    if (!user) {
      const useragent = req.headers["user-agent"];
      const parser = new UAParser(useragent);
      const parserResult = parser.getResult();
      console.log("New user device info:", parserResult);

      const newUser = new User({
        ip: req.clientIp,
        deviceInfo: parserResult,
        activity: [],
      });
      await newUser.save();
      req.users = newUser;
    } else {
      req.users = user;
    }
    next();
  } catch (err) {
    console.error("Error finding/creating user:", err.message);
    next(err);  // Directly pass the original error
  }
});

// Public routes
app.use(publicRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Jhon the don");
});

// Handle undefined routes (should come after all other routes)
app.use((req, res, next) => {
  res.status(404).json({ error: "Resource not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error occurred in request from IP: ${req.clientIp} at ${req.path}`);
  console.error("Error stack:", err.stack);
  res.status(500).json({ error: "Server error. Please try again later." });
});

// Database connection
ConnectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`The server running on port ${PORT}`);
});
