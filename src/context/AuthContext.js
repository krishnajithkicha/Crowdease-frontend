import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password, role) => {
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, role }),
            });
    
            const data = await response.json();
            if (response.ok) {
                setUser({ email, role }); // Store user details
                localStorage.setItem("user", JSON.stringify({ email, role })); // Persist user data
                return data.user; // Return user for immediate use
            } else {
                console.error(data.message);
                return null;
            }
        } catch (error) {
            console.error("Login error:", error);
            return null;
        }
    };
    
    const logout = () => {
        setUser(null);
        navigate("/login"); // Redirect to login after logout
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
