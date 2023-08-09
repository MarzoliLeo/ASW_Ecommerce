import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'courses',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

const Cart = mongoose.model('cart', cartSchema);

export default Cart;