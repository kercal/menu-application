const express = require("express");
const authMiddleware = require("../middleware/auth");
const Category = require("../models/Category");
const CafeOwner = require("../models/CafeOwner");

const router = express.Router();

// Create a new category
router.post("/", authMiddleware, async (req, res) => {
  const { name } = req.body;

  try {
    const cafeOwner = await CafeOwner.findById(req.user.id);

    if (!cafeOwner) {
      return res.status(404).json({ message: "Cafe owner not found" });
    }

    const category = new Category({
      name,
      cafeOwner: req.user.id,
    });

    await category.save();

    // Add category to cafe owner
    cafeOwner.categories.push(category._id);
    await cafeOwner.save();

    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all categories for a cafe owner
router.get("/", authMiddleware, async (req, res) => {
  try {
    const categories = await Category.find({ cafeOwner: req.user.id });
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
