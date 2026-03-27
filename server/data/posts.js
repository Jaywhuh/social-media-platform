// In-memory post storage — will be replaced by MongoDB
const posts = []

export function getAllPosts() {
  return [...posts].reverse()
}

export function findPostById(id) {
  return posts.find(post => post.id === id)
}

export function createPost(postData) {
  posts.push(postData)
  return postData
}

export function updatePost(id, updates) {
  const index = posts.findIndex(post => post.id === id)
  if (index === -1) return null
  posts[index] = { ...posts[index], ...updates }
  return posts[index]
}

export function deletePost(id) {
  const index = posts.findIndex(post => post.id === id)
  if (index === -1) return null
  const deleted = posts[index]
  posts.splice(index, 1)
  return deleted
}

export function getPostsByUserId(userId) {
  return posts.filter(post => post.author.id === userId)
}