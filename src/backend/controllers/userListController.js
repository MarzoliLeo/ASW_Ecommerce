/* qua definisco i metodi che ho scelto di invocare nelle route per il backend */

// Controller with methods referring to user actions

var mongoose = require('mongoose');
const User = require('../models/userListModels.js');
user = mongoose.model('users'); //Nome della collection in MongoDB per gli user.

exports.list_all_users = async (req, res) => {
  try {
    res.json(await user.find({}));
  } catch (err) {
    res.json(err);
  }
};

exports.create_an_user = async (req, res) => {
  const newUser = new User(req.body);
  try {
    res.json(await newUser.save());
  } catch (e) {
    res.json(e);
  }
};

exports.checkIfRegisterForLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(404).json({ error: 'User not registered' });
    }

    return res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};





exports.checkIfUserExists = async (req, res) => {
  // console.log(req.body["email"])
  try {
    const email = req.body["email"];

    const user = await User.findOne({ email });

    if (user) {
      return res.status(404).json({ error: 'Email already registered!' });
    }

    return res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.get_user_by_email = async (req, res) => {
  const email = req.query["email"];
  try {
    res.json(await user.find({ email: email }));
  } catch (err) {
    res.json(err);
  }
};



exports.add_tokens = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    // print the email
    console.log("This is the email: " + req.body.email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.token_balance += parseInt(req.body.amount);
    await user.save();
    return res.status(200).json({ message: "Tokens added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.remove_tokens = async (req, res) => {
  const email = req.body.email;
  const amount = req.body.amount;

  console.log("Data received: email " + email + " " + amount + " tokens")
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.token_balance < amount) {
      return res.status(400).json({ error: "Insufficient tokens" });
    }

    user.token_balance -= amount;
    await user.save();

    return res.status(200).json({ message: "Tokens removed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};;

exports.get_token_balance = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.query["email"] });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ token_balance: user.token_balance });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.add_bought_course = async function (req, res) {
  const { userEmail, coursesName } = req.body
  try {
    res.json(
      await user.findOneAndUpdate({ email: userEmail },
        {$push: 
          {course_bought: coursesName}
        }
      )
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};