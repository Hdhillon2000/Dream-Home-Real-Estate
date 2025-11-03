/**
 * @file MainRouter.jsx
 * @author Alex Kachur
 * @since 2025-10-31
 * @purpose Defines the application's client-side routing configuration.
 */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import StaffMenu from './pages/StaffMenu.jsx';
import BranchMenu from './pages/BranchMenu.jsx';
import ClientMenu from './pages/ClientMenu.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

const MainRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="staff" element={<StaffMenu />} />
                <Route path="branches" element={<BranchMenu />} />
                <Route path="clients" element={<ClientMenu />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default MainRouter;
