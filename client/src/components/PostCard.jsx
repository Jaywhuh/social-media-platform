import '../styles/PostCard.css'

function PostCard({ post }) {
  return (
    <div className="post-card">
      <div className="post-card-header">
        <span className="post-card-author">{post.author.username}</span>
        <span className="post-card-date">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="post-card-content">{post.content}</p>

      <div className="post-card-footer">
        <span>{post.likes} likes</span>
        <span>{post.comments.length} comments</span>
      </div>
    </div>
  )
}

export default PostCard