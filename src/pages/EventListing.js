import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventCreation.css";

const EventListing = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "https://crowdease-backend.vercel.app";

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }
  
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Fetch error:", errorData.message);
          return;
        }
  
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Network error:", error);
      }
    };
  
    fetchEvents();
  }, []);
  
  

  return (
    <div className="container">
      <nav className="navbar">
        <div className="portal-title">Event Listing</div>
        <button className="nav-button" onClick={() => navigate("/event-creation")}>Create Event</button>
      </nav>
      <main className="content">
        <h2 className="tagline">Upcoming Events</h2>
        <div className="event-list">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event._id} className="event-card">
                <h3>{event.eventName}</h3>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.eventDate).toDateString()}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Venue:</strong> {event.venueName}</p>
                {event.promotionalImage && (
                  <img src={event.promotionalImage} alt={event.eventName} className="image-preview" />
                )}
              </div>
            ))
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default EventListing;
