/**
 * @file Layout.jsx
 * @author Alex Kachur
 * @since 2025-10-31
 * @purpose Provides the shared page chrome including header navigation.
 */
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { PRIMARY_NAV_LINKS } from '../utils/navigation.js';

export default function Layout() {
    return (
        <div className="app-shell">
            <header className="app-header">
                <h1 className="app-header__title">Dream Home Real Estate</h1>
                <nav aria-label="Primary navigation">
                    <ul className="app-header__links">
                        {PRIMARY_NAV_LINKS.map((link) => (
                            <li key={link.path}>
                                <Link to={link.path} className="app-header__link">
                                    {link.navLabel}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            <main className="app-main">
                {/* Outlet renders the currently matched route content */}
                <Outlet />
            </main>
        </div>
    );
}
