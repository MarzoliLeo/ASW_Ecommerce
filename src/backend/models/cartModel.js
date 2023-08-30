const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

const Cart = mongoose.model("carts", cartSchema);

module.exports = Cart;