import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'


function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Email is required");
            return;
        }

        if (!password) {
            setError("Password is required");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                alert("Login successful!");
                navigate("/checkin");
            } else {
                setError("Invalid credentials");
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    };

    return (
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="input-field"
            />
            {error && error === "Email is required" && (
              <div className="error-message">{error}</div>
            )}
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input-field"
            />
            {error && error === "Password is required" && (
              <div className="error-message">{error}</div>
            )}
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    );
  }
  
  export default LoginForm;
  