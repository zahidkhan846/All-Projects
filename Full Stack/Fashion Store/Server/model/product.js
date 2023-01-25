const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
  },
  type: String,
  category: String,
  imageUrl: { type: String, required: true },
  isFeatured: { type: Boolean, required: false },
  originalPrice: Number,
  discount: Number,
  quantity: Number,
  creatorId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = mongoose.model("User", productSchema);
