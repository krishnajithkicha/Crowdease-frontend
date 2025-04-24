import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventCreation.css";

const EventCreation = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [entrances, setEntrances] = useState([]);
const [exits, setExits] = useState([]);
const [entryInput, setEntryInput] = useState({ row: "", col: "" });
const [exitInput, setExitInput] = useState({ row: "", col: "" });


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
  });

  const [seatSections, setSeatSections] = useState([]);
  const [sectionInput, setSectionInput] = useState({
    sectionName: "",
    rows: "",
    seatsPerRow: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setEventDetails({ ...eventDetails, [name]: files[0] });
  };

  const handleAddSection = () => {
    const { sectionName, rows, seatsPerRow } = sectionInput;
    if (sectionName && rows && seatsPerRow) {
      setSeatSections((prev) => [
        ...prev,
        {
          sectionName,
          rows: parseInt(rows, 10),
          seatsPerRow: parseInt(seatsPerRow, 10),
        },
      ]);
      setSectionInput({ sectionName: "", rows: "", seatsPerRow: "" });
    } else {
      alert("Please fill all section fields.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    for (const key in eventDetails) {
      formData.append(key, eventDetails[key]);
    }

    formData.append("seatSections", JSON.stringify(seatSections));

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
    formData.append("entrances", JSON.stringify(entrances));
formData.append("exits", JSON.stringify(exits));

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

          <h3>Seating Sections</h3>

          <label>Section Name</label>
          <input
            type="text"
            name="sectionName"
            value={sectionInput.sectionName}
            onChange={(e) =>
              setSectionInput({ ...sectionInput, sectionName: e.target.value })
            }
            placeholder="e.g., Gold, VIP"
          />

          <label>Rows</label>
          <input
            type="number"
            name="rows"
            value={sectionInput.rows}
            onChange={(e) =>
              setSectionInput({ ...sectionInput, rows: e.target.value })
            }
            placeholder="Enter number of rows"
          />

          <label>Seats Per Row</label>
          <input
            type="number"
            name="seatsPerRow"
            value={sectionInput.seatsPerRow}
            onChange={(e) =>
              setSectionInput({ ...sectionInput, seatsPerRow: e.target.value })
            }
            placeholder="Enter seats per row"
          />

          <button type="button" onClick={handleAddSection}>
            Add Section
          </button>

          {seatSections.length > 0 && (
            <ul>
              {seatSections.map((section, index) => (
                <li key={index}>
                  {section.sectionName} - {section.rows} rows ×{" "}
                  {section.seatsPerRow} seats
                </li>
              ))}
            </ul>
          )}<h3>Entrances</h3>
          <input
            type="number"
            placeholder="Row"
            value={entryInput.row}
            onChange={(e) => setEntryInput({ ...entryInput, row: e.target.value })}
          />
          <input
            type="number"
            placeholder="Column"
            value={entryInput.col}
            onChange={(e) => setEntryInput({ ...entryInput, col: e.target.value })}
          />
          <button type="button" onClick={() => {
            if (entryInput.row && entryInput.col) {
              setEntrances([...entrances, { row: parseInt(entryInput.row), col: parseInt(entryInput.col) }]);
              setEntryInput({ row: "", col: "" });
            }
          }}>
            Add Entrance
          </button>
          <ul>
            {entrances.map((e, i) => (
              <li key={i}>Entrance at Row {e.row}, Col {e.col}</li>
            ))}
          </ul>
          
          <h3>Exits</h3>
          <input
            type="number"
            placeholder="Row"
            value={exitInput.row}
            onChange={(e) => setExitInput({ ...exitInput, row: e.target.value })}
          />
          <input
            type="number"
            placeholder="Column"
            value={exitInput.col}
            onChange={(e) => setExitInput({ ...exitInput, col: e.target.value })}
          />
          <button type="button" onClick={() => {
            if (exitInput.row && exitInput.col) {
              setExits([...exits, { row: parseInt(exitInput.row), col: parseInt(exitInput.col) }]);
              setExitInput({ row: "", col: "" });
            }
          }}>
            Add Exit
          </button>
          <ul>
            {exits.map((e, i) => (
              <li key={i}>Exit at Row {e.row}, Col {e.col}</li>
            ))}
          </ul>
          

          <button type="submit">Submit Event</button>
        </form>
      </main>
    </div>
  );
};

export default EventCreation;
