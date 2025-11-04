/**
 * @file App.jsx
 * @author Alex Kachur
 * @since 2025-10-31
 * @purpose Hosts the application's routing structure and shared layout.
 */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import StaffMenu from './pages/StaffMenu.jsx';
import BranchMenu from './pages/BranchMenu.jsx';
import ClientMenu from './pages/ClientMenu.jsx';
import PropertyList from './pages/PropertyList.jsx';
import PropertyDetails from './pages/PropertyDetails.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="staff" element={<StaffMenu />} />
          <Route path="branches" element={<BranchMenu />} />
          <Route path="clients" element={<ClientMenu />} />
          <Route path="properties" element={<PropertyList />} />
          <Route path="properties/:propertyId" element={<PropertyDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
