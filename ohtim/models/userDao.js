import { database } from './dataSource.js'

const createUser = async (name, email, hashedPassword, profileImage) => {
  try {
    return await database.query(
      `INSERT INTO users (
        name, 
        email, 
        password, 
        profile_image
      ) 
      VALUES(?, ?, ?, ?)`,
      [name, email, hashedPassword, profileImage]
    )
  } catch (err) {
    const error = new Error('NOT_A_VALID_INPUT! ')
    error.statusCode = 500
    throw error
  }
}

const selectUserByEmail = async (email) => {
  try {
    return await database.query(
      `
      SELECT email
      FROM users
      WHERE email = ?
      `,
      [email]
    )
  } catch (err) {
    const error = new Error('NOT_A_VALID_EMAIL!')
    error.statusCode = 500
    throw error
  }
}

const getUserHashedPasswordByEmail = async (email, password) => {
  try {
    return await database.query(
      `
    SELECT password
    FROM users
    WHERE email = ?
    `,
      [email]
    )
  } catch (err) {
    const error = new Error('NOT_A_VALID_PASSWORD!')
    error.statusCode = 500
    throw error
  }
}

export { createUser, selectUserByEmail, getUserHashedPasswordByEmail }
