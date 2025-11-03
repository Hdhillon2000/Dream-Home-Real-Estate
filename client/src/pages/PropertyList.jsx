/**
 * @file PropertyList.jsx
 * @author Alex Kachur
 * @since 2025-11-03
 * @purpose Displays the portfolio of Dream Home Real Estate listings.
 */
import React, { useMemo } from 'react';
import PageSection from '../components/PageSection.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import { PROPERTY_LISTINGS, getMarketSummary } from '../utils/properties.js';

const STATUS_FILTERS = [
  { label: 'All Statuses', value: 'all' },
  { label: 'For Sale', value: 'For Sale' },
  { label: 'Featured', value: 'Featured' },
  { label: 'New Listing', value: 'New Listing' },
];

const BED_FILTERS = ['Any', '2+', '3+', '4+', '5+'];

const LIFESTYLE_TAGS = ['Smart Home', 'Loft Living', 'Family Estate', 'River Views', 'Pool', 'City Views'];

const SORT_OPTIONS = [
  { label: 'Price (High to Low)', value: 'price-desc' },
  { label: 'Price (Low to High)', value: 'price-asc' },
  { label: 'Newest Listings', value: 'newest' },
  { label: 'Days on Market', value: 'dom' },
];

export default function PropertyList() {
  const listings = useMemo(() => PROPERTY_LISTINGS, []);
  const marketSummary = useMemo(() => getMarketSummary(), []);

  return (
    <div className="page page--stacked property-list-page">
      <header className="page__header">
        <p className="eyebrow">Listings Portal</p>
        <h2>Available Listings</h2>
        <p>
          Explore highlighted inventory across the GTA. This scaffold mirrors pro brokerage portals so backend feeds can slot
          in with minimal rework.
        </p>

        <div className="listing-metrics">
          <article>
            <p>Active Inventory</p>
            <strong>{marketSummary.inventory}</strong>
          </article>
          <article>
            <p>Avg Days on Market</p>
            <strong>{marketSummary.averageDaysOnMarket}</strong>
          </article>
          <article>
            <p>Median List Price</p>
            <strong>{marketSummary.medianPrice}</strong>
          </article>
          <article>
            <p>Last Refreshed</p>
            <strong>{marketSummary.lastUpdated}</strong>
          </article>
        </div>

        <div className="listing-actions">
          <button type="button">Save Search</button>
          <button type="button" className="button--ghost">
            Share Collection
          </button>
        </div>
        {/* TODO (Backend Team): connect actions to saved search + share endpoints. */}
      </header>

      <PageSection
        title="Search Filters"
        description="Filters are static for now. Backend will drive saved searches, personalization, and map overlays."
      >
        <form className="listing-filters">
          <label>
            Status
            <select defaultValue="all">
              {STATUS_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Beds
            <select defaultValue="Any">
              {BED_FILTERS.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Price Range
            <select defaultValue="all">
              <option value="all">All</option>
              <option value="under1m">Under $1M</option>
              <option value="1to2">$1M - $2M</option>
              <option value="over2">Over $2M</option>
            </select>
          </label>

          <label>
            Neighborhood
            <input type="text" placeholder="e.g., Distillery, Leaside" />
          </label>

          <label className="listing-filters__full">
            Keyword
            <input type="text" placeholder="View, pool, smart home..." />
          </label>

          <div className="listing-filters__actions">
            <button type="button">Apply Filters</button>
            <button type="button" className="button--ghost">
              Reset
            </button>
          </div>
        </form>
        {/* TODO (Backend Team): replace defaultValue placeholders with controlled inputs bound to search state. */}
      </PageSection>

      <PageSection title="Sort & Lifestyle Tags" description="Sorting ties into MLS feeds; tags mirror persona-driven curation.">
        <div className="listing-toolbar">
          <label>
            Sort Results
            <select defaultValue="price-desc">
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <div className="listing-toolbar__tags">
            {LIFESTYLE_TAGS.map((tag) => (
              <button key={tag} type="button" className="listing-tag">
                {tag}
              </button>
            ))}
          </div>

          <div className="listing-toolbar__cta">
            <p>Stay ahead of new releases in your favourite neighbourhoods.</p>
            <button type="button">Create Alert</button>
          </div>
        </div>
        {/* TODO (Backend Team): connect alert CTA to notification preferences API. */}
      </PageSection>

      <PageSection title="Featured Properties" description="Cards showcase the structure only. Images hydrate via listing service API.">
        <div className="property-grid">
          {listings.map((listing) => (
            <PropertyCard key={listing.id} property={listing} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Market Intelligence"
        description="Embed lightweight trust signals so clients see us as advisors, not only transaction managers."
      >
        <div className="listing-intel">
          <article>
            <h4>Hot Price Bands</h4>
            <p>$1.2M - $1.6M accounted for 62% of accepted offers last week.</p>
          </article>
          <article>
            <h4>Neighbourhood Watch</h4>
            <p>Leaside and Distillery listings are averaging 2.1 tours before offer.</p>
          </article>
          <article>
            <h4>Buyer Signals</h4>
            <p>Tour requests spike between 7-9 PM. Keep CTA prominent for mobile visitors.</p>
          </article>
          <article>
            <h4>Coming Soon</h4>
            <p>Interactive map, school layers, and mortgage rate widgets land mid-sprint.</p>
          </article>
        </div>
      </PageSection>
    </div>
  );
}
