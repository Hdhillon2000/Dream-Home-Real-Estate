import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext.js';
// Updated to use new design system components
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Logo } from '../components/ui/Logo.jsx';

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      const result = await logout();
      if (result.success) {
        navigate('/');
      } else {
        console.error('Logout failed:', result.message);
        setIsLoggingOut(false);
      }
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center pt-24 pb-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="flex justify-center mb-8">
          <Logo size="large" />
        </div>

        {/* Logout Card */}
        <Card variant="white" className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-h4 mb-2">Sign Out</h2>
            <p className="text-deepsea/60">
              Are you sure you want to log out of your account?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="forest"
              className="flex-1"
              onClick={handleConfirmLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? 'Logging out...' : 'Confirm Logout'}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCancel}
              disabled={isLoggingOut}
            >
              Cancel
            </Button>
          </div>
        </Card>

        {/* Help Text */}
        <p className="text-center text-sm text-deepsea/50 mt-6">
          You can sign back in at any time
        </p>
      </div>
    </div>
  );
}
