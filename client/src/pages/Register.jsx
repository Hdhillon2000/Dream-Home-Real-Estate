/**
 * @file Register.jsx
 * @author Alex Kachur
 * @since 2025-11-03
 * @purpose Captures the onboarding form shell for new platform users.
 */
import React, { useState } from 'react';
import PageSection from '../components/PageSection.jsx';

export default function Register() {
    const [status, setStatus] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO (Backend Team): wire up POST /api/auth/register once approval workflow is available.
        setStatus('Registration workflow will connect to the backend shortly.');
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
                        <input type="text" name="firstName" placeholder="Alex" />
                    </label>
                    <label>
                        Last Name
                        <input type="text" name="lastName" placeholder="Kachur" />
                    </label>
                    <label className="form-grid__full">
                        Email Address
                        <input type="email" name="email" autoComplete="email" placeholder="you@example.com" />
                    </label>
                    <label className="form-grid__full">
                        Password
                        <input type="password" name="password" autoComplete="new-password" placeholder="Create a strong password" />
                    </label>
                    <label className="form-grid__full">
                        Confirm Password
                        <input type="password" name="passwordConfirm" autoComplete="new-password" placeholder="Re-enter your password" />
                    </label>
                    <label className="form-grid__full">
                        Role
                        <select name="role" defaultValue="">
                            <option value="" disabled>Select role</option>
                            <option value="agent">Sales Agent</option>
                            <option value="manager">Branch Manager</option>
                            <option value="support">Client Support</option>
                        </select>
                    </label>
                    <div className="form-actions form-actions--aligned">
                        <button type="submit">Submit Registration</button>
                        <span className="form-status" role="status">{status}</span>
                    </div>
                </form>
            </PageSection>
        </div>
    );
}
