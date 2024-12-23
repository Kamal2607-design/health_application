import React, { useState } from 'react';
import './App.css';

function RegistrationForm() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = {};

        // Validate fields
        if (!/^[A-Za-z]+$/.test(userData.name)) {
            formErrors.name = 'Name must contain only letters.';
        }
        if (!userData.email.includes('@')) {
            formErrors.email = 'Please enter a valid email.';
        }
        if (userData.password.length < 6) {
            formErrors.password = 'Password must be at least 6 characters long.';
        }
        if (!userData.age) {
            formErrors.age = 'Age is required.';
        }

        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await fetch("http://localhost:5000/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                });

                if (response.ok) {
                    alert('Registration successful!');
                    window.location.href = "/login";
                } else {
                    alert('Error registering user');
                }
            } catch (error) {
                alert('Error registering user');
            }
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="input-field"
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                </div>

                <div className="input-container">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="input-field"
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>

                <div className="input-container">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="input-field"
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                </div>

                <div className="input-container">
                    <label>Age</label>
                    <input
                        type="number"
                        name="age"
                        value={userData.age}
                        onChange={handleChange}
                        placeholder="Age"
                        className="input-field"
                    />
                    {errors.age && <div className="error-message">{errors.age}</div>}
                </div>

                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
}

export default RegistrationForm;
