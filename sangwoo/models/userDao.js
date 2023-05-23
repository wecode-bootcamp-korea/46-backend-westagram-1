const dataSource = require("./dataSource");

const createUser = async (name, email, profileImage, password) => {
  try {
    return await dataSource.query(
      `
      INSERT INTO users(
        name,
        email,
        profileImage,
        password,
    ) VALUES (?, ?, ?, ?);
    `,
      [name, email, profileImage, password]
    );
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
};
