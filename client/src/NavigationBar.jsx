import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './navigation-bar.css';

const NavigationBar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className={isAuthenticated ? 'is-authenticated' : 'hidden'}>
      {isAuthenticated ? (
        <>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Add Disposition
          </NavLink>
          <NavLink
            to="/get_quotation"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Quotation
          </NavLink>
          <NavLink
            to="/fetch_so"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Fetch Sales Order
          </NavLink>
          <NavLink
            to="/fetch_di"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Fetch Delivery
          </NavLink>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              logout();
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          Login
        </NavLink>
      )}
    </nav>
  );
};

export default NavigationBar;
