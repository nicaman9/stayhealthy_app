import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Sign_up.css';
import sign_up from './sign_up.png';

const SignUp = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');  // Declare the email state here
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router

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

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission
        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "name",
                email: email,  // Pass the email state here
                password: password,
                phone: phone,
            }),
        });
        const json = await response.json(); // Parse the response JSON
        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", "name");
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);  // Store the email in session storage
            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg); // Show error messages
                }
            } else {
                setShowerr(json.error);
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-image">
                <img src={sign_up} alt="Sign Up" />
            </div>
            <div className="signup-form">
                <form method="POST" onSubmit={register}>
                    <h2>Sign Up</h2>
                    <h4>Already have an account? <Link to="/login" style={{ color: '#2190FF' }}>Login here</Link></h4>
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
                    <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="form-control" 
                        placeholder="Enter your email" 
                        aria-describedby="helpId" 
                    />
                    {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}

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
