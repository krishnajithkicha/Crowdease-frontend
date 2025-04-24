import React, { useEffect, useState } from "react";
import "./AdminManagement.css";
import { useNavigate } from "react-router-dom";

const AdminManagement = () => {
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
  const handleCancelEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to cancel this event?")) return;
  
    try {
      const response = await fetch(`${API_URL}/api/admin/delete-event/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // or use your auth context
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to delete event.");
        return;
      }
  
      // Remove the deleted event from the list
      setEvents((prevEvents) => prevEvents.filter((e) => e._id !== eventId));
      setSelectedEvent(null);
    } catch (err) {
      setError("Failed to cancel the event.");
      console.error(err);
    }
  };
  

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
              <button className="cancel-btn" onClick={() => handleCancelEvent(selectedEvent._id)}>
          Cancel Event
        </button>
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

      <div className="modal-actions">
        <button className="cancel-btn" onClick={() => handleCancelEvent(selectedEvent._id)}>
          Cancel Event
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AdminManagement;
