const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const { verifyJWT } = require("../middleware/auth");

router.post("/posting", verifyJWT, postController.posting);
router.get("/all", verifyJWT, postController.getAllPost);
router.get("/:userId", verifyJWT, postController.getPostById);
router.patch(
  "/updatePost/:userId/:postId",
  verifyJWT,
  postController.updatePost
);
router.delete("/delete/:postId", verifyJWT, postController.deletePost);

module.exports = {
  router,
};
