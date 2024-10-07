import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CSS/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');  // Changed to email
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = { email, password };

    axios.post('http://localhost:8080/users/login', loginData)
      .then(response => {
        console.log('Login successful:', response.data);
        navigate('/');  // Navigate to the home page or dashboard upon successful login
      })
      .catch(error => {
        console.error('Login error:', error.response.data);
        setErrorMessage(error.response.data);  // Display error message on login failure
      });
  };

  return (
    <div className="full1">
      <button className="back-button-login" onClick={() => navigate(-1)}>Back</button>
      <div className="main1">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="user1">
            <div className="input1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
          </div>
          <button type="submit" className="but1">Login</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}  {/* Display error message */}
        </form>
      </div>
    </div>
  );
};

export default Login;
