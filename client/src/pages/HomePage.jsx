import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';         
import { useAuth } from '../hooks/AuthContext';               
import '../styles/HomePage.css';

function HomePage() {
  const { isLoggedIn } = useAuth();                         
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch posts');
        }

        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  function handlePostCreated(newPost) {                 
    setPosts((prev) => [newPost, ...prev]);
  }

  if (loading)
    return (
      <div className="home-page">
        <p>Loading posts...</p>
      </div>
    );

  if (error)
    return (
      <div className="home-page">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="home-page">
      <h2>Feed</h2>
      {isLoggedIn && (                                  
        <CreatePost onPostCreated={handlePostCreated} />
      )}
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}

export default HomePage;
