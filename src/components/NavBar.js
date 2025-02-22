import React from 'react';  
import { Link } from 'react-router-dom'; // Ensure you're using react-router-dom for navigation  

const NavBar = () => {  
    return (  
        <nav className="header">  
            <div className="logo">CROWDEASE</div>  
            <ul>  
                <li><Link to="/">Home</Link></li>  
                <li><Link to="/music">Music</Link></li>  
                <li><Link to="/login">Log In / Sign Up</Link></li> {/* Updated link */}  
                <li><Link to="/contact">Contact</Link></li>  
            </ul>  
        </nav>  
    );  
};  

export default NavBar;