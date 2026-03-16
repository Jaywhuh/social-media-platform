import { useState } from 'react'
import PostCard from '../components/PostCard'
import { mockPosts } from '../utils/mockData'
import '../styles/HomePage.css'

function HomePage() {
  const [posts, setPosts] = useState(mockPosts)

  return (
    <div className="home-page">
      <h2>Feed</h2>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default HomePage