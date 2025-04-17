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
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

      const updatedEventRes = await fetch(`${API_URL}/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedEvent = await updatedEventRes.json();
      setEvent(updatedEvent); // 👈 updates layout
      
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
      return <p>Stadium layout coming soon!</p>;
    }
    return renderAuditoriumLayout(seatingLayout);
  };

  const renderAuditoriumLayout = (layout) => {
    const getRowLabel = (rowNum) => String.fromCharCode(64 + rowNum);
    const groupedByType = { gold: {}, vip: {}, normal: {} };
  
    layout.forEach((seat) => {
      const { type = "normal", row } = seat;
      if (!groupedByType[type][row]) groupedByType[type][row] = [];
      groupedByType[type][row].push(seat);
    });
  
    const getSeatColor = (seat) => {
      if (seat.occupied) return "red";
      if (selectedSeats.includes(seat.id)) return "blue";
      if (seat.type === "gold") return "gold";
      if (seat.type === "vip") return "orange";
      return "green";
    };
  
    const renderSection = (seatsByRow, label) => {
      const sortedRows = Object.keys(seatsByRow).sort((a, b) => a - b);
      return (
        <div className="seat-section">
          <h3>{label.toUpperCase()} Section</h3>
          {sortedRows.map((rowKey) => {
            const row = parseInt(rowKey);
            const seats = seatsByRow[row].sort((a, b) => a.column - b.column);
  
            return (
              <div key={row} className="seat-row">
                {seats.map((seat) => {
                  const seatLabel = `${getRowLabel(seat.row)}${seat.column}`;
                  const isSelected = selectedSeats.includes(seat.id);
  
                  return (
                    <div
                      key={seat.id}
                      className={`seat ${seat.occupied ? "occupied" : ""} ${isSelected ? "selected" : ""} ${seat.type}`}
                      onClick={() => !seat.occupied && handleSeatClick(seat.id)}
                      title={`Seat ${seatLabel} - ${seat?.section?.toUpperCase?.() || "UNKNOWN"} }`}
                      style={{
                        backgroundColor: getSeatColor(seat),
                        color: "#fff",
                        borderRadius: "4px",
                        padding: "5px",
                        margin: "2px",
                        cursor: seat.occupied ? "not-allowed" : "pointer"
                      }}
                    >
                      {seatLabel}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    };
  
    return (
      <div className="auditorium-layout">
        {renderSection(groupedByType.gold, "Gold")}
        {renderSection(groupedByType.vip, "VIP")}
        {renderSection(groupedByType.normal, "Normal")}
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
