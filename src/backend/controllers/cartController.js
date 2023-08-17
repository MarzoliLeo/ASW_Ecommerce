const mongoose = require("mongoose");
const Cart = require("../models/cartModel.js");
const User = require("../models/userListModels.js");
const Course = require("../models/coursesModel.js");

exports.add_course_to_cart = async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const courseName = req.body.courseName;

    // Find the user with the given email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the course with the given name
    const course = await Course.findOne({ coursesName: courseName });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if the course is already in the user's cart
    const cartItem = await Cart.findOne({
      courseName: courseName,
      userEmail: userEmail,
      coursePrice: course.price,
    });
    if (cartItem) {
      return res.status(400).json({ error: "Course already in cart" });
    }

    // Create a new cart item with the course and user IDs
    const newCartItem = new Cart({
      courseName: courseName,
      userEmail: userEmail,
      price: course.price,
    });
    await newCartItem.save();

    // Return a success message
    return res.status(200).json({ message: "Course added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.get_cart_items = async function (req, res) {
  const userEmail = req.query.userEmail;
  try {
    const cartItems = await Cart.find({ userEmail: userEmail });
    console.log(cartItems);
    res.json({ cart: cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
