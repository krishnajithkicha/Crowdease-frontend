import React from "react";
import "./HomePage.css"; // Reuse the same CSS for background styling
import coverImage from "../assets/1.png"; // Same background

function ContactPage() {
    return (
        <div className="cover-page" style={{ backgroundImage: `url(${coverImage})` }}>
            <header className="header">
                <div className="logo"></div>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/login">Log In / Sign Up</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
            </header>
            <main className="contact-box">
                <h2>Contact Admin</h2>
                <p>Email: <a href="mailto:admin@example.com">admin@example.com</a></p>
            </main>
        </div>
    );
}

export default ContactPage;
