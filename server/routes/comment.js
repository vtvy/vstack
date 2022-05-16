const commentController = require("../controllers/comment.js");
const validateToken = require("../middleware/auth.js");

const commentRoutes = require("express").Router();
// Create comment
commentRoutes.post("/create", validateToken, commentController.create);
// Get all comments
commentRoutes.get("/:id", validateToken, commentController.get);
// Update a comment
commentRoutes.put("/update", validateToken, commentController.update);
// Delete
commentRoutes.delete("/delete/:cmtId", validateToken, commentController.delete);
module.exports = commentRoutes;
