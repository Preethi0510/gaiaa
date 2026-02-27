import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated || role !== "ROLE_ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
