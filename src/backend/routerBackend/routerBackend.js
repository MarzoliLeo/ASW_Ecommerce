/*per il backend*/
const express = require('express');
const userController = require('../controllers/userListController');
const routerBackend = express.Router();

/* Route per invocazione di metodo backend */
routerBackend.route('/')
.get(userController.list_all_users)
.post(userController.create_an_user);

/* Route per il login */
routerBackend.route('/login')
.post(userController.checkIfRegisterForLogin);

/* TODO Route per le categories */
routerBackend.route('/admin/addCategory')
.post(userController.create_a_category);


module.exports = routerBackend;