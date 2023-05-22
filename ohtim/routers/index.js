import { Router } from 'express'
import { userRouter } from './userRouter.js'
import { postRouter } from './postRouter.js'

const router = Router()

router.use('/users', userRouter)
router.use('/posts', postRouter)

export { router }
