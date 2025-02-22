import React from "react";
import "./StaffPortal.css";
{/*import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";*/}

const StaffPortal = () => {
  return (
    <div className="staff-container">
      {/* Navbar */}
      <nav className="navbar">
        <button className="staff-btn">STAFF PORTAL</button>
        <ul>
          <li><a href="#">HOME</a></li>
          <li><a href="#">TASK</a></li>
          <li><a href="#">QR</a></li>
          <li><a href="#">REAL TIME ALERT</a></li>
          <li><a href="#">LOG OUT</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="logo">
          {/*<img src="logo.png" alt="CrowdEase Logo" />*/}
        </div>
        <h1 className="brand-name">CROWDEASE</h1>
        <p className="tagline">"Book Smarter, Enjoy Better"</p>
      </header>

      {/* Main Content */}
      <main className="content">
        <h2>"EFFORTLESS TICKETING, SEAMLESS EVENTS."</h2>
        <div className="pattern"></div>
        <button className="support-btn">SUPPORT ➜</button>
      </main>
    </div>
  );
};

export default StaffPortal;
