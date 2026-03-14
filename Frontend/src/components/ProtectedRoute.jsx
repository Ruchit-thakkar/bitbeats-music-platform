import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // AuthProvider handles the spinner

  // If not logged in, boot them to login and remember where they were trying to go
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is logged in, let them through
  return children;
};

export default ProtectedRoute;
