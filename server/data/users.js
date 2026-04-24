// In-memory user storage — replaced by MongoDB later
const users = [];

export function findUserByEmail(email) {
  return users.find((user) => user.email === email);
}

export function findUserById(id) {
  return users.find((user) => user.id === id);
}

export function createUser(userData) {
  const newUser = { bio: '', followers: [], following: [], ...userData };
  users.push(newUser);
  return newUser;
}

export function getAllUsers() {
  return users;
}

export function updateUser(id, updates) {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates };
  return users[index];
}

export function followUser(targetId, followerId) {
  const target = findUserById(targetId);
  const follower = findUserById(followerId);

  if (!target || !follower) return null;

  if (target.followers.includes(followerId)) {
    return { alreadyFollowing: true };
  }

  target.followers.push(followerId);
  follower.following.push(targetId);

  return { target, follower };
}

export function unfollowUser(targetId, followerId) {
  const target = findUserById(targetId);
  const follower = findUserById(followerId);

  if (!target || !follower) return null;

  target.followers = target.followers.filter((id) => id !== followerId);
  follower.following = follower.following.filter((id) => id !== targetId);

  return { target, follower };
}
