const express = require('express');
const userController = require('../controllers/userListController');
const cartController = require('../controllers/cartController');
const courseController = require('../controllers/courseController');
const categoryController = require('../controllers/categoryController');
const routerBackend = express.Router();

// --- Route for Users operations ---

// Route for showing and creating users (default)
routerBackend.route('/register/createUser')
  .get(userController.list_all_users)
  .post(userController.create_an_user);

// Route for checking if a user already exists
routerBackend.route('/register/checkExistingUser')
  .post(userController.checkIfUserExists);

// Route for getting users' permissions
routerBackend.route('/usersPermission')
  .get(userController.get_user_by_email);

// Route for user login
routerBackend.route('/login')
  .post(userController.checkIfRegisterForLogin);

routerBackend.route('/addTokens')
  .post(userController.add_tokens);

routerBackend.route('/removeTokens')
  .post(userController.remove_tokens);

routerBackend.route('/getUserByEmail')
  .get(userController.get_user_by_email);

routerBackend.route('/getTokenBalance')
  .get(userController.get_token_balance);

routerBackend.route('/addBoughtCourse')
  .post(userController.add_bought_course);

routerBackend.route('/usersBoughtCourses')
  .get(userController.get_user_by_email);


  
// --- Routes for categories operations ---
routerBackend.route('/admin/addCategory')
  .post(categoryController.create_a_category);

routerBackend.route('/showCategories')
  .get(categoryController.list_all_categories);

routerBackend.route('/deleteCategory')
  .post(categoryController.delete_category);



// --- Routes for courses operations ---
routerBackend.route('/addCourse')
  .post(courseController.create_a_course);

routerBackend.route('/modifyCourse')
  .post(courseController.modify_course);

routerBackend.route('/deleteCourse')
  .post(courseController.delete_course);

routerBackend.route('/checkExistingCourse')
  .post(courseController.check_if_course_exists);

routerBackend.route('/addCourseComment')
  .post(courseController.add_course_comment);

routerBackend.route('/removeCourseComment')
  .post(courseController.remove_course_comment);

routerBackend.route('/showCourseByName')
  .get(courseController.list_course_by_name);

routerBackend.route('/showCoursesByCategory')
  .get(courseController.list_all_courses_by_category);

routerBackend.route('/showCoursesTrainers')
  .get(courseController.list_all_courses_by_trainer);

routerBackend.route('/showCoursesByCategoryAndTrainer')
  .get(courseController.list_all_courses_by_category_and_trainer);

routerBackend.route('/addLike')
  .post(courseController.add_course_like);

routerBackend.route('/removeLike')
  .post(courseController.remove_course_like);

routerBackend.route('/addDislike')
  .post(courseController.add_course_dislike);

routerBackend.route('/removeDislike')
  .post(courseController.remove_course_dislike);



// --- Routes for cart operations ---

// Route for adding courses to cart
routerBackend.route('/addCourseToCart')
  .post(cartController.add_course_to_cart);

// Route for removing a course from the cart
routerBackend.route('/removeCartItem')
  .post(cartController.remove_course_from_cart);

// Route for getting cart items
routerBackend.route('/getCartItems')
  .get(cartController.get_cart_items);

module.exports = routerBackend;