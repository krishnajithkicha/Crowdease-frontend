import React, { useEffect, useState, useCallback } from "react";
import "./EventOrganizerPortal.css";
import { Link } from "react-router-dom";

const Management = () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updateForm, setUpdateForm] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication error. Please log in.");
      }

      const response = await fetch(`${API_URL}/api/events`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data);
    } catch (error) {
      setError(error.message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setUpdateForm(null);
  };

  const handleUpdateEvent = (event) => {
    setUpdateForm(event);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete event");
      }

      alert("Event deleted successfully!");
      fetchEvents(); // Refresh the list of events
    } catch (error) {
      console.error("Error deleting event:", error.message);
      alert("Failed to delete event. Please try again.");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/events/${updateForm._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventName: updateForm.eventName,
          description: updateForm.description,
          category: updateForm.category,
          eventDate: updateForm.eventDate,
          time: updateForm.time,
          duration: updateForm.duration,
        }),
      });
  
      if (!response.ok) {
        // Try parsing JSON for error messages
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP Error: ${response.status}`);
      }
  
      const data = await response.json();
      alert("Event updated successfully!");
      setUpdateForm(null);
      fetchEvents(); // Refresh the event list
    } catch (error) {
      console.error("Error updating event:", error.message);
      alert(`Failed to update event: ${error.message}`);
    }
  };
  

  return (
    <div className="management-container">
      <h2 className="management-heading">Event Management - Created Events</h2>

      {loading && <p>Loading events...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="event-grid">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="event-card">
              {event.promotionalImage && (
                <img
                  src={event.promotionalImage}
                  alt={event.eventName}
                  className="event-image"
                />
              )}
              <h3>{event.eventName}</h3>
              <p><strong>Date:</strong> {new Date(event.eventDate).toDateString()}</p>
              <p><strong>Venue:</strong> {event.venueId?.venueName || "N/A"}</p>
              <button
                className="view-details-button"
                onClick={() => handleViewDetails(event)}
              >
                View More
              </button>
            </div>
          ))
        ) : (
          !loading && <p>No created events</p>
        )}
      </div>

      <Link to="/event-creation">
        <button className="create-event-button">Create Event</button>
      </Link>

      {/* Modal for Event Details */}
      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseModal}>
              ✖
            </button>
            <h2>{selectedEvent.eventName}</h2>
            <img
              src={selectedEvent.bannerImage}
              alt={selectedEvent.eventName}
              className="modal-image"
            />
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <p><strong>Category:</strong> {selectedEvent.category}</p>
            <p><strong>Date:</strong> {new Date(selectedEvent.eventDate).toDateString()}</p>
            <p><strong>Time:</strong> {selectedEvent.time}</p>
            <p><strong>Venue:</strong> {selectedEvent.venueId?.venueName || "N/A"}</p>

            <div className="action-buttons">
              <button
                className="update-button"
                onClick={() => handleUpdateEvent(selectedEvent)}
              >
                Update Event
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteEvent(selectedEvent._id)}
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Event Form */}
      {updateForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseModal}>
              ✖
            </button>
            <h2>Update Event: {updateForm.eventName}</h2>
            <form onSubmit={handleUpdateSubmit}>
              <label>
                Event Name:
                <input
                  type="text"
                  value={updateForm.eventName}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, eventName: e.target.value })
                  }
                />
              </label>
              <label>
                Description:
                <textarea
                  value={updateForm.description}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, description: e.target.value })
                  }
                ></textarea>
              </label>
              <button type="submit" className="update-button">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Management;
