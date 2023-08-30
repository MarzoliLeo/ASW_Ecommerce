const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  permission: String,
  email: String,
  password: String,
  created_date: {
    type: Date,
    default: Date.now,
  },
  token_balance: {
    type: Number,
    default: 0,
  },
  course_bought: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("users", usersSchema);