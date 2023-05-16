import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { newUserSignUp } from './apps/users/usersAPI.js'
import { PORT } from './db.js'

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.post('/users/signup', newUserSignUp)

app.listen(PORT, () => {
  console.log('👂 Listening on port 3000')
})

export { app }
