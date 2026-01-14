import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const Navbar = () => {
  const { user, setUser } = useAuth();

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <nav style={{ display: "flex", gap: 10 }}>
      <Link to="/">Gigs</Link>

      {user ? (
        <>
          <Link to="/post-gig">Post Gig</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
