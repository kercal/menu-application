require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log("Uploads directory created");
} else {
  console.log("Uploads directory already exists");
}

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

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import and use auth routes
const authRoutes = require("./routes/auth");
console.log("Loading auth routes");
app.use("/api/auth", authRoutes);

// Import and use menu routes
const menuRoutes = require("./routes/menu");
console.log("Loading menu routes");
app.use("/api/menu", menuRoutes);

// Import and use customer auth routes
const customerAuthRoutes = require("./routes/customerAuth");
console.log("Loading customer auth routes");
app.use("/api/customer/auth", customerAuthRoutes);

// Import and use category routes
const categoryRoutes = require("./routes/categories");
console.log("Loading category routes");
app.use("/api/categories", categoryRoutes);

// Sample route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const orderRoutes = require("./routes/orders");
app.use("/api/orders", orderRoutes);

// Import and use tables routes
const tableRoutes = require("./routes/tables");
console.log("Loading table routes");
app.use("/api/tables", tableRoutes);
