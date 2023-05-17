import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { PORT } from './db.js'
import { myDataSource } from './db.js'

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
myDataSource.initialize()

app.listen(PORT, () => {
  console.log(`👂 Listening on 127.0.0.1:${PORT}...`)
})

export { app }
