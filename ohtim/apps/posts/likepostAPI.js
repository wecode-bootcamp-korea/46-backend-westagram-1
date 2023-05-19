import { myDataSource } from '../../db.js'
import { app } from '../../app.js'

const likeUserPost = async (req, res) => {
  try {
    const { postId, userId } = req.params
    await myDataSource.query(
      `
    INSERT INTO
      likes (post_id, user_id) 
      VALUES(?, ?)`,
      [postId, userId]
    )
    res.status(200).json({
      message: 'post ❤️ liked',
    })
  } catch (error) {
    console.error(error)
  }
}

export { likeUserPost }
