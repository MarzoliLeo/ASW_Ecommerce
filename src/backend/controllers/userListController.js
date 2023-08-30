/* qua definisco i metodi che ho scelto di invocare nelle route per il backend */

var mongoose = require('mongoose');
const User = require('../models/userListModels.js');
const Category = require('../models/categoriesModel.js');
const Course = require('../models/coursesModel.js');
user = mongoose.model('users'); //Nome della collection in MongoDB per gli user.
categories = mongoose.model('categories'); //Nome della collection in MongoDB per le categories.
courses = mongoose.model('courses') // Name of the collection in MongoDB that refers to courses 

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

exports.create_a_category = async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    res.json(await newCategory.save());
  } catch (e) {
    res.json(e);
  }
};

exports.list_all_categories = async (req, res) => {
  try {
    res.json(await categories.find({}));
  } catch (err) {
    res.json(err);
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

exports.create_a_course = async (req, res) => {
  const newCourse = new Course(req.body);
  try {
    res.json(await newCourse.save());
  } catch (e) {
    res.json(e);
  }
};

exports.modify_course = async (req, res) => {
  const modifyCourse = req.body;
  try {
    res.json(await courses.findOneAndUpdate({_id: modifyCourse._id}, {
      coursesName: modifyCourse.coursesName,
      description: modifyCourse.description,
      price: modifyCourse.price,
      courseCategory: modifyCourse.courseCategory,
      courseCreator: modifyCourse.courseCreator,
      courseYTLink: modifyCourse.courseYTLink
    }));
  } catch (e) {
    res.json(e);
  }
};

exports.list_all_courses_by_category = async (req, res) => {
  const category = req.query["category"];
  try {
    res.json(await courses.find({ courseCategory: category }));
  } catch (err) {
    res.json(err);
  }
};

exports.list_all_courses_by_category_and_trainer = async (req, res) => {
  const category = req.query["category"];
  const trainers = req.query["trainers"];

  try {
    res.json(await courses
      .find({ 
        courseCategory: category,
        courseCreator: {$in:trainers}
      }));
  } catch (err) {
    res.json(err);
  }
};

exports.list_all_courses = async (req, res) => {
  try {
    res.json(await courses.find().distinct('courseCreator'));
  } catch (err) {
    res.json(err);
  }
};

exports.list_course_by_name = async (req, res) => {
  const courseName = req.query["course"];
  try {
    res.json(await courses.find({ coursesName: courseName }));
  } catch (err) {
    res.json(err);
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

exports.remove_course_comment = async (req, res) => {
  const { courseName, userComment, commentDescription, posting_date } = req.body;
  console.log(req.body)
  try {
    res.json(await courses.updateOne({ coursesName: courseName }, {
        $pull: {
          comments: {
          userComment: userComment,
          commentDescription: commentDescription,
        }}
      }));
  } catch (err) {
    res.json(err);
  }
};

exports.delete_course = async (req, res) => {
  const courseName = req.body["courseName"];
  try {
    res.json(await courses.deleteOne({ coursesName: courseName }));
  } catch (err) {
    res.json(err);
  }
};

exports.delete_category = async (req, res) => {
  const categoryName = req.body["categoryName"];
  try {
    await courses.deleteMany({ courseCategory: categoryName });
    res.json(await categories.deleteOne({ categoryName: categoryName }));

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

exports.add_course_comment = async function (req, res) {
  const { courseName, comment } = req.body
  const userComment = comment.userComment
  const commentDescription = comment.commentDescription
  try {
    res.json(
      await courses.findOneAndUpdate({ coursesName: courseName },
        {$push: 
          {comments: {
            userComment,
            commentDescription,
            posting_date: new Date()
          }}
        }
      )
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.add_course_like = async function (req, res) {
  const { courseName, userEmail } = req.body
  try {
    res.json(
      await courses.findOneAndUpdate({ coursesName: courseName },
        {$push: 
          {likes: userEmail}
        }
      )
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.remove_course_like = async function (req, res) {
  const { courseName, userEmail } = req.body
  try {
    res.json(
      await courses.findOneAndUpdate({ coursesName: courseName },
        {$pull: 
          {likes: userEmail}
        }
      )
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.add_course_dislike = async function (req, res) {
  const { courseName, userEmail } = req.body
  try {
    res.json(
      await courses.findOneAndUpdate({ coursesName: courseName },
        {$push: 
          {dislikes: userEmail}
        }
      )
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.remove_course_dislike = async function (req, res) {
  const { courseName, userEmail } = req.body
  try {
    res.json(
      await courses.findOneAndUpdate({ coursesName: courseName },
        {$pull: 
          {dislikes: userEmail}
        }
      )
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};