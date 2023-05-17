import { myDataSource } from '../../db.js'
import { app } from '../../app.js'

const userCreateNewPost = async (req, res) => {
  try {
    const { userId, title, content } = req.body
    await myDataSource.query(
      `INSERT INTO posts (user_id, title, content)
        VALUES(?, ?, ?)`,
      [userId, title, content]
    )
    res.status(201).json({
      message: 'New post created~ 💌',
    })
  } catch (error) {
    console.error(error)
  }
}

export { userCreateNewPost }
