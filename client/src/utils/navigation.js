/**
 * @file navigation.js
 * @author Alex Kachur
 * @since 2025-11-02
 * @purpose Centralizes navigation and menu metadata shared across the UI.
 */
export const HOME_NAV_ITEM = {
    path: '/',
    navLabel: 'Home',
    cardTitle: 'Home Overview',
    cardBody: 'Return to the mission briefing for the Dream Home Real Estate portal.',
};

export const LOGOUT_NAV_ITEM = {
    path: '/logout',
    navLabel: 'Logout',
    cardTitle: 'Logging Out',
    cardBody: 'Log out of the Dream Home Real Estate portal securely.',
};

export const MENU_ENTRIES = [
  {
    path: '/staff',
    navLabel: 'Staff',
    cardTitle: 'Staff Main Menu',
    cardBody: 'Hire new agents, adjust salaries, and update contact details.',
  },
  {
    path: '/branches',
    navLabel: 'Branches',
    cardTitle: 'Branch Main Menu',
    cardBody: 'Look up addresses, update branch records, and open new locations.',
  },
  {
    path: '/clients',
    navLabel: 'Clients',
    cardTitle: 'Client Main Menu',
    cardBody: 'Register new clients and edit their engagement preferences.',
  },
  {
    path: '/properties',
    navLabel: 'Listings',
    cardTitle: 'Property Listings',
    cardBody: 'Browse current inventory and drill into property detail pages.',
  },
];

export const AUTH_ENTRIES = [
    {
        path: '/login',
        navLabel: 'Login',
        cardTitle: 'Sign In',
        cardBody: 'Access the administration console with your staff credentials.',
    },
    {
        path: '/register',
        navLabel: 'Register',
        cardTitle: 'Request Access',
        cardBody: 'Submit your details for approval and onboarding to the platform.',
    },
];

export const PRIMARY_NAV_LINKS = [HOME_NAV_ITEM, ...MENU_ENTRIES, ...AUTH_ENTRIES];

/**
 * Returns menu entries that should render as cards on the home dashboard.
 * @returns {Array} menu configuration excluding the home overview card.
 */
export function getDashboardCards() {
    return MENU_ENTRIES;
}

/**
 * Returns authentication related cards for the home landing page.
 * @returns {Array} auth menu card configuration.
 */
export function getAuthCards() {
    return AUTH_ENTRIES;
}
