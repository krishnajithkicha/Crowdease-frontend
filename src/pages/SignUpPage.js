import React, { useState } from "react";
import "./SignUpPage.css";
import coverImage from "../assets/1.png";
import axios from "axios";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const API_URL = process.env.REACT_APP_API_URL || "https://crowdease-backend.vercel.app";
  const handleSignUp = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(`${API_URL}/api/register`, { email, name, role, password });
      setSuccessMessage(response.data.message); // Show success message
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred during signup");
    }
  };

  return (
    <div className="signup-container">
      <div className="background-cover" style={{ backgroundImage: `url(${coverImage})` }}>
        <h1 className="cover-title">Sign Up for CrowdEase</h1>
      </div>
      <div className="signup-form">
        <h2 className="highlighted-heading">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="Attendee">Attendee</option>
            <option value="Admin">Admin</option>
            <option value="Event Organizer">Event Organizer</option>
            <option value="Staff">Staff</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <p className="account-text">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
