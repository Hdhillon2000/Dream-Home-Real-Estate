/**
 * @file Register.jsx
 * @author Alex Kachur
 * @since 2025-11-03
 * @purpose Captures the onboarding form shell for new platform users.
 */

import { useState } from 'react';
import { useAuth } from '../components/auth/AuthContext.js';
import PageSection from '../components/PageSection.jsx';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: ''
  });
  const [status, setStatus] = useState({ message: '', isError: false });
  const { register } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.role) {
      setStatus({ message: 'All fields are required.', isError: true });
      return false;
    }
    if (formData.password !== formData.passwordConfirm) {
      setStatus({ message: 'Passwords do not match.', isError: true });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ message: '', isError: false });

    if (!validateForm()) return;

    // Call the register function from AuthContext
    const result = await register(
      `${formData.firstName} ${formData.lastName}`, // Combine first and last name as username
      formData.email,
      formData.password
    );

    if (result.success) {
      setStatus({ message: 'Registration successful! Waiting for admin approval.', isError: false });
    } else {
      setStatus({ message: result.message || 'Registration failed.', isError: true });
    }
  };

  return (
    <div className="page page--stacked">
      <header className="page__header">
        <h2>Create Your Account</h2>
        <p>Request access to manage staff, branches, and clients within Dream Home Real Estate.</p>
      </header>
      <PageSection
        title="Team Member Registration"
        description="Provide your contact information. An administrator will approve and assign roles."
      >
        <form className="form-grid form-grid--narrow" onSubmit={handleSubmit}>
          <label>
            First Name
            <input
              type="text"
              name="firstName"
              placeholder="Alex"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              name="lastName"
              placeholder="Kachur"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-grid__full">
            Email Address
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
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
              autoComplete="new-password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-grid__full">
            Confirm Password
            <input
              type="password"
              name="passwordConfirm"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-grid__full">
            Role
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select role</option>
              <option value="agent">Sales Agent</option>
              <option value="manager">Branch Manager</option>
              <option value="support">Client Support</option>
            </select>
          </label>
          <div className="form-actions form-actions--aligned">
            <button type="submit">Submit Registration</button>
            {status.message && (
              <span
                className={`form-status ${status.isError ? 'form-status--error' : 'form-status--success'}`}
                role="status"
              >
                {status.message}
              </span>
            )}
          </div>
        </form>
      </PageSection>
    </div>
  );
}
