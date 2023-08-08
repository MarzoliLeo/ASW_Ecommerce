/* qua definisco i metodi che ho scelto di invocare nelle route per il backend */

var mongoose = require('mongoose');
const User = require('../models/userListModels.js');
const Category = require('../models/categoriesModel.js');
const Course = require('../models/coursesModel.js');
user = mongoose.model('users'); //Nome della collection in MongoDB per gli user.
categories = mongoose.model('categories'); //Nome della collection in MongoDB per le categories.
courses = mongoose.model('courses') // Name of the collection in MongoDB that refers to courses 

exports.list_all_users = async (req, res)=> {
	try{
		res.json(await user.find({}));
	}catch (err){
		res.json(err);
	}
};

exports.create_an_user = async (req, res)=> {
    const newUser = new User(req.body);
    try{
        res.json(await newUser.save());
    }catch (e) {
        res.json(e);
    }
};

exports.checkIfRegisterForLogin = async (req, res)=> {
	try {
        const { email , password } = req.body;
        const user = await User.findOne({ email, password});
    
        if (!user) {
          return res.status(404).json({ error: 'User not registered' });
        }
    
        return res.status(200).json({ message: 'Login successful' });
      } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
      }
};

exports.create_a_category = async (req, res)=> {
  const newCategory = new Category(req.body);
  try{
      res.json(await newCategory.save());
  }catch (e) {
      res.json(e);
  }
};

exports.list_all_categories = async (req, res)=> {
	try{
		res.json(await categories.find({}));
	}catch (err){
		res.json(err);
	}
};

exports.checkIfUserExists = async (req, res)=> {
  console.log(req.body["email"])
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

exports.create_a_course = async (req, res)=> {
  const newCourse = new Course(req.body);
  try{
      res.json(await newCourse.save());
  }catch (e) {
      res.json(e);
  }
};

exports.list_all_courses = async (req, res)=> {
  const category = req.query["category"];
  try{
		res.json(await courses.find({ courseCategory: category }));
	}catch (err){
		res.json(err);
	}
};

exports.get_users_permission = async (req, res)=> {
  const email = req.query["email"];
  try{
		res.json(await user.find({ email: email }));
	}catch (err){
		res.json(err);
	}
};

exports.delete_course = async (req, res)=> {
  console.log(req.body)
  const courseName = req.body["courseName"];
  console.log(courseName)
  try{
		res.json(await courses.deleteMany({ coursesName: courseName }));
	}catch (err){
		res.json(err);
	}
};