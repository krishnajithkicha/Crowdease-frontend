import React, { useEffect, useState } from "react";
import "./AttendeePortal.css"; // Reusing the same CSS for consistency
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TicketView = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/tickets`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}` // Replace with how you store the token
        }
      });
      setTickets(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('No tickets found');
      } else {
        console.error('Failed to fetch tickets:', error);
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="attendee-portal">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Crowdease Logo" className="logo" />
          <h2 className="portal-heading">My Tickets</h2>
        </div>
    
        <nav className="nav">
          <button className="nav-button" onClick={() => navigate("/attendee-portal")}>
            HOME
          </button>
          <button className="nav-button">TRENDING</button>
          <button className="nav-button" onClick={() => navigate("/event-view")}>
            BOOK EVENTS
          </button>
          <button className="nav-button">UPCOMING</button>
          <button className="nav-button logout" onClick={handleLogout}>
            LOG OUT
          </button>
        </nav>
      </header>
      <main className="main-content">
        <h1 className="headline">Your Tickets</h1>
        {loading ? (
          <p>Loading your tickets...</p>
        ) : tickets.length > 0 ? (
          <ul className="ticket-list">
            {tickets.map((ticket) => (
              <li key={ticket.id} className="ticket-item">
                <p><strong>Event Name:</strong> {ticket.eventName}</p>
                <p><strong>Date:</strong> {ticket.date}</p>
                <p><strong>Seat Number:</strong> {ticket.seatNumber}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tickets found.</p>
        )}
      </main>
    </div>
  );
};

export default TicketView;
