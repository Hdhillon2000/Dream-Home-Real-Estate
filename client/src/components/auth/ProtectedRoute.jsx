/**
 * DEAD CODE: This component is never imported or used anywhere in the application.
 * Route protection is currently handled via conditional rendering with useAuth() hook.
 * Kept for potential future use if proper route guards are needed.
 *
 * @file ProtectedRoute.jsx
 * @author Alex Kachur
 */

// import { useAuth } from './AuthContext';
// import { Navigate } from 'react-router-dom';

// export default function ProtectedRoute({ children }) {
//   const { isLoggedIn } = useAuth();
//   return isLoggedIn ? children : <Navigate to="/login" />;
// };
