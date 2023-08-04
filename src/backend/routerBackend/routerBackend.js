/*per il backend*/
const express = require("express");
const userController = require("../controllers/userListController");
const routerBackend = express.Router();

/* Route per mostrare e creare gli utenti (default) */
routerBackend
  .route("/register/createUser")
  .get(userController.list_all_users)
  .post(userController.create_an_user);

routerBackend
  .route("/register/checkExistingUser")
  .post(userController.checkIfUserExists);

/* Route per il login */
routerBackend.route("/login").post(userController.checkIfRegisterForLogin);

/* Route per le categories */
routerBackend
  .route("/admin/addCategory")
  .post(userController.create_a_category);

routerBackend.route("/showCategories").get(userController.list_all_categories);

module.exports = routerBackend;
