import User from '../models/User.js';

export async function findUserByEmail(email) {
  return await User.findOne({ email });
}

export async function findUserById(id) {
  return await User.findById(id);
}

export async function createUser(userData) {
  const { username, email, password } = userData;
  const user = new User({ username, email, password });
  return await user.save();
}

export async function getAllUsers() {
  return await User.find();
}

export async function updateUser(id, updates) {
  return await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
}

export async function followUser(targetId, followerId) {
  await User.findByIdAndUpdate(targetId, {
    $addToSet: { followers: followerId },
  });
  await User.findByIdAndUpdate(followerId, {
    $addToSet: { following: targetId },
  });
}

export async function unfollowUser(targetId, followerId) {
  await User.findByIdAndUpdate(targetId, {
    $pull: { followers: followerId },
  });
  await User.findByIdAndUpdate(followerId, {
    $pull: { following: targetId },
  });
}