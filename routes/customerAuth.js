const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Customer Registration
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let customer = await Customer.findOne({ email });
    if (customer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    customer = new Customer({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(password, salt);

    await customer.save();

    const payload = { user: { id: customer.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error("Error during customer registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Customer Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
      },
    });
  } catch (error) {
    console.error("Error during customer login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Customer Profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.findById(req.user.id).select("-password");
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error("Error fetching customer profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
