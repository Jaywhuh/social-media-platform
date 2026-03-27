// In-memory user storage — replaced by MongoDB later
const users = []

export function findUserByEmail(email) {
  return users.find(user => user.email === email)
}

export function findUserById(id) {
  return users.find(user => user.id === id)
}

export function createUser(userData) {
  users.push(userData)
  return userData
}

export function getAllUsers() {
  return users
}