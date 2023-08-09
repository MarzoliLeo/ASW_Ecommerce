/* Definisco uno schema da andare poi ad inserire all'interno del Database */

import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  first_name: String, // String is shorthand for {type: String}
  last_name: String,
  permission: String,
  email: String,
  password: String,
  created_date: {
    type: Date,
    default: Date.now,
  },
});

//"users" è il nome della collection in mongoDB.
const User = mongoose.model("users", usersSchema);

export default User;