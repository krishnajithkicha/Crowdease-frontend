import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AdminPortal from "./pages/AdminPortal";
import AttendeePortal from "./pages/AttendeePortal";
import EventOrganizerPortal from "./pages/EventOrganizerPortal";
import PrivateRoute from "./PrivateRoute";

const RedirectBasedOnRole = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === "Admin") {
                navigate("/admin");
            } else if (user.role === "Attendee") {
                navigate("/attendee");
            }
            else if(user.role==="Event Organizer"){
                navigate("/event organizer");
            }
            else if(user.role==="Staff"){
                navigate("/staff");
            }
        }
    }, [user, navigate]);

    return null;
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <RedirectBasedOnRole />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route  
                        path="/admin"  
                        element={  
                            <PrivateRoute allowedRoles={["Admin"]}>  
                                <AdminPortal />  
                            </PrivateRoute>  
                        }  
                    />
                    <Route  
                        path="/attendee"  
                        element={  
                            <PrivateRoute allowedRoles={["Attendee"]}>  
                                <AttendeePortal />  
                            </PrivateRoute>  
                        }  
                    />
                    <Route  
                        path="/event organizer"  
                        element={  
                            <PrivateRoute allowedRoles={["Event Organizer"]}>  
                                <EventOrganizerPortal />  
                            </PrivateRoute>  
                        }  
                    />    
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
