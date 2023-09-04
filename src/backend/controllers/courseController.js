//Controller with methods referring to courses

var mongoose = require('mongoose');
const Course = require('../models/coursesModel.js');
courses = mongoose.model('courses') // Name of the collection in MongoDB that refers to courses 


//Methods to create and manipulate courses

exports.create_a_course = async (req, res) => {
  const newCourse = new Course(req.body);
  try {
    res.json(await newCourse.save());
  } catch (e) {
    res.json(e);
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



//Methods to list courses in different ways

exports.list_course_by_name = async (req, res) => {
  const courseName = req.query["course"];
  try {
    res.json(await courses.find({ coursesName: courseName }));
  } catch (err) {
    res.json(err);
  }
};

exports.list_all_courses_by_trainer = async (req, res) => {
  const coursesList = req.query["courses"];
  try {
    res.json(await courses.find({
      coursesName: {$in:coursesList}
    })
    .distinct('courseCreator'));
  } catch (err) {
    res.json(err);
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



//Methods to create and manipulate courses comments

exports.add_course_comment = async function (req, res) {
  // console.log(req.body)
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

exports.remove_course_comment = async (req, res) => {
  const { courseName, userComment, commentDescription, posting_date } = req.body;
  // console.log(req.body)
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



//Methods to create and manipulate likes/dislikes of courses

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