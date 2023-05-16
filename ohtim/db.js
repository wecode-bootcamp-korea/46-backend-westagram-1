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
  type: db_type,
  host: db_host,
  port: db_port,
  username: db_user,
  password: db_pass,
  database: db_database,
})

myDataSource.initialize().then(() => {
  console.log('💾 Database Initialized')
})

export { PORT, myDataSource }
