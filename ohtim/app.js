import express from 'express'
import { router } from './routers/index.js'
import { database } from './models/dataSource.js'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(router)

database
  .initialize()
  .then(() => {
    console.log('DATABASE_INITIALIZED 🐒')
  })
  .catch((error) => {
    console.error('ERROR_IN_DATABASE_INITIALIZATION 🙊', error)
  })

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`LISTENING_ON_127.0.0.1:${PORT} 🙉`)
  })
}

startServer()
