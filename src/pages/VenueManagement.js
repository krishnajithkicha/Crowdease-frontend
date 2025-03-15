import React, { useState } from "react";
import "./VenueManagement.css";
import "./EventCreation.css";
const VenueManagement = () => {
  const [venueDetails, setVenueDetails] = useState({
    venueName: "",
    seatingCapacity: "",
    seatingType: "",
  });
  const [venueImage, setVenueImage] = useState(null); // State for venue image
  const [seatingLayout, setSeatingLayout] = useState(null); // State for seating layout

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueDetails({ ...venueDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "venueImage") {
      setVenueImage(files[0]);
    } else if (name === "seatingLayout") {
      setSeatingLayout(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("venueName", venueDetails.venueName);
    formData.append("maxCapacity", venueDetails.seatingCapacity);
    formData.append("seatingType", venueDetails.seatingType);
    formData.append("venueImage", venueImage); // Append venue image
    formData.append("seatingLayout", seatingLayout); // Append seating layout image

    try {
      const response = await fetch(
        "https://crowdease-backend.vercel.app/api/venues",
        {
          method: "POST",
          body: formData, // Send formData
        }
      );

      if (response.ok) {
        alert("Venue saved successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error occurred. Please try again.");
    }
  };

  return (
    <div className="venue-container">
      <nav className="navbar">
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
        <h2 className="tagline">VENUE & SEATING MANAGEMENT</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Venue Name:
            <input
              type="text"
              name="venueName"
              value={venueDetails.venueName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Seating Capacity:
            <input
              type="number"
              name="seatingCapacity"
              value={venueDetails.seatingCapacity}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Seating Type:
            <select
              name="seatingType"
              value={venueDetails.seatingType}
              onChange={handleChange}
              required
            >
              <option value="">Select Seating Type</option>
              <option value="seatSelection">Seat Selection</option>
              <option value="noPreference">No Preference</option>
            </select>
          </label>
          <label>
            Venue Image:
            <input
              type="file"
              name="venueImage"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </label>
          <label>
            Seating Layout Image:
            <input
              type="file"
              name="seatingLayout"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </label>
          <button type="submit">Save Venue Details</button>
        </form>
      </main>
    </div>
  );
};

export default VenueManagement;
