import { myDataSource } from '../../db.js'
import { app } from '../../app.js'

const userCreateNewPost = async (req, res) => {
  try {
    const { userId, title, content, imageUrl } = req.body
    await myDataSource.query(
      `INSERT INTO posts (user_id, title, content, image_url)
        VALUES(?, ?, ?, ?)`,
      [userId, title, content, imageUrl]
    )
    res.status(201).json({
      message: 'New post created~ 💌',
    })
  } catch (error) {
    console.error(error)
  }
}

export { userCreateNewPost }
