import bcrypt from 'bcrypt'
import { selectUserByEmail } from '../models/userDao.js'
import { hashUserPassword, passwordValidation } from '../utils/bcryptUtility.js'
import { createToken } from '../utils/jwtUtility.js'

const signUpValidation = async (name, email, password, profileImage) => {
  const pwValidation = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  )
  if (!pwValidation.test(password)) {
    return
  }
  // return hashed user password from bcryptUtility
  return await hashUserPassword(name, email, password, profileImage)
}

const signInValidation = async (email, password) => {
  // check user email exist in db, if not break out
  const isUser = await selectUserByEmail(email)
  if (!isUser) {
    return
  }
  // if user email exist validate password from bcryptUtility
  return await passwordValidation(email, password)
}

export { signUpValidation, signInValidation }
