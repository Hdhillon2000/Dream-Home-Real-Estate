/**
 * @file Login.jsx
 * @author Alex Kachur
 * @since 2025-11-03
 * @purpose Presents the sign-in form shell for future authentication integration.
 */
import React, { useState } from 'react';
import PageSection from '../components/PageSection.jsx';

export default function Login() {
    const [status, setStatus] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO (Backend Team): replace placeholder with POST /api/auth/login once JWT/session flow lands.
        setStatus('Authentication service coming soon.');
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
                        <input type="email" name="email" autoComplete="username" placeholder="alex.kachur@example.com" />
                    </label>
                    <label className="form-grid__full">
                        Password
                        <input type="password" name="password" autoComplete="current-password" placeholder="••••••••" />
                    </label>

                    <div className="form-actions form-actions--aligned">
                        <button type="submit">Sign In</button>
                        <span className="form-status" role="status">{status}</span>
                    </div>
                </form>
            </PageSection>
        </div>
    );
}
