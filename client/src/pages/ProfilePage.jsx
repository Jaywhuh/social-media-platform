import PostCard from '../components/PostCard'
import { mockUser, mockPosts } from '../utils/mockData'
import '../styles/ProfilePage.css'

function ProfilePage() {
  // Filter posts to only show this user's posts
  const userPosts = mockPosts.filter(post => post.author.id === mockUser.id)

  return (
    <div className="profile-page">

      <div className="profile-header">
        <div className="profile-username">{mockUser.username}</div>
        <p className="profile-bio">{mockUser.bio}</p>
        <div className="profile-stats">
          <span><strong>{userPosts.length}</strong> posts</span>
          <span><strong>{mockUser.followersCount}</strong> followers</span>
          <span><strong>{mockUser.followingCount}</strong> following</span>
        </div>
      </div>

      <div className="profile-posts-heading">Posts</div>

      {userPosts.length > 0 ? (
        userPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      ) : (
        <p>No posts yet.</p>
      )}

    </div>
  )
}

export default ProfilePage