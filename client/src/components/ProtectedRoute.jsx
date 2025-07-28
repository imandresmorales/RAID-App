import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
const ProtectedRoute = () => {
  const { user, isAuthenticated, loading } = useSelector(state => state.auth);

  if (loading) {
    return <div>Loading...</div>; // or a spinner component
  }
  return isAuthenticated && user ? <Outlet /> : <Navigate to="/auth" />;
}

export default ProtectedRoute