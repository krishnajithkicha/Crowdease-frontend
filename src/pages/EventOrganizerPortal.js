import React from "react";
import "./EventOrganizerPortal.css";

const EventOrganizerPortal = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("token");
        sessionStorage.clear();
        alert("Logged out successfully!");
        window.location.href = "/login";
      } else {
        alert("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout.");
    }
  };

  return (
    <div className="portal-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-text"></span>
          {/*<p className="tagline">"Book Smarter, Enjoy Better"</p>*/}
        </div>
        <ul className="nav-links">
          <li><button>EVENT CREATION</button></li>
          <li><button>MANAGEMENT</button></li>
          <li><button>REPORTS</button></li>
          <li><button>TICKET CONFIGURATION</button></li>
          <li><button>NOTIFICATION</button></li>
          <li><button onClick={handleLogout}>LOG OUT</button></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="hero-text">"THE SMART WAY TO MANAGE EVENTS."</h1>
        <button className="support-button">SUPPORT</button>
      </main>
    </div>
  );
};

export default EventOrganizerPortal;
