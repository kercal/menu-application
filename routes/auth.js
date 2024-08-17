const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CafeOwner = require("../models/CafeOwner");

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password, cafeName, tables } = req.body;

  try {
    const existingUser = await CafeOwner.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCafeOwner = new CafeOwner({
      name,
      email,
      password: hashedPassword,
      cafeName,
      tables,
    });

    await newCafeOwner.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
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

module.exports = router;

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password, cafeName, tables } = req.body;

  try {
    const existingUser = await CafeOwner.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCafeOwner = new CafeOwner({
      name,
      email,
      password: hashedPassword,
      cafeName,
      tables,
    });

    await newCafeOwner.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});
