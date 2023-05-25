const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");

const signIn = async (userId, password) => {
  const getUser = await userDao.getByUserIdPassword(userId, password);
  if (!getUser.userId || !bcrypt.compare(password, getUser.password)) {
    throw new Error("INVAILD USERId OR PASSWORD");
  }

  return signIn;
};

const signUp = async (name, email, profileImage, password) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }
  // const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, 10);
  const createUser = await userDao.createUser(
    name,
    email,
    hashedPassword,
    profileImage
  );
  return createUser;
};

module.exports = {
  signUp,
  signIn,
};
