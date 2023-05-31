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
    if (err.code === 'ER_DUP_ENTRY') {
      throw new Error('USER_ALREADY_EXIST_WITH_SAME_EMAIL')
    }
    console.error(err)
  }
}

const getUserByEmail = async (email) => {
  try {
    const [result] = await database.query(
      `
      SELECT 
        id, 
        name, 
        email, 
        password, 
        profile_image AS profileImage
      FROM users
      WHERE email = ?
      `,
      [email]
    )
    return result
  } catch (err) {
    console.error(err)
  }
}

const getUserById = async (id) => {
  try {
    const [result] = await database.query(
      `
      SELECT 
        id, 
        name, 
        email, 
        password, 
        profile_image AS profileImage
      FROM users
      WHERE id = ?
      `,
      [id]
    )
    return result
  } catch (err) {
    console.error(err)
  }
}

export { createUser, getUserByEmail, getUserById }
