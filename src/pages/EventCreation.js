import React, { useState } from "react";
import "./EventCreation.css"; // Import your CSS file here.

const EventCreation = () => {
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    description: "",
    category: "",
    eventDate: "",
    time: "",
    duration: "",
    promotionalImage: null,
    bannerImage: null,
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
    formData.append("eventName", eventDetails.eventName);
    formData.append("description", eventDetails.description);
    formData.append("category", eventDetails.category);
    formData.append("eventDate", eventDetails.eventDate);
    formData.append("time", eventDetails.time);
    formData.append("duration", eventDetails.duration);
    formData.append("promotionalImage", eventDetails.promotionalImage);
    formData.append("bannerImage", eventDetails.bannerImage);

    try {
      const response = await fetch("https://crowdease-backend.vercel.app/api/events", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Event created successfully:", result);
        alert("Event created successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error creating event:", errorData);
        alert("Error creating event: " + errorData.message);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">
          {/* <img src="logo.png" alt="CrowdEase Logo" /> */}
        </div>
        <div className="portal-title">Event Organizer Portal</div>
        <ul>
          <li>
            <button className="nav-button">EVENT CREATION</button>
          </li>
          <li>
            <button className="nav-button">MANAGEMENT</button>
          </li>
          <li>
            <button className="nav-button">REPORTS</button>
          </li>
          <li>
            <button className="nav-button">TICKET CONFIGURATION</button>
          </li>
          <li>
            <button className="nav-button">NOTIFICATION</button>
          </li>
          <li>
            <button className="nav-button">LOG OUT</button>
          </li>
        </ul>
      </nav>

      <main className="content">
        <h2 className="tagline">EVENT DETAILS</h2>
        <form onSubmit={handleSubmit} className="event-form">
          <label>
            Event Name:
            <input
              type="text"
              name="eventName"
              value={eventDetails.eventName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={eventDetails.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={eventDetails.category}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Event Date:
            <input
              type="date"
              name="eventDate"
              value={eventDetails.eventDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              name="time"
              value={eventDetails.time}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Duration:
            <input
              type="text"
              name="duration"
              value={eventDetails.duration}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Promotional Image:
            <input
              type="file"
              name="promotionalImage"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>
          <label>
            Upload Event Banner:
            <input
              type="file"
              name="bannerImage"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>
          <button type="submit">Submit Event Details</button>
        </form>
        {/*<button className="support-btn">SUPPORT</button>*/}
      </main>
    </div>
  );
};

export default EventCreation;
