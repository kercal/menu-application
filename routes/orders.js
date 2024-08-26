// routes/orders.js

const express = require("express");
const authMiddleware = require("../middleware/auth");
const Order = require("../models/Order"); // Assuming you have an Order model
const Table = require("../models/Table"); // Assuming you have a Table model

const router = express.Router();

router.get("/:tableId", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ table: req.params.tableId });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
