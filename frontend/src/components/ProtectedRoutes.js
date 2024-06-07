import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { refreshToken } from '../Feature/auth/authSlice';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, accessToken, refreshToken: refresh } = useSelector((state) => state.auth);

  useEffect(() => {
    if (refresh && !accessToken) {
      dispatch(refreshToken());
    }
  }, [dispatch, accessToken, refresh]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;

