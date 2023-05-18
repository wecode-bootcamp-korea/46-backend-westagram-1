import { myDataSource } from '../../db.js'
import { app } from '../../app.js'

const readUserPosts = async (req, res) => {
  try {
    const { userId } = req.params
    const [post] = await myDataSource.query(
      `
	SELECT 
  users.id AS userId,
  users.profile_image AS userProfileImage,
  JSON_ARRAYAGG(
    JSON_OBJECT(
      'postingId', posts.id,
      'postingImageUrl', posts.image_url,
      'postingContent', posts.content
    )
  ) AS postings
  FROM users
  JOIN posts ON users.id = posts.user_id
  WHERE users.id = ?
  GROUP BY users.id, users.profile_image;
	`,
      [userId]
    )

    console.log(post)
    res.status(200).json({
      data: post,
    })
  } catch (error) {
    console.error(error)
  }
}

export { readUserPosts }
