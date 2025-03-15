import React, { useState } from "react";
import "./VenueManagement.css"; // Reusing VenueManagement styles for consistency
import "./EventCreation.css"; // Reusing EventCreation styles for consistency
import "./TicketPricing.css";

function TicketPricing() {
  const [ticketType, setTicketType] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [promoImage, setPromoImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ticketType", ticketType);
    formData.append("ticketPrice", ticketPrice);
    formData.append("discount", discount);
    formData.append("paymentOption", paymentOption);
    if (promoImage) {
      formData.append("promoImage", promoImage);
    }

    try {
      const response = await fetch(
        "https://crowdease-backend.vercel.app/api/ticket-pricing", // Updated API endpoint
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Ticket pricing saved successfully!");
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
        <h2 className="tagline">TICKET PRICING & SALES</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Ticket Type*
            <input
              type="text"
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
              required
            />
          </label>

          <label>
            Ticket Price
            <input
              type="number"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
            />
          </label>

          <label>
            Discount
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </label>

          <label>
            Payment Option*
            <select
              value={paymentOption}
              onChange={(e) => setPaymentOption(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Payment Option
              </option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="UPI">UPI</option>
              <option value="Net Banking">Net Banking</option>
            </select>
          </label>

          <label>
            Add Promo Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPromoImage(e.target.files[0])}
            />
          </label>

          <button type="submit">Save Ticket Pricing</button>
        </form>
      </main>
    </div>
  );
}

export default TicketPricing;
