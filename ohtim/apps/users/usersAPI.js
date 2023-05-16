import { myDataSource } from '../../db.js'
import { app } from '../../app.js'

const newUserSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body
    await myDataSource.query(
      `INSERT INTO users (name, email, password) 
      VALUES(?, ?, ?)`,
      [name, email, password]
    )
    res.status(201).json({
      message: 'New user created! 👋',
    })
  } catch (error) {
    console.error(error)
  }
}

export { newUserSignUp }
