import React from "react";  
import { Link } from "react-router-dom";  
import "./HomePage.css"; // Ensure this file exists  
import coverImage from "../assets/1.png"; // Import the cover image  

function HomePage() {  
    return (  
        <div className="cover-page" style={{ backgroundImage: `url(${coverImage})` }}>  
            <header className="header">  
                <div className="logo"></div>  
                <nav>  
                    <ul>  
                        <li><Link to="/">Home</Link></li>  
                        <li><Link to="/login">Log In / Sign Up</Link></li>  
                        <li><Link to="/contact">Contact</Link></li>  
                    </ul>  
                </nav>  
            </header>  
            <main className="hero">  
            <h1 aria-hidden="true">‎</h1>

            </main>  
        </div>  
    );  
}  

export default HomePage;