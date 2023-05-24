import {
  insertPost,
  selectPosts,
  selectPostsByUser,
  updateUserPost,
  deleteUserPost,
  insertLikeUserPost,
} from '../models/postsDao.js'

const createPostByUserId = async (req, res) => {
  try {
    console.log(req.body)
    const { userId, title, content, imageUrl } = req.body
    if (!content || !imageUrl) {
      return res.status(400).json({
        message: 'MISSING_CONTENT 🥥',
      })
    }
    await insertPost(userId, title, content, imageUrl)
    return res.status(201).json({
      message: 'NEW_POST_CREATED~ 💌',
    })
  } catch (error) {
    console.error(error)
    return res.status(error.statusCode || 500).json({
      message: error.message,
    })
  }
}

const getPosts = async (req, res) => {
  try {
    const queryPostsData = await selectPosts()
    return res.status(201).json({ data: queryPostsData })
  } catch (error) {
    console.error(error)
    return res.status(error.statusCode || 500).json({
      message: error.message,
    })
  }
}

const getPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params
    const [post] = await selectPostsByUser(userId)
    return res.status(200).json({
      data: post,
    })
  } catch (error) {
    console.error(error)
    return res.status(error.statusCode || 500).json({
      message: error.message,
    })
  }
}

const patchPostByUser = async (req, res) => {
  try {
    const { userId, postId, title, content } = req.body
    await updateUserPost(userId, postId, title, content)
    return res.status(200).json({
      message: 'POST_UPDATE_SUCESSFUL! 🍻',
    })
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
    })
  }
}

const deleteUserPostById = async (req, res) => {
  try {
    const { postId } = req.params
    await deleteUserPost(postId)
    return res.status(200).json({
      message: 'POST_DELETE_SUCESSFUL! 🔥',
    })
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
    })
  }
}

const likeUserPost = async (req, res) => {
  try {
    console.log(req.params)
    const { postId, userId } = req.params
    await insertLikeUserPost(postId, userId)
    return res.status(201).json({
      message: 'INSERT_❤️__SUCESSFUL',
    })
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
    })
  }
}

export {
  createPostByUserId,
  getPosts,
  getPostsByUserId,
  patchPostByUser,
  deleteUserPostById,
  likeUserPost,
}
