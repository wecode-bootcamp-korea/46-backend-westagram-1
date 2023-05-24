import bcrypt from 'bcrypt'
import { createUser, getUserHashedPasswordByEmail } from '../models/userDao.js'
import { createToken } from './jwtUtility.js'

const hashUserPassword = async (name, email, password, profileImage) => {
  const saltRounds = 12
  const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds)
  }

  const hashedPassword = await makeHash(password, saltRounds)

  return await createUser(name, email, hashedPassword, profileImage)
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

export { hashUserPassword, passwordValidation }
