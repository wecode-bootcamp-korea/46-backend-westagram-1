import { myDataSource } from '../../db.js'
import { app } from '../../app.js'

const deleteUserPost = async (req, res) => {
  try {
    const { postId } = req.params
    await myDataSource.query(`DELETE FROM posts WHERE posts.id = ?`, [postId])

    res.status(200).json({
      message: 'post delete successful! 💥',
    })
  } catch (error) {
    console.error(error)
  }
}

export { deleteUserPost }
