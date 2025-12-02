import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Updated to use new design system components
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';

export default function PropertyDetails() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${propertyId}`);
        if (!response.ok) {
          throw new Error('Property not found');
        }
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (isLoading) {
    return (
      <div className="bg-pearl min-h-screen">
        <section className="section-top pb-8 bg-white">
          <div className="container-lg">
            <div className="flex items-center justify-center py-16">
              <div className="spinner" />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="bg-pearl min-h-screen">
        <section className="section-top pb-8 bg-white">
          <div className="container-lg text-center">
            <p className="eyebrow">Error</p>
            <h1 className="text-h1 mb-4">Listing Not Found</h1>
            <p className="text-xl text-deepsea/70 mb-8">
              The requested property could not be located. Please return to the listings overview.
            </p>
            <Button href="/properties" variant="forest">
              Back to Listings
            </Button>
          </div>
        </section>
      </div>
    );
  }

  const {
    title,
    address,
    price,
    status,
    beds,
    baths,
    area,
    lotSize,
    yearBuilt,
    monthlyFees,
    type,
    heroImage,
    gallery,
    highlights,
    description,
    lifestyleNarrative,
    neighborhood,
    sustainability,
    disclosures,
    mapImage = '/images/dreamhome-landscape-hero.jpg',
    floorPlans,
    documents,
    schools,
    nearby,
    agent,
    openHouse,
    walkScore,
    transitScore,
    lifestyleTags
  } = property;

  const handleScheduleTour = async () => {
    try {
      const name = prompt('Please enter your name:');
      const email = prompt('Please enter your email:');
      const phone = prompt('Please enter your phone number:');

      const response = await fetch('/api/showings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          propertyId,
          requestedTime: new Date().toISOString(),
          name,
          email,
          phone
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Tour requested successfully! Showing ID: ${result.showing.showing_id}`);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Error requesting tour:', err);
      alert('An error occurred while requesting the tour.');
    }
  };

  const handleAskQuestion = async () => {
    try {
      const question = prompt('Please enter your question:');
      if (!question) return;

      const name = prompt('Please enter your name:');
      const email = prompt('Please enter your email:');
      const phone = prompt('Please enter your phone number:');

      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          propertyId,
          question,
          name,
          email,
          phone
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Question sent successfully! Inquiry ID: ${result.inquiry.inquiry_id}`);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Error sending question:', err);
      alert('An error occurred while sending your question.');
    }
  };

  return (
    <div className="bg-pearl min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-end"
        style={{
          backgroundImage: `url(${heroImage || '/images/dreamhome-landscape-hero.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-deepsea/80 to-transparent" />
        <div className="container-lg relative z-10 pb-8 pt-32">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="text-white">
              <span className="inline-block px-3 py-1 bg-forest text-white text-sm font-medium rounded-full mb-4">
                {status}
              </span>
              <h1 className="text-h1 text-white mb-2">{title}</h1>
              <p className="text-xl text-white/80">{address}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-white/90">
                <span>{beds} Beds</span>
                <span>|</span>
                <span>{baths} Baths</span>
                <span>|</span>
                <span>{area}</span>
                <span>|</span>
                <span>{type}</span>
              </div>
            </div>
            <div className="text-white lg:text-right">
              <p className="text-h2 font-heading mb-4">
                {price.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="forest" size="lg" onClick={handleScheduleTour}>
                  Schedule Tour
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-deepsea">
                  Share
                </Button>
              </div>
            </div>
          </div>
          {lifestyleTags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {lifestyleTags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card variant="fog" padding="sm" className="text-center">
              <p className="text-h4 text-forest font-heading">{beds}</p>
              <p className="text-sm text-deepsea/60">Bedrooms</p>
            </Card>
            <Card variant="fog" padding="sm" className="text-center">
              <p className="text-h4 text-forest font-heading">{baths}</p>
              <p className="text-sm text-deepsea/60">Bathrooms</p>
            </Card>
            <Card variant="fog" padding="sm" className="text-center">
              <p className="text-h4 text-forest font-heading">{area}</p>
              <p className="text-sm text-deepsea/60">Living Area</p>
            </Card>
            <Card variant="fog" padding="sm" className="text-center">
              <p className="text-h4 text-forest font-heading">{lotSize || 'N/A'}</p>
              <p className="text-sm text-deepsea/60">Lot Size</p>
            </Card>
            <Card variant="fog" padding="sm" className="text-center">
              <p className="text-h4 text-forest font-heading">{yearBuilt}</p>
              <p className="text-sm text-deepsea/60">Year Built</p>
            </Card>
            <Card variant="fog" padding="sm" className="text-center">
              <p className="text-h4 text-forest font-heading">{walkScore || 'N/A'}</p>
              <p className="text-sm text-deepsea/60">Walk Score</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {gallery?.length > 0 && (
        <section className="section bg-pearl">
          <div className="container-lg">
            <p className="eyebrow">Gallery</p>
            <h2 className="text-h2 mb-6">Property Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`${title} gallery ${index + 1}`}
                  loading="lazy"
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <p className="eyebrow">Overview</p>
              <h2 className="text-h2 mb-6">About This Property</h2>
              <p className="text-lg text-deepsea/80 mb-6">{description}</p>
              {highlights?.length > 0 && (
                <div className="bg-fog rounded-lg p-6">
                  <h4 className="text-h5 mb-4">Key Highlights</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {highlights.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="text-forest mt-1">✓</span>
                        <span className="text-deepsea/80">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div>
              <Card variant="white" className="border border-borderGrey">
                <h4 className="text-h5 mb-4">Property Details</h4>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-deepsea/60">Property Type</dt>
                    <dd className="font-medium">{type}</dd>
                  </div>
                  <div className="flex justify-between border-t border-borderGrey pt-3">
                    <dt className="text-deepsea/60">Monthly Fees</dt>
                    <dd className="font-medium">
                      {monthlyFees ? monthlyFees.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) : 'N/A'}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-borderGrey pt-3">
                    <dt className="text-deepsea/60">Open House</dt>
                    <dd className="font-medium">{openHouse || 'None scheduled'}</dd>
                  </div>
                  <div className="flex justify-between border-t border-borderGrey pt-3">
                    <dt className="text-deepsea/60">Walk Score</dt>
                    <dd className="font-medium">{walkScore || 'N/A'}</dd>
                  </div>
                  <div className="flex justify-between border-t border-borderGrey pt-3">
                    <dt className="text-deepsea/60">Transit Score</dt>
                    <dd className="font-medium">{transitScore || 'N/A'}</dd>
                  </div>
                </dl>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle & Neighborhood */}
      <section className="section bg-pearl">
        <div className="container-lg">
          <p className="eyebrow">Lifestyle</p>
          <h2 className="text-h2 mb-8">Neighbourhood & Living</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="white">
              <h4 className="text-h5 mb-3">Who It Suits</h4>
              <p className="text-deepsea/70">{lifestyleNarrative || 'Contact us for more information.'}</p>
            </Card>
            <Card variant="white">
              <h4 className="text-h5 mb-3">Neighbourhood Vibe</h4>
              <p className="text-deepsea/70">{neighborhood || 'Contact us for more information.'}</p>
            </Card>
            <Card variant="white">
              <h4 className="text-h5 mb-3">Sustainability</h4>
              {sustainability?.length > 0 ? (
                <ul className="space-y-2">
                  {sustainability.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-deepsea/70">
                      <span className="text-forest">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-deepsea/70">Contact us for more information.</p>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Location & Schools */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="eyebrow">Location</p>
              <h2 className="text-h2 mb-6">Map & Surroundings</h2>
              <img
                src={mapImage}
                alt={`${title} location`}
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div>
              {schools?.length > 0 && (
                <Card variant="fog" className="mb-6">
                  <h4 className="text-h5 mb-4">Nearby Schools</h4>
                  <ul className="space-y-3">
                    {schools.map((school) => (
                      <li key={school.name} className="flex justify-between">
                        <span className="font-medium">{school.name}</span>
                        <span className="text-deepsea/60">{school.distance}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
              {nearby?.length > 0 && (
                <Card variant="white" className="border border-borderGrey">
                  <h4 className="text-h5 mb-4">Nearby Essentials</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {nearby.map((item) => (
                      <li key={item} className="text-deepsea/70 flex items-center gap-2">
                        <span className="text-forest">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      {(floorPlans?.length > 0 || documents?.length > 0) && (
        <section className="section bg-pearl">
          <div className="container-lg">
            <p className="eyebrow">Documents</p>
            <h2 className="text-h2 mb-8">Floor Plans & Downloads</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {floorPlans?.length > 0 && (
                <Card variant="white">
                  <h4 className="text-h5 mb-4">Floor Plans</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {floorPlans.map((plan) => (
                      <figure key={plan.label} className="text-center">
                        <img
                          src={plan.placeholder}
                          alt={plan.label}
                          loading="lazy"
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                        <figcaption className="text-sm text-deepsea/60">{plan.label}</figcaption>
                      </figure>
                    ))}
                  </div>
                </Card>
              )}
              {documents?.length > 0 && (
                <Card variant="white">
                  <h4 className="text-h5 mb-4">Property Documents</h4>
                  <ul className="space-y-3">
                    {documents.map((doc) => (
                      <li key={doc.label}>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-forest hover:text-deepsea transition-colors"
                        >
                          <span>📄</span>
                          {doc.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Disclosures */}
      {disclosures && (
        <section className="section bg-white">
          <div className="container-lg">
            <Card variant="fog">
              <p className="eyebrow">Legal</p>
              <h4 className="text-h5 mb-4">Listing Disclosures</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-deepsea/60">MLS Number</span>
                  <p className="font-medium">{disclosures.mlsNumber}</p>
                </div>
                <div>
                  <span className="text-deepsea/60">Property Taxes</span>
                  <p className="font-medium">{disclosures.taxes}</p>
                </div>
                <div>
                  <span className="text-deepsea/60">Last Updated</span>
                  <p className="font-medium">{disclosures.lastUpdated}</p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Agent CTA */}
      <section className="section bg-sea">
        <div className="container-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="text-white">
              <p className="eyebrow text-white/80">Contact</p>
              <h2 className="text-h2 text-white mb-2">Interested in This Property?</h2>
              {agent && (
                <div className="mt-4">
                  <p className="text-white/80">Listing Agent</p>
                  <p className="text-xl font-medium">{agent.name}</p>
                  <p className="text-white/70">{agent.email} | {agent.phone}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="forest" size="lg" onClick={handleScheduleTour}>
                Request Tour
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white hover:text-sea"
                onClick={handleAskQuestion}
              >
                Ask a Question
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="section bg-pearl">
        <div className="container-lg text-center">
          <Button href="/properties" variant="outline">
            ← Back to All Listings
          </Button>
        </div>
      </section>
    </div>
  );
}
