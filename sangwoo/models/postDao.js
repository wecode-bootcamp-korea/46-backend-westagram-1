const { dataSource } = require("./dataSource");

const createPost = async (title, content, userId, imageUrl) => {
  try {
    return await dataSource.query(
      `
        INSERT INTO posts (
          title, 
          content,  
          user_id,
          image_url
        ) VALUES 
        (?, ?, ?, ?);
        `,
      [title, content, userId, imageUrl]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getAll = async () => {
  try {
    return await dataSource.query(
      `
    SELECT 
      users.id as userId, 
      users.profile_image as userProfileImage, 
      posts.id as postingId, 
      posts.image_url as postingImageUrl, 
      posts.content as postingContent 
      FROM users 
      INNER JOIN posts 
      ON users.id = posts.user_id
    `
    );
  } catch (err) {
    return console.error("ERRO_CANT_SEARCH");
  }
};

const getpostbyId = async (userId) => {
  try {
    return await dataSource.query(
      `
        SELECT 
         users.id as userId, 
         users.profile_image as userProfileImage, 
         JSON_ARRAYAGG(
          JSON_OBJECT(
           "postingId", posts.id,
           "postingImageUrl", posts.image_url,
           "postingContent", posts.content
            )
           ) AS posting
         FROM posts 
         JOIN users 
         ON users.id = posts.user_id
         WHERE users.id = ?
            `,
      [userId]
    );
  } catch (err) {
    const error = new Error("ERROR_GETALL");
    error.statusCode = 500;
    throw error;
  }
};

const modifyContent = async (content, userId, postId) => {
  try {
    return await dataSource.query(
      `
            UPDATE posts
            SET content= ?
            WHERE user_id=? and id=?
            `,
      [content, userId, postId]
    );
  } catch (err) {
    const error = new Error("INVALID_UPDATE_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const deletedPost = async (postId) => {
  try {
    return await dataSource.query(
      `
    DELETE
    FROM posts
    WHERE id = ?
    `,
      [postId]
    );
  } catch (err) {
    const error = new Error("ERROR_DELETE_DATA");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createPost,
  getAll,
  getpostbyId,
  modifyContent,
  deletedPost,
};
