import Post from '../models/Post.js';

export async function getAllPosts() {
  return await Post.find()
    .populate('author', 'username')
    .sort({ createdAt: -1 });
}

export async function findPostById(id) {
  return await Post.findById(id).populate('author', 'username');
}

export async function createPost(content, userId) {
  const post = new Post({ content, author: userId });
  return await post.save();
}

export async function updatePost(id, content) {
  return await Post.findByIdAndUpdate(
    id,
    { content },
    { new: true, runValidators: true }
  );
}

export async function deletePost(id) {
  return await Post.findByIdAndDelete(id);
}

export async function getPostsByUserId(userId) {
  return await Post.find({ author: userId })
    .populate('author', 'username')
    .sort({ createdAt: -1 });
}