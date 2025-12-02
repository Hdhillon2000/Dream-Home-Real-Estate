/**
 * @file PropertyCard.jsx
 * @author Alex Kachur
 * @since 2025-11-03
 * @purpose Renders a property card with enhanced hover effects and styling.
 */
import { Link } from 'react-router-dom';
import { Button } from './ui/Button.jsx';

export default function PropertyCard({ property }) {
  const {
    property_id,
    title,
    address,
    price,
    beds,
    baths,
    area,
    status,
    hero_image,
    type,
    monthly_fees,
    open_house
  } = property;

  // Format price for display
  const formattedPrice = price
    ? `$${parseFloat(price).toLocaleString()}`
    : 'Price on Request';

  // Status badge colors
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'featured':
        return 'bg-gold text-midnight';
      case 'new listing':
        return 'bg-coral text-white';
      case 'sold':
        return 'bg-deepsea text-white';
      default:
        return 'bg-sea text-white';
    }
  };

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-deepsea/10 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={hero_image || '/images/dreamhome-landscape-hero.jpg'}
          alt={`${title} preview`}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-deepsea/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status Badge */}
        <span className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-semibold rounded-full shadow-md ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h4 className="text-h5 text-deepsea mb-2 line-clamp-1 group-hover:text-forest transition-colors">
          {title}
        </h4>
        <p className="text-sm text-textGrey mb-1">{address}</p>
        <p className="text-sm text-textGrey mb-3">{type}</p>

        {/* Metrics */}
        <div className="flex gap-4 text-sm text-deepsea/70 mb-3">
          <span className="flex items-center gap-1">
            <span className="font-medium">{beds}</span> bd
          </span>
          <span className="flex items-center gap-1">
            <span className="font-medium">{baths}</span> ba
          </span>
          <span className="font-medium">{area}</span>
        </div>

        {monthly_fees && (
          <p className="text-sm text-textGrey mb-3">
            Monthly fees: <span className="font-medium">${parseFloat(monthly_fees).toLocaleString()}</span>
          </p>
        )}

        {/* Spacer to push footer to bottom */}
        <div className="flex-1" />

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-borderGrey">
          <strong className="text-h5 text-forest">{formattedPrice}</strong>
          <Link
            to={`/properties/${property_id}`}
            className="text-forest font-semibold hover:text-deepsea transition-colors inline-flex items-center gap-1 group/link"
          >
            View Details
            <svg
              className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Open House / Tour */}
        {open_house && (
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-borderGrey/50">
            <span className="text-sm text-textGrey">{open_house}</span>
            <Button variant="outline" size="sm">
              Book Tour
            </Button>
          </div>
        )}
        {/* TODO (Backend Team): wire CTA into lead router once /api/leads is live. */}
      </div>
    </article>
  );
}
