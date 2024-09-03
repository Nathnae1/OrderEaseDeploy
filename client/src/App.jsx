
import './App.css'
import Quotation from './Quotation'
import AddDisp from './AddDisp'
import Home from './Home'

import LoginCard from './LoginCard'

import React from 'react';
import { BrowserRouter, Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

import Dashboard from './Dashboard';
import NavigationBar from './NavigationBar';
import ProtectedRoute from './ProtectedRoute';

function App() {
  // Handle route protection within route
  return (
    
      <AuthProvider>
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/login" element={<LoginCard />} />
            <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />

            <Route path="/get_quotation" element={<ProtectedRoute element={<Quotation />} />} />
            <Route path="/add" element={<ProtectedRoute element={<AddDisp />} />} />
            <Route path="/" element={<Navigate to="/login" />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
        
      
  
  )
}

export default App
