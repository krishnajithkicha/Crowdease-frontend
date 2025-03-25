import React from "react";
import "./EventOrganizerPortal.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const EventOrganizerPortal = () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const { logout } = useAuth(); 
  const navigate = useNavigate(); 

  {/*const handleLogout = async () => {
    try {
        const response = await fetch(`${API_URL}/api/logout`, {
            method: "POST",
            credentials: "include",
        });

        const data = await response.json(); 
        console.log("Logout Response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Logout failed. Please try again.");
        }

        logout(); 
    } catch (error) {
        console.error("Logout error:", error);
        alert(error.message || "An error occurred during logout.");
    }
};*/}
  const handleLogout = () => {
    logout();
    navigate("/"); // ✅ Using navigate to redirect
  };

  

  return (
    <div className="portal-container">
      <nav className="navbar">
        <div className="logo">
          <span className="logo-text"></span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/event-creation">
              <button>EVENT CREATION</button>
            </Link>
          </li>
          <li>
            <Link to="/management">
            <button>MANAGEMENT</button>
            </Link>
          </li>
          <li>
            <button>REPORTS</button>
          </li>
           {/*<li>
            <button>TICKET CONFIGURATION</button>
          </li>*/}
          <li>
            <button>NOTIFICATION</button>
          </li>
          <li>
            <button onClick={handleLogout}>LOG OUT</button>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        <h1 className="hero-text">"THE SMART WAY TO MANAGE EVENTS."</h1>
        <button className="support-button">SUPPORT</button>
      </main>
    </div>
  );
};

export default EventOrganizerPortal;
