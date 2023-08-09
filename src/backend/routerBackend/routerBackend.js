/*per il backend*/
const express = require('express');
const userController = require('../controllers/userListController');
const routerBackend = express.Router();

/* Route per mostrare e creare gli utenti (default) */
routerBackend.route('/register/createUser')
.get(userController.list_all_users)
.post(userController.create_an_user);

routerBackend.route('/register/checkExistingUser')
.post(userController.checkIfUserExists)

/* Route per il login */
routerBackend.route('/login')
.post(userController.checkIfRegisterForLogin);

/* Route per le categories */
routerBackend.route('/admin/addCategory')
.post(userController.create_a_category);

routerBackend.route('/showCategories')
.get(userController.list_all_categories);

routerBackend.route('/admin/addCourse')
.post(userController.create_a_course);

routerBackend.route('/showCourses')
.get(userController.list_all_courses);

routerBackend.route('/usersPermission')
.get(userController.get_users_permission);

routerBackend.route('/deleteCourse')
.post(userController.delete_course);

routerBackend.route('/deleteCategory')
.post(userController.delete_category);


/* Route per aggiungere prodotti al carrello */
routerBackend.route('/user/addCourseToCart')
.post(userController.add_course_to_cart);

module.exports = routerBackend;