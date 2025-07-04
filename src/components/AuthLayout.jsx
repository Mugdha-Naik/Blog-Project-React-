import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function AuthLayout({ children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status);
  const location = useLocation();

  // If authentication is required and user is not logged in, redirect to /login
  if (authentication && !authStatus) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authentication is NOT required and user IS logged in, redirect to home
  if (!authentication && authStatus) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the children (protected or public content)
  return <>{children}</>;
}
