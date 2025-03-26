import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventBooking = () => {
  const { eventId } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events/${eventId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return <p>Loading event details...</p>;

  return (
    <div>
      <h1>{event.eventName}</h1>
      <p>{event.description}</p>
      <p>Category: {event.category}</p>
      <p>Date: {new Date(event.eventDate).toDateString()}</p>
      <p>Time: {event.time}</p>
      <p>Duration: {event.duration}</p>

      <h2>Venue Details</h2>
      <p>Name: {event.venueId?.venueName}</p>
      <p>Max Capacity: {event.venueId?.maxCapacity}</p>
      <p>Seating Type: {event.venueId?.seatingType}</p>
      {event.venueId?.image && <img src={event.venueId.image} alt="Venue" width="300" />}

      <h2>Seat Layout</h2>
      {event.venueId?.seatingLayout && <img src={event.venueId.seatingLayout} alt="Seating Layout" width="300" />}

      <h2>Ticket Details</h2>
      <p>Price: ${event.ticketPrice}</p>

      <button onClick={() => alert("Proceed to Booking...")}>Book Now</button>
    </div>
  );
};

export default EventBooking;
