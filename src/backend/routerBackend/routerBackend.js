/*per il backend*/
const express = require('express');
const userController = require('../controllers/userListController');
const routerBackend = express.Router();

/* Route per invocazione di metodo backend */
routerBackend.route('/')
.get(userController.list_all_users)
.post(userController.create_an_user);

/*routerBackend.route('/users/:userId')
.get(userController.read_an_user);
*/


module.exports = routerBackend;