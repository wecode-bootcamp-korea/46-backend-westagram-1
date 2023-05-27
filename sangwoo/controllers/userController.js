const userService = require("../services/userService");
const { catchAsync } = require("../middleware/error");

const signUp = async (req, res) => {
  try {
    const { name, email, profileImage, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(name, email, profileImage, password);

    return res.status(201).json({ message: "SIGNUP_SUCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const signIn = catchAsync(async (req, res, next) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    return res.status(400).json({ message: "INVAILED_INPUT_ERROR" });
  }

  const accessToken = await userService.signIn(userId, password);
  return res.status(200).json({ message: "USER_CORRECT", accessToken });
});

module.exports = {
  signUp,
  signIn,
};