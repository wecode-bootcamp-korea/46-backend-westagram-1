import { Router } from 'express'
import {
  createPostByUserId,
  getPosts,
  getPostsByUserId,
  patchPostByUser,
  deleteUserPostById,
  likeUserPost,
} from '../controllers/postsController.js'

const postRouter = Router()

postRouter.post('/', createPostByUserId)
postRouter.get('/', getPosts)
postRouter.get('/:userId', getPostsByUserId)
postRouter.patch('/', patchPostByUser)
postRouter.delete('/:postId', deleteUserPostById)
postRouter.post('/:postId/:userId', likeUserPost)

export { postRouter }
