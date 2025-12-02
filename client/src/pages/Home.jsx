/**
 * @file Home.jsx
 * @author Alex Kachur
 * @since 2025-10-31
 * @purpose Displays the landing content for the Dream Home Real Estate portal.
 */
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';
import { HomeIcon, UsersIcon, BuildingIcon, KeyIcon, ChevronRight } from '../components/ui/Icons.jsx';
import { getDashboardCards, getAuthCards } from '../utils/navigation.js';

// Map card paths to icons
const cardIcons = {
  '/staff': UsersIcon,
  '/branches': BuildingIcon,
  '/clients': UsersIcon,
  '/properties': KeyIcon,
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden min-h-screen flex items-start"
        style={{
          backgroundImage: 'url(/images/dreamhome-landscape-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div className="container-sm relative pt-28 lg:pt-32 pb-12" style={{ marginTop: '71px' }}>
          <div className="text-center">
            <p className="eyebrow mb-4 lg:text-lg text-deepsea animate-fade-in-up">
              Welcome to Dream Home Real Estate
            </p>
            <h1 className="text-h1 mb-6 text-balance text-deepsea animate-fade-in-up delay-100">
              Find Your Perfect Place in the GTA
            </h1>
            <p className="text-xl text-deepsea/90 mb-8 max-w-[700px] mx-auto animate-fade-in-up delay-200">
              Dream Home Real Estate connects buyers with exceptional properties through our dedicated team of professionals.
              Start your home-buying journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
              <Button href="/properties" variant="forest" size="lg">
                Browse Properties
              </Button>
              <Button href="/register" variant="outline" size="lg">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="text-center mb-12">
            <p className="eyebrow">Get Started</p>
            <h2 className="text-h2 mb-4">Manage Your Operations</h2>
            <p className="text-lg text-deepsea/80 max-w-[600px] mx-auto leading-relaxed">
              Access the tools you need to run your real estate business efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {getDashboardCards().map((card, index) => {
              const IconComponent = cardIcons[card.path] || HomeIcon;
              return (
                <Card
                  key={card.cardTitle}
                  variant="fog"
                  hover
                  className={`flex flex-col h-full group animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4 text-forest transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="w-10 h-10" />
                  </div>
                  <h3 className="text-h5 text-deepsea mb-3">{card.cardTitle}</h3>
                  <p className="text-base text-deepsea/70 mb-4 flex-1 leading-relaxed">{card.cardBody}</p>
                  <Link
                    to={card.path}
                    className="inline-flex items-center text-forest font-semibold hover:text-deepsea transition-colors group/link"
                  >
                    Open Menu
                    <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-fog">
        <div className="container-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Active Listings' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '12', label: 'GTA Branches' },
              { value: '50+', label: 'Expert Agents' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-h2 md:text-h1 text-forest font-heading mb-2">{stat.value}</div>
                <p className="text-deepsea/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Account Access Section */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="text-center mb-12">
            <p className="eyebrow">Account Access</p>
            <h2 className="text-h2 mb-4">Join Our Platform</h2>
            <p className="text-lg text-deepsea/80 leading-relaxed">
              Team members can sign in or request access to the platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
            {getAuthCards().map((card, index) => (
              <Card
                key={card.cardTitle}
                variant="white"
                hover
                bordered
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-h5 text-deepsea mb-3">{card.cardTitle}</h3>
                <p className="text-base text-deepsea/70 mb-4 leading-relaxed">{card.cardBody}</p>
                <Button href={card.path} variant="forest" size="sm">
                  Go to {card.navLabel}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-sea relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="container-sm text-center relative">
          <h2 className="text-h2 text-white mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-[600px] mx-auto leading-relaxed">
            Start browsing our exclusive property listings today and take the first step toward your new home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/properties" variant="forest" size="lg">
              Browse Properties
            </Button>
            <Button href="/register" variant="outline-light" size="lg">
              Create Account
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
