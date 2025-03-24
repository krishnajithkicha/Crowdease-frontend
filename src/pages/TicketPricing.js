import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TicketPricing.css";
import "./EventCreation.css";

const TicketPricing = () => {
  const [ticketDetails, setTicketDetails] = useState({
    ticketType: "",
    price: "",
    discount: "",
    paymentOption: "",
    promoImage: null,
  });
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails({ ...ticketDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    setTicketDetails({ ...ticketDetails, promoImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ticketType", ticketDetails.ticketType);
    formData.append("price", ticketDetails.price);
    formData.append("discount", ticketDetails.discount);
    formData.append("paymentOption", ticketDetails.paymentOption);
    formData.append("promoImage", ticketDetails.promoImage);

    try {
      const response = await fetch(`${API_URL}/api/ticket-pricing`, {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        alert("Ticket pricing saved successfully!");
        navigate("/next-page"); // Replace with the actual next page route
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
    <div className="container">
      <nav className="navbar">
        <div className="portal-title">Event Organizer Portal</div>
        <ul>
          <li><button className="nav-button">EVENT CREATION</button></li>
          <li><button className="nav-button">MANAGEMENT</button></li>
          <li><button className="nav-button">REPORTS</button></li>
          <li><button className="nav-button">TICKET CONFIGURATION</button></li>
          <li><button className="nav-button">NOTIFICATION</button></li>
          <li><button className="nav-button">LOG OUT</button></li>
        </ul>
      </nav>

      <main className="content">
        <h2 className="tagline">TICKET PRICING & SALES</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Set Ticket Type:
            <input
              type="text"
              name="ticketType"
              value={ticketDetails.ticketType}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Ticket Price:
            <input
              type="number"
              name="price"
              value={ticketDetails.price}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Discount:
            <input
              type="text"
              name="discount"
              value={ticketDetails.discount}
              onChange={handleChange}
            />
          </label>
          <label>
            Payment Option:
            <input
              type="text"
              name="paymentOption"
              value={ticketDetails.paymentOption}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Add Promo Image:
            <input
              type="file"
              name="promoImage"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <button type="submit">Save Ticket Details</button>
        </form>
      </main>
    </div>
  );
};

export default TicketPricing;
