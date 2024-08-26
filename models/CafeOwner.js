const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, maxLength: 200 },
  image: { type: String }, // URL or file path to the image
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const CafeOwnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cafeName: { type: String, required: true },
    tables: [{ type: mongoose.Schema.Types.ObjectId, ref: "Table" }],
    menuItems: [MenuItemSchema],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

const CafeOwner = mongoose.model("CafeOwner", CafeOwnerSchema);
module.exports = CafeOwner;
