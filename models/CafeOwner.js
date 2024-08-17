const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // URL or file path to the image
});

const CafeOwnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cafeName: { type: String, required: true },
    tables: { type: Number, required: true },
    menuItems: [MenuItemSchema],
  },
  { timestamps: true }
);

const CafeOwner = mongoose.model("CafeOwner", CafeOwnerSchema);

module.exports = CafeOwner;
