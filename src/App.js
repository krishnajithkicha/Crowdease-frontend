import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AdminPortal from "./pages/AdminPortal";
import AttendeePortal from "./pages/AttendeePortal";
import EventOrganizerPortal from "./pages/EventOrganizerPortal";
import StaffPortal from "./pages/StaffPortal";
import EventCreation from "./pages/EventCreation"; 
import ContactPage from "./pages/ContactPage";
import PrivateRoute from "./PrivateRoute";

const RedirectBasedOnRole = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user) return;

        if (["/event-creation", "/event-organizer", "/login"].includes(location.pathname)) {
            return;
        }

        if (user.role === "Admin" && location.pathname !== "/admin") {
            navigate("/admin");
        } else if (user.role === "Attendee" && location.pathname !== "/attendee") {
            navigate("/attendee");
        } else if (user.role === "Event Organizer" && location.pathname !== "/event-organizer") {
            navigate("/event-organizer");
        } else if (user.role === "Staff" && location.pathname !== "/staff") {
            navigate("/staff");
        }
    }, [user, navigate, location]);

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
                        path="/event-organizer"  
                        element={  
                            <PrivateRoute allowedRoles={["Event Organizer"]}>  
                                <EventOrganizerPortal />  
                            </PrivateRoute>  
                        }  
                    /> 
                    <Route  
                        path="/staff"  
                        element={  
                            <PrivateRoute allowedRoles={["Staff"]}>  
                                <StaffPortal />  
                            </PrivateRoute>  
                        }  
                    />
                    <Route  
                        path="/event-creation"  
                        element={  
                            <PrivateRoute allowedRoles={["Event Organizer"]}>  
                                <EventCreation />  
                            </PrivateRoute>  
                        }  
                    />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
