// models/Table.js

const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true },
    cafeOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CafeOwner",
      required: true,
    },
    qrCodeUrl: { type: String, required: true }, // URL of the QR code generated for this table
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", TableSchema);

module.exports = Table;
