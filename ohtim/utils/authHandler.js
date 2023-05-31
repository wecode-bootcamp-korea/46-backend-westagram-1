import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import { getUserById } from '../services/userServices.js'

const verifyToken = async (req, res, next) => {
  try {
    // Check token from user
    console.log(req.headers)
    const accessToken = req.headers.token
    if (!accessToken) {
      // return if token is empty
      throw new Error('TOKEN_MISSING! 🎫')
    }

    // Verify user token
    const payload = await jwt.verify(accessToken, process.env.SECRET_JWT_KEY)
    console.log(payload)
    // Check if user exist in datababse
    const user = await getUserById(payload.id)
    console.log(user)
    if (!user) {
      return res.status(401).json({
        message: 'UNAUTHORIZED! 🫠',
      })
    }

    req.userId = user
    next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({ message: 'ERROR_IN_TOKEN_VERIFICATION' })
  }
}

export { verifyToken }
