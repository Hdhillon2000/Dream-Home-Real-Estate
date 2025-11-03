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
];

export const PRIMARY_NAV_LINKS = [HOME_NAV_ITEM, ...MENU_ENTRIES];

/**
 * Returns menu entries that should render as cards on the home dashboard.
 * @returns {Array} menu configuration excluding the home overview card.
 */
export function getDashboardCards() {
    return MENU_ENTRIES;
}
