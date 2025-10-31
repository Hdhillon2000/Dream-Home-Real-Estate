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

const MainRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default MainRouter;
