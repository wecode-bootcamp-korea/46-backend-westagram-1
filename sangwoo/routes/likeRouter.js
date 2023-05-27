const express = require("express");
const router = express.Router();

const likeController = require("../controllers/likeController");
router.post("/postlike/:userId/:postId", likeController.postlike);

module.exports = {
  router,
};
