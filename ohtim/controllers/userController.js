import { signUpValidation, signInValidation } from '../services/userServices.js'

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body

    if (!name || !email || !password || !profileImage) {
      throw new Error('SIGN_UP_KEY_ERROR 🍳')
    }
    const createUser = await signUpValidation(
      name,
      email,
      password,
      profileImage
    )
    console.log(createUser)
    return res.status(201).json({
      message: '201 - SIGN_UP_SUCCESS 🐣',
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
      throw new Error('401 - SIGN_IN_KEY_ERROR 🫠')
    }
    const userToken = await signInValidation(email, password)
    return res.status(200).json(userToken)
  } catch (error) {
    console.error(error)
    return res.status(error.statusCode || 500).json({
      message: error.message,
    })
  }
}

export { signUp, signIn }
