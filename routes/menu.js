const express = require("express");
const CafeOwner = require("../models/CafeOwner");
const router = express.Router();
const authMiddleware = require("../middleware/auth"); // Middleware to protect routes

// Create a new menu item
router.post("/menu", authMiddleware, async (req, res) => {
  const { name, price, image } = req.body;

  try {
    const cafeOwner = await CafeOwner.findById(req.user.id);

    const newItem = { name, price, image };
    cafeOwner.menuItems.push(newItem);

    await cafeOwner.save();
    res.status(201).json(cafeOwner.menuItems);
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all menu items
router.get("/menu", authMiddleware, async (req, res) => {
  try {
    const cafeOwner = await CafeOwner.findById(req.user.id);
    res.json(cafeOwner.menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a menu item
router.put("/menu/:itemId", authMiddleware, async (req, res) => {
  const { itemId } = req.params;
  const { name, price, image } = req.body;

  try {
    const cafeOwner = await CafeOwner.findById(req.user.id);
    const item = cafeOwner.menuItems.id(itemId);

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    item.name = name || item.name;
    item.price = price || item.price;
    item.image = image || item.image;

    await cafeOwner.save();
    res.json(cafeOwner.menuItems);
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/menu/:itemId", authMiddleware, async (req, res) => {
  const { itemId } = req.params;

  try {
    console.log("Attempting to delete item with ID:", itemId);

    const cafeOwner = await CafeOwner.findById(req.user.id);
    if (!cafeOwner) {
      console.log("Cafe owner not found");
      return res.status(404).json({ message: "Cafe owner not found" });
    }

    const item = cafeOwner.menuItems.id(itemId);
    if (!item) {
      console.log("Menu item not found");
      return res.status(404).json({ message: "Menu item not found" });
    }

    cafeOwner.menuItems.pull(itemId); // Use pull() to remove the item by its ID
    await cafeOwner.save();
    console.log("Menu item deleted successfully");
    res.json(cafeOwner.menuItems);
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
