const userController = require("../controllers/user.js");

const userRoutes = require("express").Router();

//Sign up
userRoutes.post("/signup", userController.signup);
// //Login
userRoutes.post("/login", userController.login);

module.exports = userRoutes;