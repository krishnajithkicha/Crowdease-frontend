import React from "react";
import "./AttendeePortal.css";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // ✅ Keep this only if used

const AttendeePortal = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // ✅ Now it is used in handleLogout

  const handleLogout = () => {
    logout();
    navigate("/"); // ✅ Using navigate to redirect
  };

  return (
    <div className="attendee-portal">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Crowdease Logo" className="logo" />
          <h2 className="portal-heading">Attendee Portal</h2>
        </div>
    
        <nav className="nav">
          <button className="nav-button">HOME</button>
          <button className="nav-button">TRENDING</button>
          <button className="nav-button">EVENTS</button>
          <button className="nav-button">UPCOMING</button>
          <button className="nav-button logout" onClick={handleLogout}>
            LOG OUT
          </button>
        </nav>
      </header>
      <main className="main-content">
        <h1 className="headline">Ready to make some noise?</h1>
        <button className="cta-button">BOOK YOUR TICKETS NOW</button>
      </main>
    </div>
  );
};

export default AttendeePortal;
