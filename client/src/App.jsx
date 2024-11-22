import React from 'react';
import { BrowserRouter, Router, Route, Routes, Navigate } from 'react-router-dom';

import { AuthProvider } from './AuthContext';
import Dashboard from './Dashboard';
import NavigationBar from './NavigationBar';
import ProtectedRoute from './ProtectedRoute';

import Quotation from './Quotation'
import AddDisp from './AddDisp'
import Home from './Home'
import SalesOrderCreate from './SalesOrderCreate';
import SalesOrderFetch from './SalesOrderFetch';
import QuotationPrint from './QuotationPrint';

import LoginCard from './LoginCard'
import './App.css'

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
            <Route path="/quotation/print/:id" element={<ProtectedRoute element={<QuotationPrint />} printProgrammaticAccess={true} />} />

            <Route path="/add" element={<ProtectedRoute element={<AddDisp />} />} />
            <Route path="/create_so" element={<ProtectedRoute element={<SalesOrderCreate />} programmaticAccess={true} />} />
            <Route path="/fetch_so" element={<ProtectedRoute element={<SalesOrderFetch />} />} />
            <Route path="/" element={<Navigate to="/login" />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>      
  )
}

export default App
