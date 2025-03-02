import React, { useState, useEffect } from "react";  
import "./LoginPage.css";  
import coverImage from "../assets/1.png";  
import { useAuth } from "../context/AuthContext";  
import { Link, useNavigate } from "react-router-dom";  

const LoginPage = () => {  
    const [email, setEmail] = useState("");  
    const [password, setPassword] = useState("");  
    const [role, setRole] = useState("Attendee");  
    const { login, user } = useAuth(); 
    const [errorMessage, setErrorMessage] = useState("");  
    const [isLoading, setIsLoading] = useState(false);  
    const navigate = useNavigate();  

    const handleLogin = async (event) => {
        event.preventDefault();
        setErrorMessage(""); 
        setIsLoading(true);
    
        try {
            const loggedInUser = await login(email, password, role);
            if (loggedInUser) {
                if (loggedInUser.role !== role) {
                    setErrorMessage("Invalid role selection. Please choose the correct role.");
                    setIsLoading(false);
                    return;
                }
    
                if (loggedInUser.role === "Admin") {
                    navigate("/admin");
                } else if (loggedInUser.role === "Attendee") {
                    navigate("/attendee");
                } else if (loggedInUser.role === "Event Organizer") {
                    navigate("/event-organizer");
                } else if (loggedInUser.role === "Staff") {
                    navigate("/staff");
                }
            }
        } catch (error) {
            console.error("Login Error:", error);
        
            if (error.response?.status === 401) {
                setErrorMessage("Invalid email or password. Please try again.");
            } else if (error.response?.status === 403) {
                setErrorMessage("Access denied. You do not have the required permissions.");
            } else {
                setErrorMessage(error.response?.data?.message || "An error occurred during login.");
            }
        }
        
        finally {
            setIsLoading(false);
        }
    };
    
    // Redirect user after successful login
    useEffect(() => {  
        if (user) {  
            if (user.role === "Admin") {  
                navigate("/admin");  
            } 
            else if (user.role === "Attendee") {
                navigate("/attendee"); // Redirect Attendee
            }
            else if(user.role === "Event Organizer") {
                navigate("/event-organizer"); // Redirect Event Organizer
            }
            else if(user.role === "Staff") {
                navigate("/staff"); // Redirect Staff
            }
            else {  
                navigate("/"); // Redirect other users to home  
            }  
        }  
    }, [user, navigate]); // Runs whenever `user` changes  

    return (  
        <div className="login-container">  
            <div className="background-cover" style={{ backgroundImage: `url(${coverImage})` }}>  
                <h1 className="cover-title">CrowdEase</h1>  
            </div>  
            <div className="login-form">  
                <h2 className="highlighted-heading">Log In</h2>  
                <form onSubmit={handleLogin}>  
                    <input  
                        type="email"  
                        placeholder="Email"  
                        value={email}  
                        onChange={(e) => setEmail(e.target.value)}  
                        required  
                    />  
                    <input  
                        type="password"  
                        placeholder="Password"  
                        value={password}  
                        onChange={(e) => setPassword(e.target.value)}  
                        required  
                    />  
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>  
                        <option value="Attendee">Attendee</option>  
                        <option value="Admin">Admin</option>  
                        <option value="Event Organizer">Event Organizer</option>  
                        <option value="Staff">Staff</option>  
                    </select>  
                    <button type="submit" disabled={isLoading}>  
                        {isLoading ? "Logging in..." : "Log In"}  
                    </button>  
                </form>  
                {errorMessage && <p className="error-message">{errorMessage}</p>}  
                <p className="forgot-password">  
                    <Link to="/forgot-password">Forgot Password?</Link>  
                </p>  
                <p className="account-text">  
                    Need a CrowdEase account? <Link to="/signup">Sign Up</Link>  
                </p>  
            </div>  
        </div>  
    );  
};  

export default LoginPage;