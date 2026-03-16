import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav>
      <Link to="/">
        <strong>SocialApp</strong>
      </Link>

      <div>
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
