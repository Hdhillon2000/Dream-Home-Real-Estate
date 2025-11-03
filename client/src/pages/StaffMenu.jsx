/**
 * @file StaffMenu.jsx
 * @author Alex Kachur
 * @since 2025-11-01
 * @purpose Presents skeleton workflows for hiring and updating staff members.
 */
import React, { useEffect, useState } from 'react';
import PageSection from '../components/PageSection.jsx';
import { resolvePlaceholder } from '../utils/api.js';

const STAFF_PLACEHOLDER = [
    {
        id: 'DH101',
        name: 'Jamie Carter',
        salary: '$55,000',
        phone: '(416) 555-0001',
        email: 'jamie.carter@example.com',
    },
    {
        id: 'DH102',
        name: 'Morgan Lee',
        salary: '$62,000',
        phone: '(416) 555-0002',
        email: 'morgan.lee@example.com',
    },
    {
        id: 'DH103',
        name: 'Alexis Grant',
        salary: '$58,500',
        phone: '(416) 555-0003',
        email: 'alexis.grant@example.com',
    },
];

export default function StaffMenu() {
    const [staffRecords, setStaffRecords] = useState([]);

    useEffect(() => {
        let isMounted = true;

        resolvePlaceholder(STAFF_PLACEHOLDER).then((data) => {
            if (isMounted) {
                setStaffRecords(data);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="page page--stacked">
            <header className="page__header">
                <h2>Staff Administration</h2>
                <p>
                    Start here to onboard new team members or keep existing records current. Database wiring
                    will join in once the backend endpoints are online.
                </p>
            </header>

            <PageSection
                title="Hire Staff"
                description="Collect the required onboarding details before calling the dh_staff_hire stored procedure."
            >
                <form className="form-grid" aria-label="Staff hiring form">
                    <label>
                        First Name
                        <input type="text" name="firstName" placeholder="Alex" />
                    </label>
                    <label>
                        Last Name
                        <input type="text" name="lastName" placeholder="Kachur" />
                    </label>
                    <label>
                        Position
                        <input type="text" name="position" placeholder="Sales Associate" />
                    </label>
                    <label>
                        Branch Number
                        <input type="text" name="branchNo" placeholder="B001" />
                    </label>
                    <label>
                        Date of Birth
                        <input type="date" name="dob" />
                    </label>
                    <label>
                        Salary
                        <input type="number" name="salary" min="0" step="0.01" placeholder="55000" />
                    </label>
                    <label>
                        Telephone
                        <input type="tel" name="telephone" placeholder="416-555-1234" />
                    </label>
                    <label>
                        Mobile
                        <input type="tel" name="mobile" placeholder="437-555-9876" />
                    </label>
                    <label className="form-grid__full">
                        Email
                        <input type="email" name="email" placeholder="alex.kachur@example.com" />
                    </label>
                    <div className="form-actions">
                        <button type="submit">Schedule Hire</button>
                        <button type="reset" className="button--ghost">Cancel</button>
                    </div>
                </form>
            </PageSection>

            <PageSection
                title="Update Staff Contact"
                description="Allow salary, phone, and email edits while keeping staff IDs locked."
            >
                {/* Placeholder grid keeps alignment ready for future data binding */}
                <div role="table" className="table-placeholder">
                    <div role="row" className="table-placeholder__row table-placeholder__row--head">
                        <span>ID</span>
                        <span>Name</span>
                        <span>Salary</span>
                        <span>Phone</span>
                        <span>Email</span>
                        <span>Actions</span>
                    </div>
                    {staffRecords.map((staff) => (
                        <div role="row" className="table-placeholder__row" key={staff.id}>
                            <span>{staff.id}</span>
                            <span>{staff.name}</span>
                            <span>{staff.salary}</span>
                            <span>{staff.phone}</span>
                            <span>{staff.email}</span>
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
