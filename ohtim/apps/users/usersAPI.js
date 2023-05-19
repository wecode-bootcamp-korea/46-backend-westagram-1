import { myDataSource } from '../../db.js'
import { app } from '../../app.js'

const newUserSignUp = async (req, res) => {
  try {
    const { name, email, password, profile_image} = req.body
    await myDataSource.query(
      `INSERT INTO users (name, email, password, profile_image) 
      VALUES(?, ?, ?, ?)`,
      [name, email, passwordm profileImage]
    )
    res.status(201).json({
      message: 'New user created! 👋',
    })
  } catch (error) {
    console.error(error)
  }
}

export { newUserSignUp }
