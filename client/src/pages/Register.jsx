/**
 * @file Register.jsx
 * @author Alex Kachur
 * @since 2025-11-03
 * @purpose Captures the onboarding form for new platform users.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext.js';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Logo } from '../components/ui/Logo.jsx';

export default function Register() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: ''
  });
  const [status, setStatus] = useState({ success: null, message: '' });
  const { register } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.userName || !formData.email || !formData.password || !formData.role) {
      setStatus({ success: false, message: 'All fields are required.' });
      return false;
    }
    if (formData.password !== formData.passwordConfirm) {
      setStatus({ success: false, message: 'Passwords do not match.' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ success: null, message: '' });

    if (!validateForm()) return;

    const { success, message } = await register(
      formData.userName,
      formData.email,
      formData.password,
      formData.role
    );

    if (success) {
      setStatus({ success: true, message: 'Registration successful! Please wait for approval.' });
    }
    else {
      setStatus({ success: false, message });
    };

  };

  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center pt-24 pb-12 px-4">
      <div className="w-full max-w-lg">
        {/* Logo/Brand */}
        <div className="flex justify-center mb-8">
          <Logo size="large" />
        </div>

        {/* Registration Card */}
        <Card variant="white" className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-h4 mb-2">Create Your Account</h2>
            <p className="text-deepsea/60">
              Request access to manage staff, branches, and clients
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              {/* Name Row */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> */}
                <div>
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="userName"
                    className="form-input"
                    placeholder="JohnSmith"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* <div>
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-input"
                    placeholder="Smith"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div> */}
              {/* </div> */}

              {/* Email */}
              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="passwordConfirm"
                  className="form-input"
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label className="form-label">Role</label>
                <select
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select your role</option>
                  <option value="agent">Sales Agent</option>
                  <option value="manager">Branch Manager</option>
                  <option value="support">Client Support</option>
                </select>
              </div>
            </div>

            {/* Status Message */}
            {status.message && (
              <div
                className={`mb-4 p-3 rounded-lg text-sm ${!status.success
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-fog text-forest border border-forest/20'
                  }`}
                role="status"
              >
                {status.message}
              </div>
            )}

            <Button type="submit" variant="forest" className="w-full">
              Submit Registration
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 pt-6 border-t border-pampas text-center">
            <p className="text-deepsea/60 text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-forest hover:text-deepsea font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>

        {/* Help Text */}
        <p className="text-center text-sm text-deepsea/50 mt-6">
          An administrator will review and approve your registration
        </p>
      </div>
    </div>
  );
};
