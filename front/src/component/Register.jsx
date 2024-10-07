import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CSS/Login.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: name,
      email: email,
      password: password,
      phoneNumber: mobile,
    };

    axios.post('http://localhost:8080/users/register', user)
      .then(response => {
        console.log('User registered successfully:', response.data);
        navigate('/login'); // Navigate to login page after successful registration
      })
      .catch(error => {
        console.error('Registration error:', error.response.data);
        setErrorMessage(error.response.data);  // Display error message on failure
      });
  };

  return (
    <div className="full1">
      <div className="main1">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="user1">
            <div className="input1">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
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
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile Number"
                required
              />
            </div>
          </div>
          <button type="submit" className="but1">Register</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}  {/* Display error message */}
        </form>
      </div>
    </div>
  );
};

export default Register;
