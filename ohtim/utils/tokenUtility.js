import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { postRouter } from '../routers/postRouter.js'

const verifyToken = async (req, res, next) => {
  const token = req.headers.token.split(' ')[0]
  console.log(token)

  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'UNAUTHORIZED!',
      })
    }
    console.log(decoded)
    req.userId = decoded.id
    next()
  })
}

export { verifyToken }
