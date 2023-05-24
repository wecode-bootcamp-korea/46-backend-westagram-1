const postDao = require("../models/postDao");

const posting = async (title, content, userId, imageUrl) => {
  const createPost = await postDao.createPost(title, content, userId, imageUrl);
  return createPost;
};

const getpostByid = async (userId) => {
  const getpostbyId = await postDao.getpostbyId(userId);
  return getpostbyId;
};

const reviseContent = async (content, userId, postId) => {
  const modifyContent = await postDao.modifyContent(content, userId, postId);
  return modifyContent;
};

const postDelete = async (postId) => {
  const deletedPost = await postDao.deletedPost(postId);
  return postDelete;
};

module.exports = {
  posting,
  getpostByid,
  reviseContent,
  postDelete,
};
