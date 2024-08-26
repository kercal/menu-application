const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cafeOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CafeOwner",
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
