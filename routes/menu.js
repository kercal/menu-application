const express = require("express");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/auth");
const CafeOwner = require("../models/CafeOwner");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Saving file to uploads directory");
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log("File received:", file.originalname);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Create a new menu item
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  console.log("POST /api/menu called");
  console.log("Request body:", req.body);

  const { name, price, description, category } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const cafeOwner = await CafeOwner.findById(req.user.id);

    if (!cafeOwner) {
      console.log("Cafe owner not found");
      return res.status(404).json({ message: "Cafe owner not found" });
    }

    const newItem = { name, price, description, image, category };
    cafeOwner.menuItems.push(newItem);

    await cafeOwner.save();
    console.log("Menu item added successfully:", newItem);
    res.status(201).json(cafeOwner.menuItems);
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all menu items
router.get("/", authMiddleware, async (req, res) => {
  console.log("GET /api/menu called");

  try {
    const cafeOwner = await CafeOwner.findById(req.user.id).populate(
      "menuItems.category"
    );

    if (!cafeOwner) {
      console.log("Cafe owner not found");
      return res.status(404).json({ message: "Cafe owner not found" });
    }

    console.log("Returning menu items:", cafeOwner.menuItems);
    res.status(200).json(cafeOwner.menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
