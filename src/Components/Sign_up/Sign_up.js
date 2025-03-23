import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sign_up.css';
import sign_up from '../Sign_up/sign_up.png';

const SignUp = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phone, setPhone] = useState('');

    // Validate password match
    useEffect(() => {
        if (confirmPassword && password !== confirmPassword) {
            setPasswordError("Passwords do not match!");
        } else {
            setPasswordError('');
        }
    }, [password, confirmPassword]);

    // Format phone number
    const handlePhoneInput = (event) => {
        let value = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters

        if (value.length > 3 && value.length <= 6) {
            value = value.replace(/(\d{3})(\d{1,3})/, "$1-$2");
        } else if (value.length > 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{1,4})/, "$1-$2-$3");
        }

        setPhone(value);
    };

    // Validate phone number format
    const handlePhoneBlur = () => {
        if (phone.length !== 12) {
            alert("Please enter a valid 10-digit phone number in the format 123-456-7890.");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-image">
                <img src={sign_up} alt="Sign Up" />
            </div>
            <div className="signup-form">
                <h2>Sign Up</h2>
                <h4>Already have an account? <Link to="/login" style={{ color: '#2190FF' }}>Login here</Link></h4>
                <form>
                    <label htmlFor="role">Role:</label>
                    <select id="role" name="role" required>
                        <option value="">Select Role</option>
                        <option value="doctor">Doctor</option>
                        <option value="patient">Patient</option>
                    </select>

                    <label htmlFor="name">Full Name:</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name" required />

                    <label htmlFor="phone">Phone Number:</label>
                    <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        pattern="\d{3}-\d{3}-\d{4}" 
                        placeholder="Enter your phone number (xxx-xxx-xxxx)" 
                        value={phone}
                        onChange={handlePhoneInput}
                        onBlur={handlePhoneBlur}
                        required 
                    />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />

                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Enter a password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />

                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input 
                        type="password" 
                        id="confirm-password" 
                        name="confirm-password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />

                    {passwordError && <span id="password-error" className="error-message" style={{ color: 'red' }}>{passwordError}</span>}

                    <div className="form-buttons">
                        <button type="submit" className="submit-btn">Submit</button>
                        <button type="reset" className="reset-btn">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
