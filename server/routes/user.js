const userController = require("../controllers/user.js");
const validateToken = require("../middleware/auth.js");

const userRoutes = require("express").Router();

// Sign up
userRoutes.post("/register", userController.signup);
// Login
userRoutes.post("/login", userController.login);
// Validate
userRoutes.get("/validate", validateToken, userController.validate);
// Get profile
userRoutes.get("/profile/:id", validateToken, userController.getProfile);
module.exports = userRoutes;
