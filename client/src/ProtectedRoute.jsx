import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Component, programmaticAccess = false }) => {
  const { isAuthenticated } = useAuth();

  // Check for programmatic access flag
  const fromQuotation = localStorage.getItem('fromQuotation');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (programmaticAccess && fromQuotation !== 'true') {
    return <Navigate to="/get_quotation" />;
  }

  return Component;
};

export default ProtectedRoute;
