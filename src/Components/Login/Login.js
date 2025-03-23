import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import login from '../Login/login.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in with:', { email, password });
        // Add authentication logic here
    };

    return (
        <div className="login-container">
            <div className="login-image">
                <img src={login} alt="Login" />
            </div>
            <div className="login-form">
                <h2>Login</h2>
                <h4>Don't have an account? <Link to="/Signup" style={{ color: '#2190FF' }}>Sign up here</Link></h4>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            className="form-control" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            className="form-control" 
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="form-buttons">
                        <button type="submit" className="submit-btn">Submit</button>
                        <button type="reset" className="reset-btn" onClick={() => { setEmail(''); setPassword(''); }}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
