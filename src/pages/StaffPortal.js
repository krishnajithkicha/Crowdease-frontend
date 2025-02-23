import React from "react";  
import "./StaffPortal.css";  

const StaffPortal = () => {  
  return (  
    <div className="staff-container">  
      {/* Navbar */}  
      <nav className="navbar">  
        <div className="logo">  
          {/*<img src="logo.png" alt="CrowdEase Logo" />*/}  
        </div>  
        <button className="staff-btn">STAFF PORTAL</button>  
        <ul>  
          <li><button className="nav-button">HOME</button></li>  
          <li><button className="nav-button">TASK</button></li>  
          <li><button className="nav-button">QR</button></li>  
          <li><button className="nav-button">REAL TIME ALERT</button></li>  
          <li><button className="nav-button">LOG OUT</button></li>  
        </ul>  
      </nav>  

      {/* Hero Section */}  
      <header className="hero">  
        <p className="tagline">"Book Smarter, Enjoy Better"</p>  
      </header>  

      {/* Main Content */}  
      <main className="content">  
        <h2 className="main-tagline">"EFFORTLESS TICKETING, SEAMLESS EVENTS."</h2>  
        <div className="pattern"></div>  
        <button className="support-btn">SUPPORT ➜</button>  
      </main>  
    </div>  
  );  
};  

export default StaffPortal;