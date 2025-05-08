import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Lynq</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/pricing">Pricing</Link>
        {user ? (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
}