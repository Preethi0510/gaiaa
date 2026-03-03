import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Support both 'ADMIN' and 'ROLE_ADMIN'
  const isAdmin = role === 'ADMIN' || role === 'ROLE_ADMIN';

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
