import { database } from '../../db.js'
import { app } from '../../app.js'

const createNewUser = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body
    await database.query(
      `INSERT INTO users (
        name, 
        email, 
        password, 
        profile_image
      ) 
      VALUES(?, ?, ?, ?)`,
      [name, email, password, profileImage]
    )
    res.status(201).json({
      message: 'New user created! 👋',
    })
  } catch (error) {
    console.error(error)
  }
}

export { createNewUser }
