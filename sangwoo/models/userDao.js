const { dataSource } = require("./dataSource");

const createUser = async (name, email, password, profileImage) => {
  try {
    return await dataSource.query(
      `INSERT INTO users(
		    name,
		    email,
		    password,
		    profile_image
		) VALUES (?, ?, ?, ?);
		`,
      [name, email, password, profileImage]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getByUserIdPassword = async (userId) => {
  try {
    const getUser = await dataSource.query(
      `
      SELECT
      users.email as userId,
      users.password as password
      FROM users
      WHERE users.email=?
      `,
      [userId]
    );
    return getUser[0];
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
  getByUserIdPassword,
};
