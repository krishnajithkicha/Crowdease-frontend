import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventCreation.css";

const EventCreation = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    description: "",
    category: "",
    eventDate: "",
    time: "",
    duration: "",
    promotionalImage: null,
    bannerImage: null,
    venueName: "",
    maxCapacity: "",
    seatingType: "noPreference",
    ticketType: "",
    ticketPrice: "",
    discount: "",
    paymentOption: "",
    venueImage: null,
    seatingLayout: [],
  });

  const [seatInput, setSeatInput] = useState({ id: "", row: "", column: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setEventDetails({ ...eventDetails, [name]: files[0] });
  };

  const handleAddSeat = () => {
    if (seatInput.id && seatInput.row && seatInput.column) {
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        seatingLayout: [
          ...prevDetails.seatingLayout,
          {
            id: seatInput.id,
            row: parseInt(seatInput.row, 10),
            column: parseInt(seatInput.column, 10),
            occupied: false,
          },
        ],
      }));
      setSeatInput({ id: "", row: "", column: "" });
    } else {
      alert("Please provide valid seat details.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    for (const key in eventDetails) {
      if (key === "seatingLayout") {
        formData.append(key, JSON.stringify(eventDetails[key]));
      } else {
        formData.append(key, eventDetails[key]);
      }
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication error: No token found.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert("Event created successfully!");
        navigate("/event-listing");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error creating event.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="portal-title">Event Organizer Portal</div>
      </nav>
      <main className="content">
        <h2 className="tagline">Create Your Event</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="event-form">
          <h3>Event Details</h3>
          <label>Event Name</label>
          <input
            type="text"
            name="eventName"
            value={eventDetails.eventName}
            onChange={handleChange}
            required
            placeholder="Enter event name"
          />

          <label>Description</label>
          <textarea
            name="description"
            value={eventDetails.description}
            onChange={handleChange}
            required
            placeholder="Enter event description"
          />

          <label>Category</label>
          <input
            type="text"
            name="category"
            value={eventDetails.category}
            onChange={handleChange}
            required
            placeholder="Enter category"
          />

          <label>Event Date</label>
          <input
            type="date"
            name="eventDate"
            value={eventDetails.eventDate}
            onChange={handleChange}
            required
          />

          <label>Time</label>
          <input
            type="time"
            name="time"
            value={eventDetails.time}
            onChange={handleChange}
            required
          />

          <label>Duration</label>
          <input
            type="text"
            name="duration"
            value={eventDetails.duration}
            onChange={handleChange}
            required
            placeholder="Enter event duration"
          />

          <h3>Venue Details</h3>
          <label>Venue Name</label>
          <input
            type="text"
            name="venueName"
            value={eventDetails.venueName}
            onChange={handleChange}
            required
            placeholder="Enter venue name"
          />

          <label>Max Capacity</label>
          <input
            type="number"
            name="maxCapacity"
            value={eventDetails.maxCapacity}
            onChange={handleChange}
            required
            placeholder="Enter max capacity"
          />

          <h3>Ticket Details</h3>
          <label>Ticket Type</label>
          <input
            type="text"
            name="ticketType"
            value={eventDetails.ticketType}
            onChange={handleChange}
            required
            placeholder="Enter ticket type"
          />

          <label>Ticket Price</label>
          <input
            type="number"
            name="ticketPrice"
            value={eventDetails.ticketPrice}
            onChange={handleChange}
            required
            placeholder="Enter ticket price"
          />

          <label>Discount (Optional)</label>
          <input
            type="number"
            name="discount"
            value={eventDetails.discount}
            onChange={handleChange}
            placeholder="Enter discount"
          />

          <label>Payment Option</label>
          <input
            type="text"
            name="paymentOption"
            value={eventDetails.paymentOption}
            onChange={handleChange}
            required
            placeholder="Enter payment option"
          />

          <h3>Upload Images</h3>
          <label>Promotional Image</label>
          <input
            type="file"
            name="promotionalImage"
            onChange={handleFileChange}
            accept="image/*"
            required
          />

          <label>Banner Image</label>
          <input
            type="file"
            name="bannerImage"
            onChange={handleFileChange}
            accept="image/*"
            required
          />

          <label>Venue Image</label>
          <input
            type="file"
            name="venueImage"
            onChange={handleFileChange}
            accept="image/*"
            required
          />

          <h3>Seating Layout</h3>
          <label>Seat ID</label>
          <input
            type="text"
            name="seatId"
            value={seatInput.id}
            onChange={(e) => setSeatInput({ ...seatInput, id: e.target.value })}
            placeholder="Enter seat ID"
          />

          <label>Row</label>
          <input
            type="number"
            name="row"
            value={seatInput.row}
            onChange={(e) => setSeatInput({ ...seatInput, row: e.target.value })}
            placeholder="Enter row number"
          />

          <label>Column</label>
          <input
            type="number"
            name="column"
            value={seatInput.column}
            onChange={(e) => setSeatInput({ ...seatInput, column: e.target.value })}
            placeholder="Enter column number"
          />

          <button type="button" onClick={handleAddSeat}>
            Add Seat
          </button>

          <button type="submit">Submit Event</button>
        </form>
      </main>
    </div>
  );
};

export default EventCreation;
