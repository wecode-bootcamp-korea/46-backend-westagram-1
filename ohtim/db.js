import * as dotenv from 'dotenv'
dotenv.config()

const db_host = process.env.DB_HOST
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS
const db_database = process.env.DB_DATABASE
const db_type = process.env.DB_CONNECTION
const db_port = process.env.DB_PORT
const db_log = process.env.DB_LOGGING
const PORT = process.env.PORT

export {
  db_log,
  db_port,
  db_database,
  db_host,
  db_user,
  db_pass,
  db_type,
  PORT,
}
