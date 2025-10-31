/**
 * @file Home.jsx
 * @author Alex Kachur
 * @since 2025-10-31
 * @purpose Displays the landing content for the Dream Home Real Estate portal.
 */
import React from 'react';

export default function Home() {
    return (
        <section className="page">
            <header className="page__header">
                <h2>Welcome to Dream Home Real Estate</h2>
                <p>Your one-stop hub to manage staff, branches, and client relationships.</p>
            </header>

            <div className="page__body">
                <p>
                    We are assembling the core workflows for the team. Check back soon to access the full
                    management suite for hiring staff, growing branches, and supporting clients.
                </p>
            </div>
        </section>
    );
}
