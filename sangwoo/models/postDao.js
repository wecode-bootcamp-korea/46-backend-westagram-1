const createPost = async (title, content, userId, imageUrl) => {
  try {
    return dataSource.query(
      `
      INSERT INTO posts(
        title,
        content,
        user_id,
        image_url
      ) VALUES (?, ?, ?, ?);
      `,
      [title, content, userId, imageUrl]
    );
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createPost,
};
