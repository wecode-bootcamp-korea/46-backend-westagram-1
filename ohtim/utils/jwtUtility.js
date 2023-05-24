import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const createToken = async (email) => {
  const accessToken = await jwt.sign({ id: email }, process.env.SECRET_KEY, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

  return accessToken
}

const verifyToken = async (req, res, next) => {
  const token = req.headers.token.split(' ')[0]
  console.log(token)

  if (!token) {
    // return if token is empty
    return res.status(401).json({
      message: 'TOKEN_MISSING! 🎫',
    })
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      // return if token is tampered
      return res.status(401).json({
        message: 'UNAUTHORIZED! 🫠',
      })
    }
    console.log(decoded)
    req.userId = decoded.id
    next()
  })
}

export { createToken, verifyToken }
