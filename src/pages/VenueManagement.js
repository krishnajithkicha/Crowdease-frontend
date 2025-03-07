import React, { useState } from "react";
import "./VenueManagement.css";

const VenueManagement = () => {
  const [venueDetails, setVenueDetails] = useState({
    venueName: "",
    seatingCapacity: "",
    seatingPreference: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueDetails({ ...venueDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://crowdease-backend.vercel.app/api/venues",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(venueDetails),
        }
      );

      if (response.ok) {
        alert("Venue saved successfully!");
      } else {
        alert("Error saving venue.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error occurred. Please try again.");
    }
  };

  return (
    <div className="venue-container">
      <h2>Venue & Seating Management</h2>
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
          Seating Preference:
          <select
            name="seatingPreference"
            value={venueDetails.seatingPreference}
            onChange={handleChange}
          >
            <option value="Assigned Seating">Assigned Seating</option>
            <option value="No Preference">No Preference</option>
          </select>
        </label>
        <button type="submit">Save Venue Details</button>
      </form>
    </div>
  );
};

export default VenueManagement;
