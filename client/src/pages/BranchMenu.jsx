/**
 * @file BranchMenu.jsx
 * @author Alex Kachur
 * @since 2025-11-01
 * @purpose Holds branch lookup, updates, and onboarding skeletons for the UI.
 */
import React, { useEffect, useState } from 'react';
import PageSection from '../components/PageSection.jsx';
import { resolvePlaceholder } from '../utils/api.js';

const BRANCH_PLACEHOLDER = [
    {
        id: 'B001',
        street: '123 Sample St.',
        city: 'Toronto',
        postcode: 'M1M 1M1',
    },
    {
        id: 'B002',
        street: '88 Harbour View',
        city: 'Toronto',
        postcode: 'M5J 2N3',
    },
    {
        id: 'B003',
        street: '402 King Street',
        city: 'Ottawa',
        postcode: 'K1R 5L7',
    },
];

export default function BranchMenu() {
    const [branchRecords, setBranchRecords] = useState([]);

    useEffect(() => {
        let isMounted = true;

        resolvePlaceholder(BRANCH_PLACEHOLDER).then((data) => {
            if (isMounted) {
                setBranchRecords(data);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="page page--stacked">
            <header className="page__header">
                <h2>Branch Operations</h2>
                <p>
                    Identify locations, keep addresses accurate, and prepare for new branch openings.
                </p>
            </header>

            <PageSection
                title="Identify Branch Address"
                description="Enter a branch number to retrieve the street and city details."
            >
                <form className="form-inline" aria-label="Branch lookup form">
                    <label>
                        Branch Number
                        <input type="text" name="branchNo" placeholder="B002" />
                    </label>
                    <button type="submit">Find Address</button>
                </form>
                <div className="lookup-result" aria-live="polite">
                    Street and city details will appear here once the database query is wired in.
                </div>
            </PageSection>

            <PageSection
                title="Update Branch Details"
                description="Edit street, city, and other attributes while keeping branch numbers immutable."
            >
                <div role="table" className="table-placeholder">
                    <div role="row" className="table-placeholder__row table-placeholder__row--head">
                        <span>Branch</span>
                        <span>Street</span>
                        <span>City</span>
                        <span>Post Code</span>
                        <span>Actions</span>
                    </div>
                    {branchRecords.map((branch) => (
                        <div role="row" className="table-placeholder__row" key={branch.id}>
                            <span>{branch.id}</span>
                            <span>{branch.street}</span>
                            <span>{branch.city}</span>
                            <span>{branch.postcode}</span>
                            <span>
                                <button type="button" className="button--ghost">Edit</button>
                            </span>
                        </div>
                    ))}
                </div>
            </PageSection>

            <PageSection
                title="Open a New Branch"
                description="This flow will call the new_branch procedure to persist the location in DH_BRANCH."
            >
                <form className="form-grid" aria-label="New branch form">
                    <label>
                        Branch Number
                        <input type="text" name="branchNo" placeholder="B010" />
                    </label>
                    <label>
                        Street
                        <input type="text" name="street" placeholder="35 Raven Street" />
                    </label>
                    <label>
                        City
                        <input type="text" name="city" placeholder="London" />
                    </label>
                    <label>
                        Post Code
                        <input type="text" name="postcode" placeholder="N5Y 3K7" />
                    </label>
                    <div className="form-actions">
                        <button type="submit">Create Branch</button>
                        <button type="reset" className="button--ghost">Clear</button>
                    </div>
                </form>
            </PageSection>
        </div>
    );
}
