import { database } from './dataSource.js'

const insertPost = async (userId, title, content, imageUrl) => {
  try {
    return await database.query(
      `INSERT INTO posts (
        user_id, 
        title, 
        content, 
        image_url
        )
        VALUES(?, ?, ?, ?)`,
      [userId, title, content, imageUrl]
    )
  } catch (err) {
    const error = new Error('NOT_A_VALID_INPUT')
    error.statusCode = 500
    throw error
  }
}

const selectPosts = async () => {
  try {
    return await database.query(
      `SELECT 
            posts.user_id AS userId, 
            users.profile_image AS userProfileImage, 
            posts.id AS postingId, 
            posts.image_url AS postingImageUrl, 
            posts.content AS postingContent 
          FROM posts
          JOIN users ON users.id = posts.user_id`
    )
  } catch (error) {
    console.error(error)
    throw new Error('DATABASE_ERROR')
  }
}

const selectPostsByUser = async (userId) => {
  try {
    return await database.query(
      `SELECT 
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
        GROUP BY users.id, users.profile_image;`,
      [userId]
    )
  } catch (error) {
    console.error(error)
  }
}

const updateUserPost = async (userId, postId, title, content) => {
  try {
    return await database.query(
      `UPDATE posts
        SET 
        user_id = ?,
        title = ?,
        content = ?
      WHERE id = ?`,
      [userId, title, content, postId]
    )
  } catch (error) {
    console.error(error)
  }
}

const deleteUserPost = async (postId) => {
  try {
    return await database.query(
      `DELETE 
              FROM posts 
              WHERE posts.id = ?`,
      [postId]
    )
  } catch (error) {
    console.error(error)
  }
}

const insertLikeUserPost = async (postId, userId) => {
  try {
    await database.query(
      `INSERT INTO
        likes (
        post_id, 
        user_id
      ) 
      VALUES(?, ?)`,
      [postId, userId]
    )
  } catch (error) {
    console.error(error)
  }
}
export {
  insertPost,
  selectPosts,
  selectPostsByUser,
  updateUserPost,
  deleteUserPost,
  insertLikeUserPost,
}
