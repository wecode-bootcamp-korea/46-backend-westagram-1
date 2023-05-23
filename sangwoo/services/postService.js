const postDao = require("../models/postDao");

const createPost = async (title, content, userId, imageUrl) => {
  const createPost = await postDao.createPost(title, content, userId, imageUrl);
  return signup;
};

module.exports = {
  createPost,
};
