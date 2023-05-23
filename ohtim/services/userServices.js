import { createUser } from '../models/userDao.js'

const signUpValidation = async (name, email, password, profileImage) => {
  const pwValidation = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  )
  if (!pwValidation.test(password)) {
    const err = new Error('PASSWORD_IS_NOT_VALID 🥓')
    err.statusCode = 409
    throw err
  }
  return await createUser(name, email, password, profileImage)
}

export { signUpValidation }
