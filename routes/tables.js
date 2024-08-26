const express = require("express");
const authMiddleware = require("../middleware/auth");
const Table = require("../models/Table");
const CafeOwner = require("../models/CafeOwner");

const router = express.Router();

// Get all tables for the logged-in cafe owner
router.get("/", authMiddleware, async (req, res) => {
  console.log("GET /api/tables called"); // Log when the route is called
  console.log("User ID from token:", req.user.id); // Log the user ID from the token

  try {
    const cafeOwner = await CafeOwner.findById(req.user.id).populate("tables");
    if (!cafeOwner) {
      console.log("Cafe owner not found");
      return res.status(404).json({ message: "Cafe owner not found" });
    }
    console.log("Tables found:", cafeOwner.tables); // Log the tables found
    res.json(cafeOwner.tables);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
