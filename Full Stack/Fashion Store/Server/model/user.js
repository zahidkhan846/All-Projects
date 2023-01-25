const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
    default:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  },
  isSeller: {
    type: Boolean,
    required: false,
    default: false,
  },
  products: {
    type: Array,
  },
  wishlist: {
    type: Array,
  },
  cart: {
    type: Array,
  },
  orders: {
    type: Array,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = mongoose.model("User", userSchema);
