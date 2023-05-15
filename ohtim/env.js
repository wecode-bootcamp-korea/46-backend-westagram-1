import {
  db_host,
  db_type,
  db_user,
  db_pass,
  db_database,
  db_port,
} from './db.js'

import { DataSource } from 'typeorm'

const myDataSource = new DataSource({
  type: db_type,
  host: db_host,
  port: db_port,
  username: db_user,
  password: db_pass,
  database: db_database,
})

myDataSource.initialize().then(() => {
  console.log('database initialized')
})

export { myDataSource }
