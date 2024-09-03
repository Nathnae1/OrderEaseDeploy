import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const NavigationBar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/get_quotation">Quotation</Link>
          <Link to="/add">Add Disposition</Link>
          <button onClick={() => {
            localStorage.removeItem('token');
            logout();
          }}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default NavigationBar;
