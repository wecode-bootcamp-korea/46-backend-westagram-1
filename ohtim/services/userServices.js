import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import {
  createUser,
  selectUserByEmail,
  getUserHashedPasswordByEmail,
} from '../models/userDao.js'

const signUpValidation = async (name, email, password, profileImage) => {
  const pwValidation = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  )
  if (!pwValidation.test(password)) {
    return
  }
  // return hashed user password
  return await hashUserPassword(name, email, password, profileImage)
}

const hashUserPassword = async (name, email, password, profileImage) => {
  const saltRounds = 12
  const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds)
  }

  const hashedPassword = await makeHash(password, saltRounds)

  return await createUser(name, email, hashedPassword, profileImage)
}

const signInValidation = async (email, password) => {
  // check user email exist in db
  const isUser = await selectUserByEmail(email)
  if (!isUser) {
    return
  }

  // if user email exist
  return await passwordValidation(email, password)
}

const passwordValidation = async (email, password) => {
  // get hashed password from db
  const getHashedPassword = await getUserHashedPasswordByEmail(email)

  const hashedPassword = getHashedPassword[0].password

  const checkPasswordMatch = await bcrypt.compare(password, hashedPassword)
  if (!checkPasswordMatch) {
    return
  }
  return await createToken(email)
}

const createToken = async (email) => {
  const accessToken = await jwt.sign({ id: email }, process.env.SECRET_KEY, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

  return accessToken
}

export { signUpValidation, signInValidation }
