require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzEwNGJmM2Y0ZDEwZjRjNmQ5ZTk2YSIsImlhdCI6MTcyMzkyNjY3OSwiZXhwIjoxNzIzOTMwMjc5fQ.eUbv5a6jYQwL3j1fKFPzcwPdHRnfZJo5MSUqh4aP930

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const menuRoutes = require("./routes/menu");

app.use("/api", menuRoutes);

// Import and use auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Sample route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Import and use customer auth routes
const customerAuthRoutes = require("./routes/customerAuth");
app.use("/api/customer/auth", customerAuthRoutes);
