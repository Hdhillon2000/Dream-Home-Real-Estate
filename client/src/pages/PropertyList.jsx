/**
 * @file PropertyList.jsx
 * @author Alex Kachur
 * @since 2025-11-03
 * @purpose Displays the portfolio of Dream Home Real Estate listings.
 */
import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import PropertyCard from '../components/PropertyCard.jsx';

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
  const [listings, setListings] = useState([]);
  const [marketSummary, setMarketSummary] = useState({});
  const [filters, setFilters] = useState({
    status: 'all',
    beds: 'Any',
    priceRange: 'all',
    neighborhood: '',
    keyword: ''
  });
  const [sort, setSort] = useState('price-desc');
  const [isLoading, setIsLoading] = useState(true);
  // DEAD CODE: activeTag state is set but never used to filter listings
  // const [activeTag, setActiveTag] = useState(null);

  // Fetch properties and market summary
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Build query string from filters
        const query = new URLSearchParams();
        if (filters.status !== 'all') query.append('status', filters.status);
        if (filters.beds !== 'Any') query.append('beds', filters.beds);
        if (filters.priceRange !== 'all') query.append('priceRange', filters.priceRange);
        if (filters.neighborhood) query.append('neighborhood', filters.neighborhood);
        if (filters.keyword) query.append('keyword', filters.keyword);
        query.append('sort', sort);

        const response = await fetch(`/api/properties?${query.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setListings(data.properties);
          setMarketSummary(data.marketSummary);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [filters, sort]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  // DEAD CODE: handleFilterSubmit is never called - filtering happens via handleFilterChange
  // const handleFilterSubmit = (e) => {
  //   e.preventDefault();
  // };

  const handleFilterReset = () => {
    setFilters({
      status: 'all',
      beds: 'Any',
      priceRange: 'all',
      neighborhood: '',
      keyword: ''
    });
  };

  // DEAD CODE: handleTagClick sets activeTag but no filtering logic implemented
  // const handleTagClick = (tag) => {
  //   setActiveTag(activeTag === tag ? null : tag);
  // };

  return (
    <div className="bg-pearl min-h-screen">
      {/* Hero Header */}
      <section className="section-top pb-8 bg-white">
        <div className="container-lg">
          <div className="text-center max-w-3xl mx-auto">
            <p className="eyebrow">Listings Portal</p>
            <h1 className="text-h1 mb-4">Available Properties</h1>
            <p className="text-xl text-deepsea/70">
              Explore highlighted inventory across the GTA.
            </p>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
            <Card variant="fog" padding="sm" className="text-center">
              <p className="text-h3 text-forest font-heading">{marketSummary.inventory || 0}</p>
              <p className="text-sm text-deepsea/60">Active Listings</p>
            </Card>
            <Card variant="fog" padding="sm" className="text-center">
              <p className="text-h3 text-forest font-heading">{marketSummary.averageDaysOnMarket || 0}</p>
              <p className="text-sm text-deepsea/60">Avg Days on Market</p>
            </Card>
            <Card variant="fog" padding="sm" className="text-center">
              <p className="text-h3 text-forest font-heading">{marketSummary.medianPrice || 'N/A'}</p>
              <p className="text-sm text-deepsea/60">Median Price</p>
            </Card>
            <Card variant="fog" padding="sm" className="text-center">
              <p className="text-h3 text-forest font-heading">{marketSummary.lastUpdated || 'Today'}</p>
              <p className="text-sm text-deepsea/60">Last Refreshed</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="section bg-pearl">
        <div className="container-lg">
          <Card variant="white" className="mb-8">
            <h3 className="text-h4 mb-6">Search Filters</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    className="form-select"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    {STATUS_FILTERS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Bedrooms</label>
                  <select
                    name="beds"
                    className="form-select"
                    value={filters.beds}
                    onChange={handleFilterChange}
                  >
                    {BED_FILTERS.map((label) => (
                      <option key={label} value={label}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Price Range</label>
                  <select
                    name="priceRange"
                    className="form-select"
                    value={filters.priceRange}
                    onChange={handleFilterChange}
                  >
                    <option value="all">All Prices</option>
                    <option value="under1m">Under $1M</option>
                    <option value="1to2">$1M - $2M</option>
                    <option value="over2">Over $2M</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Neighborhood</label>
                  <input
                    type="text"
                    name="neighborhood"
                    className="form-input"
                    placeholder="e.g., Distillery, Leaside"
                    value={filters.neighborhood}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
                <div className="lg:col-span-2">
                  <label className="form-label">Keyword Search</label>
                  <input
                    type="text"
                    name="keyword"
                    className="form-input"
                    placeholder="View, pool, smart home..."
                    value={filters.keyword}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="flex gap-3">
                  <Button type="submit" variant="forest">
                    Apply Filters
                  </Button>
                  <Button type="button" variant="ghost" onClick={handleFilterReset}>
                    Reset
                  </Button>
                </div>
              </div>
            </form>
          </Card>

          {/* Sort & Tags */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            {/* DEAD CODE: Tag filtering UI - functionality not implemented, kept for future use */}
            <div className="flex flex-wrap gap-2">
              {LIFESTYLE_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  // onClick={() => handleTagClick(tag)} // DEAD CODE: handler commented out
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all bg-white text-deepsea border border-borderGrey hover:border-forest hover:bg-fog"
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm text-deepsea/70">Sort by:</label>
              <select
                className="form-select py-2"
                value={sort}
                onChange={handleSortChange}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Property Grid */}
          <div className="mb-8">
            <h2 className="text-h3 mb-6">Featured Properties</h2>
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="spinner" />
              </div>
            ) : listings.length === 0 ? (
              <Card variant="white" className="text-center py-12">
                <p className="text-deepsea/60">No properties match your criteria.</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={handleFilterReset}>
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <PropertyCard key={listing.property_id} property={listing} />
                ))}
              </div>
            )}
          </div>

          {/* Market Intelligence */}
          <div className="mb-8">
            <h2 className="text-h3 mb-6">Market Intelligence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card variant="white" hover className="border border-borderGrey">
                <h4 className="text-h5 text-deepsea mb-2">Hot Price Bands</h4>
                <p className="text-sm text-deepsea/70">
                  $1.2M - $1.6M accounted for 62% of accepted offers last week.
                </p>
              </Card>
              <Card variant="white" hover className="border border-borderGrey">
                <h4 className="text-h5 text-deepsea mb-2">Neighbourhood Watch</h4>
                <p className="text-sm text-deepsea/70">
                  Leaside and Distillery listings are averaging 2.1 tours before offer.
                </p>
              </Card>
              <Card variant="white" hover className="border border-borderGrey">
                <h4 className="text-h5 text-deepsea mb-2">Buyer Signals</h4>
                <p className="text-sm text-deepsea/70">
                  Tour requests spike between 7-9 PM. Keep CTA prominent for mobile.
                </p>
              </Card>
              <Card variant="white" hover className="border border-borderGrey">
                <h4 className="text-h5 text-deepsea mb-2">Coming Soon</h4>
                <p className="text-sm text-deepsea/70">
                  Interactive map, school layers, and mortgage rate widgets.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
