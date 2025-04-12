import React, { useEffect, useState } from "react";
import "./EventView.css";
import { useNavigate } from "react-router-dom";

const EventView = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null); // Track selected event for modal
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  useEffect(() => {
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

    fetchEvents();
  }, []);

  return (
    <div className="event-container">
      <h1>Event Listings</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <div className="event-grid">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="event-card">
              <img src={event.promotionalImage} alt={event.eventName} className="event-image" />
              <h2>{event.eventName}</h2>
              <p>{new Date(event.eventDate).toDateString()} | {event.venueId?.venueName || "N/A"}</p>
              <button onClick={() => setSelectedEvent(event)}>View & Book</button>
            </div>
          ))
        ) : (
          <p>No events available</p>
        )}
      </div>

      {/* Modal for Viewing and Booking */}
      {selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedEvent(null)}>&times;</span>
            <img src={selectedEvent.promotionalImage} alt={selectedEvent.eventName} className="modal-image" />
            <h2>{selectedEvent.eventName}</h2>
            <p>{selectedEvent.description}</p>
            <p><strong>Category:</strong> {selectedEvent.category}</p>
            <p><strong>Date:</strong> {new Date(selectedEvent.eventDate).toDateString()}</p>
            <p><strong>Time:</strong> {selectedEvent.time}</p>
            <p><strong>Venue:</strong> {selectedEvent.venueId?.venueName || "N/A"}</p>
            <button className="book-btn" onClick={() => navigate(`/event-book/${selectedEvent._id}`)}>
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventView;
