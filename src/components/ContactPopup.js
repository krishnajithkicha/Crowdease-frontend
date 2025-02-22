import React from "react";

function ContactPopup() {
    return (
        <div style={popupStyle}>
            <h3>Contact Us</h3>
            <p>Email: admin@crowdease.com</p>
        </div>
    );
}

const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
};

export default ContactPopup;
