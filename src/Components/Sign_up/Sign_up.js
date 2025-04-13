import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import signupImage from './sign_up.png'; // Adjust path if needed

const Sign_Up = () => {
  // State hooks
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showerr, setShowerr] = useState('');
  const navigate = useNavigate();

  // Submit handler
  const register = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
      }),
    });

    const json = await response.json();

    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("phone", phone);

      navigate("/");
      window.location.reload();
    } else {
      if (json.errors) {
        for (const error of json.errors) {
          setShowerr(error.msg);
        }
      } else {
        setShowerr(json.error);
      }
    }
  };

  return (
    <div className="container signup-wrapper">
      <div className="signup-card">
        {/* Left: Form side */}
        <div className="signup-form-side">
          <h2 className="form-heading">Sign Up</h2>
          <p className="form-subtext">
            Already registered?{' '}
            <Link to="/Login" style={{ color: '#2190FF' }}>
               Log in Here
            </Link>
          </p>

          <form method="POST" onSubmit={register}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
              {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group"></div>
            <label for="Role">Role:</label>

            <select name="Role" id="Role">
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
            </select>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
        </div>

        {/* Right: Image side */}
        <div className="signup-image-side">
          <img src={signupImage} alt="Sign Up Visual" />
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
