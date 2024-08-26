const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CafeOwner = require("../models/CafeOwner");
const authMiddleware = require("../middleware/auth"); // Import the auth middleware

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password, cafeName } = req.body;

  try {
    // Log the incoming request data
    console.log("Register request data:", { name, email, cafeName });

    const existingUser = await CafeOwner.findOne({ email });
    if (existingUser) {
      console.log("Registration failed: Email already exists");
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCafeOwner = new CafeOwner({
      name,
      email,
      password: hashedPassword,
      cafeName,
      tables: [], // Initialize tables as an empty array
    });

    await newCafeOwner.save();
    console.log("User registered successfully:", newCafeOwner);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const cafeOwner = await CafeOwner.findOne({ email });
    if (!cafeOwner) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, cafeOwner.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: cafeOwner._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      cafeOwner: {
        id: cafeOwner._id,
        name: cafeOwner.name,
        email: cafeOwner.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Profile route - Get the logged-in user's profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const cafeOwner = await CafeOwner.findById(req.user.id).select("-password");
    if (!cafeOwner) {
      return res.status(404).json({ message: "Cafe owner not found" });
    }
    res.json(cafeOwner);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
