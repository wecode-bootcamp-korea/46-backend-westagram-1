import bcrypt from 'bcrypt'
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
  console.log(`password check? ${checkPasswordMatch}`)
  if (!checkPasswordMatch) {
    return
  }
}

export { signUpValidation, signInValidation }
