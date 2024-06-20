import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {

  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to= "/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;

