import { signUpValidation, signInValidation } from '../services/userServices.js'

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body

    if (!name || !email || !password || !profileImage) {
      return res.status(400).json({
        message: 'SIGN_UP_KEY_ERROR 🍳',
      })
    }

    await signUpValidation(name, email, password, profileImage)
    return res.status(201).json({
      message: 'SIGN_UP_SUCCESS 🐣',
    })
  } catch (error) {
    console.error(error)
    return res.status(error.statusCode || 500).json({
      message: error.message,
    })
  }
}

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({
        message: 'SIGN_IN_KEY_ERROR 🥦',
      })
    }
    await signInValidation(email, password)
    return res.status(200).json({
      message: 'SIGN_IN_SUCCESSFUL 🥓',
    })
  } catch (error) {
    console.error(error)
    return res.status(error.statusCode || 500).json({
      message: error.message,
    })
  }
}

export { signUp, signIn }
