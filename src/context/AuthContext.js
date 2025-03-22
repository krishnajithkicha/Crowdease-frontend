import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL || "https://crowdease-backend.vercel.app";
    const login = async (email, password, role) => {
        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, role }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Invalid email or password"); // Throw an error instead of returning null
            }
    
            const loggedInUser = { email, role };
            setUser(loggedInUser); // Update user state
            localStorage.setItem("token", data.token); 
            localStorage.setItem("user", JSON.stringify(loggedInUser)); // Store user data
            return loggedInUser;
        } catch (error) {
            console.error("Login error:", error);
            throw error; // Ensure error is thrown to trigger the catch block in LoginPage.js
        }
    };
    
    
    
    const logout = () => {
        setUser(null); // Clear user state
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.clear();
        navigate("/login"); // Redirect to login page
    };
    

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};