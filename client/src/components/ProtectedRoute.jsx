import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const jwt = localStorage.getItem("token");
  console.log("jwt:", jwt);

  const location = useLocation();

  if (!jwt) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export { ProtectedRoute };
