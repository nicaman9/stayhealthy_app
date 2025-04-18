// Navbar.js
import React, { useState } from 'react';
import logo from '../Navbar/logo.png';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const authToken = sessionStorage.getItem('auth-token');
  const email = sessionStorage.getItem('email');

  // Extract username from email before '@'
  const username = email ? email.split('@')[0] : '';

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  // State to manage the visibility of the profile drop-down
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/BookingConsultation">Appointments</Link></li>
          <li><Link to="/Review">Reviews</Link></li>
        </ul>
      </div>

      <div className="nav-center">
        <Link to="/" className="logo">
          StayHealthy
          <img src={logo} alt="Logo" style={{ height: '80px' }} />
        </Link>
      </div>

      <div className="nav-right">
        {authToken ? (
          <>
            <span className="username-display" style={{ marginRight: '15px', fontWeight: 'bold' }}>
              Hi, {username}
            </span>
            <div className="dropdown">
              <button onClick={toggleDropdown} className="btn profile-btn">
                Profile
              </button>
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <Link to="/ProfileCard" onClick={() => setDropdownOpen(false)}>View Profile</Link>
                  <Link to="/ReportsLayout" onClick={() => setDropdownOpen(false)}>Your Reports</Link>
                  <button onClick={handleLogout} className="logout-btn" style={{ width: '100%', textAlign: 'left' }}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="btn login-btn">Login</Link>
            <Link to="/signup" className="btn signup-btn" style={{ marginLeft: '10px' }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;