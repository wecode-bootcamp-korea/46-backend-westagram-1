import { myDataSource } from '../../db.js'
import { app } from '../../app.js'
import util from 'util'

const readUserPosts = async (req, res) => {
  try {
    const userData = await myDataSource.query(
      `SELECT posts.user_id AS userId, users.profile_image AS userProfileImage  
        FROM posts, users`
    )

    const postData = await myDataSource.query(
      `SELECT posts.id AS postingId, posts.image_url AS postingImageUrl, posts.content AS postingContent
        FROM posts`
    )
    console.log(userData)
    console.log(postData)

    const postsToUser = async (userData, postData) => {
      const combinedData = userData.map((userObj) => {
        const userWithPostings = Object.assign({}, userObj, { postings: [] })

        for (let post of postData) {
          if (userObj.userId === post.postingId) {
            userWithPostings.postings.push(post)
          }
        }
        return userWithPostings
      })
      return combinedData
    }

    const userPostingData = await postsToUser(userData, postData)
    console.log(util.inspect(userPostingData, false, null, true))
    res.status(201).json({
      data: {
        ...userPostingData,
      },
    })
  } catch (error) {
    console.error(error)
  }
}

export { readUserPosts }
