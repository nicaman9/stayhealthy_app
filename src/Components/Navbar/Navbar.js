import React from 'react';
import logo from '../Navbar/logo.png';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><a href="#">Appointments</a></li>
                    <li><a href="#">Health Blog</a></li>
                    <li><a href="#">Reviews</a></li>
                </ul>
            </div>
            <div className="nav-center">
                <a href="#" className="logo">StayHealthy <img src={logo} alt="Logo" style={{ height: '80px' }} /></a>
            </div>
            <div className="nav-right">
                <Link to="/login" className="btn login-btn">Login</Link>
                <Link to="/SignUp" className="btn signup-btn">Sign Up</Link>
            </div>
        </nav>
    );
};

export default Navbar;
