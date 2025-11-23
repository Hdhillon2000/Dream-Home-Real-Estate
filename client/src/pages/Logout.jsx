import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext.js';

export default function Logout() {
  const
    navigate = useNavigate(),
    { logout } = useAuth(),
    [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      const result = await logout();
      if (result.success) {
        navigate('/');
      }
      else {
        console.error('Logout failed:', result.message);
        setIsLoggingOut(false);
      };
    }
    catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    };
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Logout</h2>
        <p>Are you sure you want to logout?</p>
        <div className="form-actions">
          <button
            type="button"
            onClick={handleConfirmLogout}
            disabled={isLoggingOut}
            className="btn btn-primary"
          >
            {isLoggingOut ? 'Logging out...' : 'Confirm'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoggingOut}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

