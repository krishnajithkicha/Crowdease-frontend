import React, { useEffect, useState } from "react";
import "./EventView.css";

const EventView = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/all-events`, {
        method: "GET", // Explicitly set the GET method
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching events:", errorData);
        setError(errorData.message || "Failed to fetch events");
        return;
      }

      const data = await response.json();
      console.log("Fetched events:", data);
      setEvents(data);
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error: Unable to fetch events.");
    }
  };

  useEffect(() => {
    fetchEvents(); // Call fetchEvents inside useEffect
  }, []);

  return (
    <div>
      <h1>Event Listings</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event._id} className="event-card">
            <h2>{event.eventName}</h2>
            <p>
              {new Date(event.eventDate).toDateString()} | {event.venueId?.venueName || "N/A"}
            </p>
            <button onClick={() => console.log(`Booking event: ${event._id}`)}>
              Book Now
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
