/**
 * @file Login.jsx
 * @author Alex Kachur
 * @since 2025-11-03
 * @purpose Presents the sign-in form for authentication.
 */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext.js';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Logo } from '../components/ui/Logo.jsx';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus('');

    try {
      const {success, message} = await login(formData.email, formData.password);
      if (success) {
        setStatus('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } 
      else {
        // console.log('Login failed:', message);
        setStatus(message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setStatus('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center pt-24 pb-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="flex justify-center mb-8">
          <Logo size="large" />
        </div>

        {/* Login Card */}
        <Card variant="white" className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-h4 mb-2">Welcome Back</h2>
            <p className="text-deepsea/60">
              Sign in to access your management tools
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  autoComplete="username"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Status Message */}
            {status && (
              <div
                className={`mb-4 p-3 rounded-lg text-sm ${'bg-red-50 text-red-700 border border-red-200'}`}
                role="status"
              >
                {status}
              </div>
            )}

            <Button
              type="submit"
              variant="forest"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-6 pt-6 border-t border-pampas text-center">
            <p className="text-deepsea/60 text-sm">
              Need an account?{' '}
              <Link
                to="/register"
                className="text-forest hover:text-deepsea font-medium transition-colors"
              >
                Request access
              </Link>
            </p>
          </div>
        </Card>

        {/* Help Text */}
        <p className="text-center text-sm text-deepsea/50 mt-6">
          Contact your administrator if you need assistance
        </p>
      </div>
    </div>
  );
}
