const express = require("express");
const router = express.Router();

const postController = require("../controllers/postControllers");

router.post("/createPost", postController.createPost);
//router.get("/posts", postController.getAllPost);
//router.get("/posts/posting/:id", postController.getPostById);
//router.patch("/:postId", postController.updatePost);
//router.delete("posts/delete/:postId", postController.deletePost);

module.exports = {
  router,
};
