
/**
 * @file main.jsx
 * @author Alex Kachur
 * @since 2025-10-31
 * @purpose Boots the Dream Home Real Estate React application.
 */
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
