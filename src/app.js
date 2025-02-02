require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// MIDDLEWARE
const adminAuthenticate = require("./middlewares/adminAuthMiddleware");
const authenticate = require("./middlewares/authMiddleware");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin/main");      // <--- We'll fix this
const usersRoutes = require("./routes/users/main");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Use middleware
app.use(cors());
app.use(express.json());

// Setup routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);//testing
// app.use("/api/users", authenticate, usersRoutes);
app.use("/api/admin", adminAuthenticate, adminRoutes);

// Listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
