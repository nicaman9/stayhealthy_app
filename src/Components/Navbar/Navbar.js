import React from 'react';
import logo from '../Navbar/logo.png';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Appointments</a></li>
          <li><a href="#">Health Blog</a></li>
          <li><a href="#">Reviews</a></li>
        </ul>
      </div>
      <div className="nav-center">
        <a href="#" className="logo">
          StayHealthy 
          <img src="logo.png" alt="Logo" style={{ height: '80px' }} />
        </a>
      </div>
      <div className="nav-right">
        <a href="#" className="btn login-btn">Login</a>
        <a href="#" className="btn signup-btn">Sign Up</a>
      </div>
    </nav>
  );
}

export default Navbar;
