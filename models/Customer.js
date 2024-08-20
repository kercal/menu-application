const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favoriteDishes: [{ type: String }], // Placeholder for future implementation
    visitedRestaurants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CafeOwner" },
    ], // Placeholder
    orderCount: { type: Number, default: 0 }, // Track the number of orders
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
