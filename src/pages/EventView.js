import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./EventView.css";

const EventView = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const navigate = useNavigate(); // Initialize navigation

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/all-events`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch events");
        return;
      }

      const data = await response.json();
      setEvents(data);
    } catch (error) {
      setError("Network error: Unable to fetch events.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Event Listings</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event._id} className="event-card">
            <h2>{event.eventName}</h2>
            <p>{new Date(event.eventDate).toDateString()} | {event.venueId?.venueName || "N/A"}</p>
            <button onClick={() => 
              navigate(`/event-book/${event._id}`)}>
              View & Book
            </button>
          </div>
        ))
      ) : (
        <p>No events available</p>
      )}
    </div>
  );
};

export default EventView;
