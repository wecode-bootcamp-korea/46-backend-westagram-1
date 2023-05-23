import { signUpValidation } from '../services/userServices.js'

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body

    if (!name || !email || !password || !profileImage) {
      return res.status(400).json({
        message: 'KEY_ERROR 👀',
      })
    }
    await signUpValidation(name, email, password, profileImage)
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS 🐣',
    })
  } catch (error) {
    console.error(error)
    return res.status(error.statusCode || 500).json({
      message: error.message,
    })
  }
}

export { signUp }
