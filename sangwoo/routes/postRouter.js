const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.post("/posting", postController.posting);
router.get("/all", postController.getAllPost);
router.get("/:userId", postController.getPostById);
router.patch("/updatePost/:userId/:postId", postController.updatePost);
router.delete("/delete/:postId", postController.deletePost);

module.exports = {
  router,
};
