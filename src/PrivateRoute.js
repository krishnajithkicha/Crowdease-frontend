// src/PrivateRoute.js  
import React from "react";  
import { Navigate } from "react-router-dom";  
import { useAuth } from "./context/AuthContext";  

const PrivateRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
      return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;