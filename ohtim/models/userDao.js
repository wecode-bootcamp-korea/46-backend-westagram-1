import { database } from './dataSource.js'

const createUser = async (name, email, password, profileImage) => {
  try {
    return await database.query(
      `INSERT INTO users (
        name, 
        email, 
        password, 
        profile_image
      ) 
      VALUES(?, ?, ?, ?)`,
      [name, email, password, profileImage]
    )
  } catch (err) {
    const error = new Error('NOT_A_VALID_INPUT!')
    error.statusCode = 500
    throw error
  }
}

export { createUser }
