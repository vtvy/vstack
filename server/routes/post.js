const postController = require("../controllers/post.js");
const validateToken = require("../middleware/auth.js");

const postRoutes = require("express").Router();
// Create question
postRoutes.post("/create", validateToken, postController.create);
// Get all posts
postRoutes.get("/", validateToken, postController.get);
// Get a post
postRoutes.get("/:id", validateToken, postController.getOne);
// Update a post
postRoutes.put("/update", validateToken, postController.update);
module.exports = postRoutes;
