import { myDataSource } from '../../db.js'
import { app } from '../../app.js'

const readAllPosts = async (req, res) => {
  try {
    const queryData = await myDataSource.query(
      `SELECT 
          posts.user_id AS userId, 
          users.profile_image AS userProfileImage, 
          posts.id AS postingId, 
          posts.image_url AS postingImageUrl, 
          posts.content AS postingContent 
        FROM posts
        JOIN users ON users.id = posts.user_id`
    )
    console.log(queryData)
    res.status(201).json({ data: queryData })
  } catch (error) {
    console.error(error)
  }
}

export { readAllPosts }
