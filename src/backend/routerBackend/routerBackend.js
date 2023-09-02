const express = require('express');
const userController = require('../controllers/userListController');
const cartController = require('../controllers/cartController');
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

routerBackend.route('/getTokenBalance')
  .get(userController.get_token_balance);

routerBackend.route('/addBoughtCourse')
  .post(userController.add_bought_course);

routerBackend.route('/usersBoughtCourses')
  .get(userController.get_user_by_email);


  
// --- Routes for categories operations ---
routerBackend.route('/admin/addCategory')
  .post(userController.create_a_category);

routerBackend.route('/showCategories')
  .get(userController.list_all_categories);

routerBackend.route('/deleteCategory')
  .post(userController.delete_category);



// --- Routes for courses operations ---
routerBackend.route('/addCourse')
  .post(userController.create_a_course);

routerBackend.route('/modifyCourse')
  .post(userController.modify_course);

routerBackend.route('/deleteCourse')
  .post(userController.delete_course);

routerBackend.route('/addCourseComment')
  .post(userController.add_course_comment);

routerBackend.route('/removeCourseComment')
  .post(userController.remove_course_comment);

routerBackend.route('/showCourseByName')
  .get(userController.list_course_by_name);

routerBackend.route('/showCoursesByCategory')
  .get(userController.list_all_courses_by_category);

routerBackend.route('/showCoursesTrainers')
  .get(userController.list_all_courses);

routerBackend.route('/showCoursesByCategoryAndTrainer')
  .get(userController.list_all_courses_by_category_and_trainer);


routerBackend.route('/addLike')
  .post(userController.add_course_like);

routerBackend.route('/removeLike')
  .post(userController.remove_course_like);

routerBackend.route('/addDislike')
  .post(userController.add_course_dislike);

routerBackend.route('/removeDislike')
  .post(userController.remove_course_dislike);

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