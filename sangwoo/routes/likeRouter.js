const express = require("express");
const router = express.Router();

const likeController = "../controllers/likeControllers";

router.post("/likes", likeController.clickLike);

module.exports = {
  router,
};
