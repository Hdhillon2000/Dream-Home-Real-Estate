/**
 * @file Login.jsx
 * @author Alex Kachur
 * @since 2025-11-03
 * @purpose Presents the sign-in form for authentication.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext.js';
import PageSection from '../components/PageSection.jsx';

export default function Login() {

  const
    navigate = useNavigate(),
    [formData, setFormData] = useState({
      email: '',
      password: ''
    }),
    [status, setStatus] = useState(''),
    [isLoading, setIsLoading] = useState(false),
    { login } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus('');

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        setStatus('Login successful! Redirecting...');

        setTimeout(() => {
          navigate('/'); // @AlexKuchur: Redirect to dashboard/loggedIn Page or home page after login
        }, 1000);
      }
      else {
        setStatus(result.message || 'Login failed. Please check your credentials.');
      };
    }
    catch (error) {
      setStatus('An unexpected error occurred. Please try again.');
    }
    finally {
      setIsLoading(false);
    };
  };

  return (
    <div className="page page--stacked">
      <header className="page__header">
        <h2>Welcome Back</h2>
        <p>Sign in to access the Dream Home Real Estate management tools.</p>
      </header>

      <PageSection
        title="Account Login"
        description="Enter the credentials issued by your platform administrator."
      >
        <form className="form-grid form-grid--narrow" onSubmit={handleSubmit}>

          <label className="form-grid__full">
            Email Address
            <input
              type="email"
              name="email"
              autoComplete="username"
              placeholder="alex.kachur@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-grid__full">
            Password
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <div className="form-actions form-actions--aligned">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            <span className={`form-status ${status.includes('failed') || status.includes('error') ? 'form-status--error' : ''}`} role="status">
              {status}
            </span>
          </div>

        </form>
      </PageSection>

    </div>
  );

};
