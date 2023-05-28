import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUserByEmail, getUserById, createUser } from '../models/userDao.js'

const hashUserPassword = async (plaintextPassword) => {
  const saltRounds = 10
  return await bcrypt.hash(plaintextPassword, saltRounds)
}

const signUpValidation = async (name, email, password, profileImage) => {
  const pwValidation = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  )
  if (!pwValidation.test(password)) {
    throw new Error('401 - PASSWORD_IS_NOT_VALID 🙈')
  }
  const hashedPassword = await hashUserPassword(password)

  return await createUser(name, email, hashedPassword, profileImage)
}

const signInValidation = async (email, plaintextPassword) => {
  // check user email exist in db, if not break out
  console.log('sign in validation')
  const user = await getUserByEmail(email)
  console.log(user)
  if (!user) {
    throw new Error('404 - USER_DOES_NOT_EXIST 🙊')
  }

  const checkPasswordMatch = await bcrypt.compare(
    plaintextPassword,
    user.password
  )

  if (!checkPasswordMatch) {
    throw new Error('401 - USER_PASSWORD_DOES_NOT_MATCH 🙉')
  }
  const accessToken = await jwt.sign(
    { id: user.id },
    process.env.SECRET_JWT_KEY,
    {
      algorithm: process.env.ALGORITHM,
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  )
  console.log(accessToken)
  return accessToken
}

export { signUpValidation, signInValidation, getUserById }
