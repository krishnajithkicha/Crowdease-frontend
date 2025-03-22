import React from "react";
import "./EventOrganizerPortal.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const EventOrganizerPortal = () => {
  const API_URL = process.env.REACT_APP_API_URL || "https://crowdease-backend.vercel.app";
  const { logout } = useAuth(); 

  const handleLogout = async () => {
      try {
          const response = await fetch(`${API_URL}/api/logout` , {
              method: "POST",
              credentials: "include",
          });
  
          if (!response.ok) {
              throw new Error("Logout failed. Please try again.");
          }
  
          logout(); 
      } catch (error) {
          console.error("Logout error:", error);
          alert(error.message || "An error occurred during logout.");
      }
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
            <button>MANAGEMENT</button>
          </li>
          <li>
            <button>REPORTS</button>
          </li>
          <li>
            <button>TICKET CONFIGURATION</button>
          </li>
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
