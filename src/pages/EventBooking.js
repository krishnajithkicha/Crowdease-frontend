import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EventBooking.css";

const EventBooking = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events/${eventId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch event details. Status: ${response.status}`);
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleSeatClick = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const handleBooking = async () => {
    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          seatIds: selectedSeats,
          attendeeId: currentUser?._id,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Booking failed");
      }
  
      alert("Booking confirmed!");
      setSelectedSeats([]);
  
      // Refetch event to show booked seats
      const updatedEventRes = await fetch(`${API_URL}/api/events/${eventId}`);
      const updatedEvent = await updatedEventRes.json();
      setEvent(updatedEvent);
    } catch (error) {
      alert("Error booking seats: " + error.message);
    }
  };
  
  

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return <p>Loading event details...</p>;

  const seatingLayout = event.seatingLayout || [];
  const venueType = event.venueId?.venueType || "auditorium";

  const renderSeats = () => {
    if (venueType === "stadium") {
      return <p>Stadium layout coming soon!</p>; // placeholder
    }
    return renderAuditoriumLayout(seatingLayout);
  };
  

  const renderAuditoriumLayout = (layout) => {
    const rows = Math.max(...layout.map((seat) => seat.row));
    const columns = Math.max(...layout.map((seat) => seat.column));
  
    const getRowLabel = (rowNum) => String.fromCharCode(64 + rowNum); // 1 -> A
  
    // Create a map for faster lookup
    const seatMap = {};
    layout.forEach((seat) => {
      seatMap[`${seat.row}-${seat.column}`] = seat;
    });
    <div style={{ marginBottom: "1rem" }}>
    <span className="seat" style={{ backgroundColor: "#eee" }}>Available</span>{" "}
    <span className="seat" style={{ backgroundColor: "#5cb85c", color: "white" }}>Selected</span>{" "}
    <span className="seat" style={{ backgroundColor: "#d9534f", color: "white" }}>Booked</span>
  </div>
  
    return (
      <div className="auditorium-layout">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {Array.from({ length: columns }).map((_, colIndex) => {
              const row = rowIndex + 1;
              const col = colIndex + 1;
              const seatKey = `${row}-${col}`;
              const seat = seatMap[seatKey] || {
                id: `${row}-${col}`,
                row,
                column: col,
                occupied: false,
              };
  
              const seatLabel = `${getRowLabel(row)}${col}`;
              const isSelected = selectedSeats.includes(seat.id);
  
              return (
                <div
                  key={seat.id}
                  className={`seat ${seat.occupied ? "occupied" : ""} ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() =>
                    !seat.occupied && handleSeatClick(seat.id)
                  }
                >
                  {seatLabel}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };
  
  
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

      <h2>Seat Layout</h2>
      <div className="seat-layout">{renderSeats()}</div>

      <h2>Selected Seats</h2>
      <p>{selectedSeats.join(", ") || "No seats selected"}</p>

      <button onClick={handleBooking} disabled={selectedSeats.length === 0}>
        Confirm Booking
      </button>
    </div>
  );
};

export default EventBooking;
