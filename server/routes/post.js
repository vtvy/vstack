const postController = require("../controllers/post.js");
const validateToken = require("../middleware/auth.js");

const postRoutes = require("express").Router();
// Create question
postRoutes.post("/create", validateToken, postController.create);
// Get all posts
postRoutes.get("/", postController.get);
// Get a post
postRoutes.get("/:id", postController.getOne);

module.exports = postRoutes;
