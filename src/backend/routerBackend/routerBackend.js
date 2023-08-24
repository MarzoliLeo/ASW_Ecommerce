const express = require('express');
const userController = require('../controllers/userListController');
const cartController = require('../controllers/cartController');
const routerBackend = express.Router();

// Route for showing and creating users (default)
routerBackend.route('/register/createUser')
  .get(userController.list_all_users)
  .post(userController.create_an_user);

// Route for checking if a user already exists
routerBackend.route('/register/checkExistingUser')
  .post(userController.checkIfUserExists);

// Route for user login
routerBackend.route('/login')
  .post(userController.checkIfRegisterForLogin);

// Routes for categories
routerBackend.route('/admin/addCategory')
  .post(userController.create_a_category);

routerBackend.route('/showCategories')
  .get(userController.list_all_categories);

routerBackend.route('/deleteCategory')
  .post(userController.delete_category);

// Routes for courses
routerBackend.route('/admin/addCourse')
  .post(userController.create_a_course);

routerBackend.route('/showCourses')
  .get(userController.list_all_courses);

routerBackend.route('/showCourseByName')
  .get(userController.list_course_by_name);

routerBackend.route('/deleteCourse')
  .post(userController.delete_course);

// Route for adding courses to cart
routerBackend.route('/addCourseToCart')
  .post(cartController.add_course_to_cart);

// Route for removing a course from the cart
routerBackend.route('/removeCartItem')
  .post(cartController.remove_course_from_cart);

// Route for getting cart items
routerBackend.route('/getCartItems')
  .get(cartController.get_cart_items);

// Route for getting users' permissions
routerBackend.route('/usersPermission')
  .get(userController.get_user_by_email);

routerBackend.route('/addTokens')
  .post(userController.add_tokens);

routerBackend.route('/removeTokens')
  .post(userController.remove_tokens);

routerBackend.route('/getTokenBalance')
  .get(userController.get_token_balance);

routerBackend.route('/addBoughtCourse')
  .post(userController.add_bought_course);

routerBackend.route('/usersBoughtCourses')
  .get(userController.get_user_by_email);



module.exports = routerBackend;