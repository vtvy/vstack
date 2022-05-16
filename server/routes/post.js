const postController = require("../controllers/post.js");
const validateToken = require("../middleware/auth.js");

const postRoutes = require("express").Router();
// Create question
postRoutes.post("/create", validateToken, postController.create);
// Get all posts
postRoutes.get("/", validateToken, postController.get);
// Update a post
postRoutes.put("/update", validateToken, postController.update);
// Delete Post
postRoutes.delete("/delete/:id", validateToken, postController.delete);
// Vote
postRoutes.put("/vote", validateToken, postController.vote);
module.exports = postRoutes;
