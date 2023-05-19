import { database } from '../../db.js'
import { app } from '../../app.js'

const likeUserPost = async (req, res) => {
  try {
    const { postId, userId } = req.params
    await database.query(
      `
    INSERT INTO
      likes (post_id, user_id) 
      VALUES(?, ?)`,
      [postId, userId]
    )
    res.status(201).json({
      message: 'post ❤️ liked',
    })
  } catch (error) {
    console.error(error)
  }
}

export { likeUserPost }
