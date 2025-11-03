/**
 * @file PropertyCard.jsx
 * @author Alex Kachur
 * @since 2025-11-03
 * @purpose Renders a compact summary card for property listings.
 */
import React from 'react';
import { Link } from 'react-router-dom';

export default function PropertyCard({ property }) {
  const {
    id,
    title,
    address,
    price,
    beds,
    baths,
    area,
    status,
    heroImage,
    type,
    monthlyFees,
    lifestyleTags = [],
    openHouse,
  } = property;

  return (
    <article className="property-card">
      <div className="property-card__media">
        <img src={heroImage} alt={`${title} preview`} loading="lazy" />
        <span className="property-card__badge">{status}</span>
      </div>

      <div className="property-card__body">
        <h4>{title}</h4>
        <p className="property-card__address">{address}</p>
        <p className="property-card__type">{type}</p>

        <div className="property-card__metrics">
          <span>{beds} bd</span>
          <span>{baths} ba</span>
          <span>{area}</span>
        </div>

        {monthlyFees ? <p className="property-card__fees">Fees: {monthlyFees}</p> : null}

        {/* Surface quick lifestyle tags for scanning user intents. */}
        {lifestyleTags.length ? (
          <ul className="property-card__tags">
            {lifestyleTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}

        <div className="property-card__footer">
          <strong>{price}</strong>
          <Link to={`/properties/${id}`} className="property-card__cta">
            View Details
          </Link>
        </div>

        <div className="property-card__secondary">
          <span>{openHouse}</span>
          <button type="button" className="property-card__tour">
            Book Tour
          </button>
        </div>
        {/* TODO (Backend Team): wire CTA into lead router once /api/leads is live. */}
      </div>
    </article>
  );
}
