const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
// const commentsRouter = require("./comments");
// const likeRouter = require("./likes");

router.use("/users", userRouter.router);
router.use("/posts", postRouter.router);
// router.use("/comments", commentRouter.router);
// router.use("/likes", likeRouter.router);

module.exports = router;
