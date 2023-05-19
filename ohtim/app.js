import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { PORT } from './db.js'
import { myDataSource } from './db.js'
import { newUserSignUp } from './apps/users/usersAPI.js'
import { userCreateNewPost } from './apps/posts/newpostAPI.js'
import { readAllPosts } from './apps/posts/readallpostsAPI.js'
import { readUserPosts } from './apps/posts/readuserpostAPI.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.post('/users/signup', newUserSignUp)
app.post('/posts', userCreateNewPost)
app.get('/posts', readAllPosts)
app.get('/posts/:userId', readUserPosts)

myDataSource.initialize()

app.listen(PORT, () => {
  console.log(`👂 Listening on 127.0.0.1:${PORT}...`)
})

export { app }
