import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventCreation.css";

const EventCreation = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "https://crowdease-backend.vercel.app";

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
    seatingLayout: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setEventDetails({ ...eventDetails, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in eventDetails) {
      formData.append(key, eventDetails[key]);
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
        alert("Error creating event: " + errorData.message);
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="portal-title">Event Organizer Portal</div>
      </nav>
      <main className="content">
        <h2 className="tagline">Create Your Event</h2>
        <form onSubmit={handleSubmit} className="event-form">

          {/* Event Details Section */}
          <h3>Event Details</h3>
          <label>Event Name</label>
          <input type="text" name="eventName" value={eventDetails.eventName} onChange={handleChange} required placeholder="Enter event name" />

          <label>Description</label>
          <textarea name="description" value={eventDetails.description} onChange={handleChange} required placeholder="Enter event description" />

          <label>Category</label>
          <input type="text" name="category" value={eventDetails.category} onChange={handleChange} required placeholder="Enter category" />

          <label>Event Date</label>
          <input type="date" name="eventDate" value={eventDetails.eventDate} onChange={handleChange} required />

          <label>Time</label>
          <input type="time" name="time" value={eventDetails.time} onChange={handleChange} required />

          <label>Duration</label>
          <input type="text" name="duration" value={eventDetails.duration} onChange={handleChange} required placeholder="Enter event duration" />

          {/* Venue Details Section */}
          <h3>Venue Details</h3>
          <label>Venue Name</label>
          <input type="text" name="venueName" value={eventDetails.venueName} onChange={handleChange} required placeholder="Enter venue name" />

          <label>Max Capacity</label>
          <input type="number" name="maxCapacity" value={eventDetails.maxCapacity} onChange={handleChange} required placeholder="Enter max capacity" />

          {/* Ticket Details Section */}
          <h3>Ticket Details</h3>
          <label>Ticket Type</label>
          <input type="text" name="ticketType" value={eventDetails.ticketType} onChange={handleChange} required placeholder="Enter ticket type" />

          <label>Ticket Price</label>
          <input type="number" name="ticketPrice" value={eventDetails.ticketPrice} onChange={handleChange} required placeholder="Enter ticket price" />

          <label>Discount (Optional)</label>
          <input type="number" name="discount" value={eventDetails.discount} onChange={handleChange} placeholder="Enter discount" />

          <label>Payment Option</label>
          <input type="text" name="paymentOption" value={eventDetails.paymentOption} onChange={handleChange} required placeholder="Enter payment option" />

          {/* Upload Images Section */}
          <h3>Upload Images</h3>
          <label>Promotional Image</label>
          <input type="file" name="promotionalImage" onChange={handleFileChange} accept="image/*" />

          <label>Banner Image</label>
          <input type="file" name="bannerImage" onChange={handleFileChange} accept="image/*" />

          <label>Venue Image</label>
          <input type="file" name="venueImage" onChange={handleFileChange} accept="image/*" required />

          <label>Seating Layout</label>
          <input type="file" name="seatingLayout" onChange={handleFileChange} accept="image/*" required />

          <button type="submit">Submit Event</button>
        </form>
      </main>
    </div>
  );
};

export default EventCreation;
