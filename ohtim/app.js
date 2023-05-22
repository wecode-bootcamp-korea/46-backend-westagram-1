import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { PORT } from './db.js'
import { database } from './db.js'
import { createNewUser } from './apps/users/usersAPI.js'
import { createNewPost } from './apps/posts/newpostAPI.js'
import { getAllPosts } from './apps/posts/readallpostsAPI.js'
import { getPostsByUserId } from './apps/posts/readuserpostAPI.js'
import { editUserPost } from './apps/posts/edituserpostAPI.js'
import { deleteUserPostById } from './apps/posts/deletepostAPI.js'
import { likeUserPost } from './apps/posts/likepostAPI.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.post('/users/signup', createNewUser)
app.post('/posts', createNewPost)
app.get('/posts', getAllPosts)
app.get('/posts/:userId', getPostsByUserId)
app.patch('/posts', editUserPost)
app.delete('/posts/:postId', deleteUserPostById)
app.post('/posts/:postid/:userId', likeUserPost)

database.initialize()

app.listen(PORT, () => {
  console.log(`👂 Listening on 127.0.0.1:${PORT}... 🙉`)
})

export { app }
