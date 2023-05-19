import { database } from '../../db.js'
import { app } from '../../app.js'

const editUserPost = async (req, res) => {
  try {
    const { userId, postId, title, content } = req.body
    await databse.query(
      `UPDATE posts
        SET 
        title = ?,
        content = ?,
        user_id = ?
      WHERE id = ?`,
      [title, content, userId, postId]
    )

    res.status(200).json({
      message: 'post update successful! 📩',
    })
  } catch (error) {
    console.error(error)
  }
}

export { editUserPost }
