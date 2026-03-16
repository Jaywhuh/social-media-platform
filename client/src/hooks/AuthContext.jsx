import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Provider component wraps the app and shares state
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function login(userData) {
    setUser(userData);
    setIsLoggedIn(true);
  }

  function logout() {
    setUser(null);
    setIsLoggedIn(false);
  }

  return (
    // The value prop is what gets shared with any component inside this Provider
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook that lets any component read from the context cleanly
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}