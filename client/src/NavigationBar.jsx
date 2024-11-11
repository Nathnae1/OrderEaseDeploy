import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './navigation-bar.css'

const NavigationBar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className={isAuthenticated ? 'is-authenticated' : 'hidden'}>
      {isAuthenticated ? (
        <>
          <Link to="/home">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/add">Add Disposition</Link>
          <Link to="/get_quotation">Quotation</Link>
          <Link to="/create_so">Sales Order</Link>
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
