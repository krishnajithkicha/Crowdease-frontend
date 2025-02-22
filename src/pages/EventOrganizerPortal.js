import React from "react";  
import "./EventOrganizerPortal.css";  

const EventOrganizerPortal = () => {  
  return (  
    <div className="container">  
      {/* Navbar */}  
      <nav className="navbar">  
        <div className="logo">  
        { /* <img src="logo.png" alt="CrowdEase Logo" />  */}
        </div>  
        <div className="portal-title">Event Organizer Portal</div>  
        <ul>  
          <li><button className="nav-button">EVENT CREATION</button></li>  
          <li><button className="nav-button">MANAGEMENT</button></li>  
          <li><button className="nav-button">REPORTS</button></li>  
          <li><button className="nav-button">TICKET CONFIGURATION</button></li>  
          <li><button className="nav-button">NOTIFICATION</button></li>  
          <li><button className="nav-button">LOG OUT</button></li>  
        </ul>  
      </nav>  

      {/* Main Content */}  
      <main className="content">  
        <h2 className="tagline">"THE SMART WAY TO MANAGE EVENTS."</h2>  
        <button className="support-btn">SUPPORT</button>  
      </main>  
    </div>  
  );  
};  

export default EventOrganizerPortal;