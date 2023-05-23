const userDao = require("../models/userDao");

const signUp = async (name, email, profileImage, password) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 400;
    throw err;
  }
  const signup = await userDao.signup(name, email, profileImage, password);
  return signup;
};

module.exports = {
  signUp,
};
