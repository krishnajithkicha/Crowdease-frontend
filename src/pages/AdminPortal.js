import React from "react";
import "./AdminPortal.css";
import centerImage from "../assets/sym.png"; // Ensure the correct image path
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminPortal = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="admin-portal">
      {/* Header Section */}
      <header className="header">
        <div className="logo"></div> {/* Logo with background image */}
        <div className="admin-title">ADMIN PORTAL</div>
        <nav className="nav">
          <button onClick={() => navigate("/management")}>Management</button>
          <button onClick={() => navigate("/analytics")}>Analytics</button>
          <button onClick={() => navigate("/notifications")}>Notifications</button>
          <button onClick={() => navigate("/security")}>Security</button>
          <button className="logout" onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Center Image */}
        <div className="center-image">
          <img src={centerImage} alt="Event Setup" />
        </div>

        {/* Text Elements Positioned Properly */}
        <h1 className="brand-title">CROWDEASE</h1>
        {/*<p className="tagline">"BOOK SMARTER, ENJOY BETTER!"</p>*/}
        <div className="cta-text">BEST WAY TO PLAN</div>

        {/* Navigation Button */}
        {/*<button className="next-button">→</button>*/}
      </main>
    </div>
  );
};

export default AdminPortal;
