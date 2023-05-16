import * as dotenv from 'dotenv'
dotenv.config()
import { DataSource } from 'typeorm'

const db_host = process.env.DB_HOST
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS
const db_database = process.env.DB_DATABASE
const db_type = process.env.DB_CONNECTION
const db_port = process.env.DB_PORT
const db_log = process.env.DB_LOGGING
const PORT = process.env.PORT

const myDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
})

export { PORT, myDataSource }
