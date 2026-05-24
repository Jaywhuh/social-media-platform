import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import { useAuth } from "../hooks/AuthContext";
import "../styles/ProfilePage.css";

function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    async function fetchProfileData() {
      try {
        const [profileRes, postsRes] = await Promise.all([
          fetch(`/api/users/${user.id}`),
          fetch(`/api/users/${user.id}/posts`),
        ]);

        const profileData = await profileRes.json();
        const postsData = await postsRes.json();

        if (!profileRes.ok) throw new Error(profileData.message);
        if (!postsRes.ok) throw new Error(postsData.message);

        setProfile(profileData);
        setPosts(postsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, [user]);

  if (!user)
    return (
      <div className="profile-page">
        <p>Please log in to view your profile.</p>
      </div>
    );
  if (loading)
    return (
      <div className="profile-page">
        <p>Loading profile...</p>
      </div>
    );
  if (error)
    return (
      <div className="profile-page">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-username">{profile.username}</div>
        <p className="profile-bio">{profile.bio || "No bio yet."}</p>
        <div className="profile-stats">
          <span>
            <strong>{posts.length}</strong> posts
          </span>
          <span>
            <strong>{profile.followers.length}</strong> followers
          </span>
          <span>
            <strong>{profile.following.length}</strong> following
          </span>
        </div>
      </div>

      <div className="profile-posts-heading">Posts</div>

      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
}

export default ProfilePage;
