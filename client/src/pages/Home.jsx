/**
 * @file Home.jsx
 * @author Alex Kachur
 * @since 2025-10-31
 * @purpose Displays the landing content for the Dream Home Real Estate portal.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import PageSection from '../components/PageSection.jsx';
import { getDashboardCards, getAuthCards } from '../utils/navigation.js';

export default function Home() {
    return (
        <div className="page page--stacked">
            <header className="page__header">
                <h2>Welcome to Dream Home Real Estate</h2>
                <p>
                    Use the menus below to manage your operations. Each area will connect to Oracle procedures
                    and APIs as we progress through the build.
                </p>
            </header>

            <PageSection
                title="Get Started"
                description="Choose a workflow to continue. These cards mirror the instructor&apos;s project brief."
            >
                <div className="menu-card-grid">
                    {getDashboardCards().map((card) => (
                        <article className="menu-card" key={card.cardTitle}>
                            <h4>{card.cardTitle}</h4>
                            <p>{card.cardBody}</p>
                            {/* Links keep navigation SPA-friendly without full reloads */}
                            <Link to={card.path} className="menu-card__cta">
                                Open Menu
                            </Link>
                        </article>
                    ))}
                </div>
            </PageSection>

            <PageSection
                title="Account Access"
                description="Team members can sign in or request access to the platform below."
            >
                <div className="menu-card-grid">
                    {getAuthCards().map((card) => (
                        <article className="menu-card" key={card.cardTitle}>
                            <h4>{card.cardTitle}</h4>
                            <p>{card.cardBody}</p>
                            <Link to={card.path} className="menu-card__cta">
                                Go to {card.navLabel}
                            </Link>
                        </article>
                    ))}
                </div>
            </PageSection>
        </div>
    );
}
