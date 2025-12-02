/**
 * @file main.jsx
 * @author Alex Kachur
 * @since 2025-10-31
 * @purpose Boots the Dream Home Real Estate React application.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import AuthProvider from './components/auth/AuthProvider.jsx';
import App from './App.jsx';

// Import global CSS with Tailwind
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
