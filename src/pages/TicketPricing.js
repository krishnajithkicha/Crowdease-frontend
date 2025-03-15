import React, { useState } from "react";
import "./TicketPricing.css";

function TicketPricing() {
  const [ticketType, setTicketType] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [promoImage, setPromoImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ticketType", ticketType);
    formData.append("ticketPrice", ticketPrice);
    formData.append("discount", discount);
    formData.append("paymentOption", paymentOption);
    if (promoImage) {
      formData.append("promoImage", promoImage);
    }

    // Send data to the backend
    fetch("/api/ticket-pricing", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Ticket pricing saved successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="ticket-pricing-container">
      <h2>TICKET PRICING & SALES</h2>
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TicketPricing;
