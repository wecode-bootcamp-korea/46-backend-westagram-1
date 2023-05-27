const postService = require("../services/postService");
const postDao = require("../models/postDao");

const posting = async (req, res) => {
  try {
    const { title, content, userId, imageUrl } = req.body;

    await postService.posting(title, content, userId, imageUrl);
    return res.status(201).json({ message: "POST_CREATED" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getAllPost = async (req, res) => {
  try {
    const result = await postDao.getAll();
    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { userId } = req.params;
    const userID = await postService.getpostByid(userId);

    return res.status(200).json({ data: userID });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { content } = req.body;
    const { userId, postId } = req.params;
    await postService.reviseContent(content, userId, postId);
    return res.status(200).json({ message: "SUCESSFULLY_MODIFY" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await postService.postDelete(postId);
    return res.status(200).json({ message: "SUCESSFULLY_DELETE" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  posting,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
};
