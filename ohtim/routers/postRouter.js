import { Router } from 'express'
import {
  createPostByUserId,
  getPosts,
  getPostsByUserId,
  patchPostByUser,
  deleteUserPostById,
  likeUserPost,
} from '../controllers/postsController.js'
import { verifyToken } from '../utils/tokenUtility.js'

const postRouter = Router()

postRouter.post('/', verifyToken, createPostByUserId)
postRouter.get('/', verifyToken, getPosts)
postRouter.get('/:userId', verifyToken, getPostsByUserId)
postRouter.patch('/', verifyToken, patchPostByUser)
postRouter.delete('/:postId', verifyToken, deleteUserPostById)
postRouter.post('/:postId/:userId', verifyToken, likeUserPost)

export { postRouter }
