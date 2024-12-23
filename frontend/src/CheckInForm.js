import React, { useState } from 'react';
import axios from 'axios';
import './checkin.module.css';


const CheckInForm = () => {
    const [mood, setMood] = useState(5);
    const [stressLevel, setStressLevel] = useState(5);
    const [feelings, setFeelings] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            await axios.post(
                "http://localhost:5000/checkin",
                { mood, stressLevel, feelings },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Check-in submitted successfully");
        } catch (err) {
            console.error(err);
            alert("Failed to submit check-in");
        }
    };

  return(
    <div className="container">
  <h2>Daily Mental Health Check-In</h2>
  <form onSubmit={handleSubmit} className="form-container">
    <div className="input-container">
      <label>Mood Rating:</label>
      <input
        type="range"
        min="0"
        max="10"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="input-field"
      />
      <span>{mood}</span>
    </div>

    <div className="input-container">
      <label>Current Stress Level:</label>
      <input
        type="range"
        min="0"
        max="10"
        value={stressLevel}
        onChange={(e) => setStressLevel(e.target.value)}
        className="input-field"
      />
      <span>{stressLevel}</span>
    </div>

    <div className="input-container">
      <label>Your Feelings:</label>
      <textarea
        value={feelings}
        onChange={(e) => setFeelings(e.target.value)}
        placeholder="Describe how you're feeling today..."
        className="input-field"
      />
    </div>

    <button type="submit" className="submit-button">Submit</button>
  </form>
</div>

  )
};
  
  export default CheckInForm;