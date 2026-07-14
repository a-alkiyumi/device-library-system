import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-icon">📚</span>
          Device Library
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/devices" className={({ isActive }) => (isActive ? 'active' : '')}>
            Devices
          </NavLink>
          <NavLink to="/bookings" className={({ isActive }) => (isActive ? 'active' : '')}>
            My Bookings
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
