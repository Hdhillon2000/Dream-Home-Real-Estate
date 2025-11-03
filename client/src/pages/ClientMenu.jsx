/**
 * @file ClientMenu.jsx
 * @author Alex Kachur
 * @since 2025-11-01
 * @purpose Introduces client onboarding and maintenance placeholders for the UI.
 */
import React, { useEffect, useState } from 'react';
import PageSection from '../components/PageSection.jsx';
import { resolvePlaceholder } from '../utils/api.js';

const CLIENT_PLACEHOLDER = [
    {
        id: 'CL101',
        name: 'Jordan Sample',
        phone: '(647) 555-1800',
        email: 'client0@example.com',
        contact: 'Email',
    },
    {
        id: 'CL102',
        name: 'Sydney Shaw',
        phone: '(647) 555-1801',
        email: 'client1@example.com',
        contact: 'Phone',
    },
    {
        id: 'CL103',
        name: 'Robin Diaz',
        phone: '(647) 555-1802',
        email: 'client2@example.com',
        contact: 'SMS',
    },
    {
        id: 'CL104',
        name: 'Parker Singh',
        phone: '(647) 555-1803',
        email: 'client3@example.com',
        contact: 'Email',
    },
];

export default function ClientMenu() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        let isMounted = true;

        resolvePlaceholder(CLIENT_PLACEHOLDER).then((data) => {
            if (isMounted) {
                setClients(data);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="page page--stacked">
            <header className="page__header">
                <h2>Client Services</h2>
                <p>
                    Register prospective buyers and keep their contact preferences fresh ahead of property
                    matchmaking.
                </p>
            </header>

            <PageSection
                title="Register New Client"
                description="Capture the core client details before persisting them to DH_CLIENT."
            >
                <form className="form-grid" aria-label="Client registration form">
                    <label>
                        First Name
                        <input type="text" name="firstName" placeholder="Taylor" />
                    </label>
                    <label>
                        Last Name
                        <input type="text" name="lastName" placeholder="Morgan" />
                    </label>
                    <label>
                        Email
                        <input type="email" name="email" placeholder="taylor@example.com" />
                    </label>
                    <label>
                        Phone
                        <input type="tel" name="phone" placeholder="905-555-2233" />
                    </label>
                    <label className="form-grid__full">
                        Preferred Contact Method
                        <select name="contactMethod" defaultValue="">
                            <option value="" disabled>Select method</option>
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                            <option value="sms">SMS</option>
                        </select>
                    </label>
                    <label className="form-grid__full">
                        Notes
                        <textarea name="notes" rows="3" placeholder="Add preferences or budget notes..." />
                    </label>
                    <div className="form-actions">
                        <button type="submit">Register Client</button>
                        <button type="reset" className="button--ghost">Reset</button>
                    </div>
                </form>
            </PageSection>

            <PageSection
                title="Update Existing Client"
                description="Select a client to adjust their contact details."
            >
                <div role="table" className="table-placeholder">
                    <div role="row" className="table-placeholder__row table-placeholder__row--head">
                        <span>ID</span>
                        <span>Name</span>
                        <span>Phone</span>
                        <span>Email</span>
                        <span>Preferred Contact</span>
                        <span>Actions</span>
                    </div>
                    {clients.map((client) => (
                        <div role="row" className="table-placeholder__row" key={client.id}>
                            <span>{client.id}</span>
                            <span>{client.name}</span>
                            <span>{client.phone}</span>
                            <span>{client.email}</span>
                            <span>{client.contact}</span>
                            <span>
                                <button type="button" className="button--ghost">Edit</button>
                            </span>
                        </div>
                    ))}
                </div>
            </PageSection>
        </div>
    );
}
