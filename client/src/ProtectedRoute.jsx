import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Component, programmaticAccess = false, printProgrammaticAccess= false}) => {
  const { isAuthenticated } = useAuth();

  // Check for programmatic access flag
  const fromQuotation = localStorage.getItem('fromQuotation');
  const fromSO = localStorage.getItem('fromSO');
  const Print = localStorage.getItem('QuotationPrint');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (programmaticAccess && fromQuotation !== 'true') {
    return <Navigate to="/get_quotation" />;
  }

  if (programmaticAccess && fromSO === 'false') {
    return <Navigate to="/fetch_so" />;
  }
  

  if (printProgrammaticAccess && Print !== 'true') {
    return <Navigate to="/get_quotation" />;
  }

  return Component;
};

export default ProtectedRoute;
