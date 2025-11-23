/**
 * @file Layout.jsx
 * @author Alex Kachur
 * @since 2025-10-31
 * @purpose Provides the shared page chrome including header navigation.
 */

import { Link, Outlet } from 'react-router-dom';
import { HOME_NAV_ITEM, MENU_ENTRIES, AUTH_ENTRIES, LOGOUT_NAV_ITEM } from '../utils/navigation.js';
import { useAuth } from '../components/auth/AuthContext.js'

import Loader from '../components/loader/loader.jsx'

export default function Layout() {

  const { isLoading, isLoggedIn } = useAuth();
  return isLoading ? <Loader />
    : (
      <div className="app-shell">
        <header className="app-header">
          <h1 className="app-header__title">Dream Home Real Estate</h1>
          <nav aria-label="Primary navigation">
            <ul className="app-header__links">

              {[HOME_NAV_ITEM, ...MENU_ENTRIES].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="app-header__link">
                    {link.navLabel}
                  </Link>
                </li>
              ))}

              {isLoggedIn && (
                <li key={LOGOUT_NAV_ITEM.path}>
                  <Link to={LOGOUT_NAV_ITEM.path} className="app-header__link">
                    {LOGOUT_NAV_ITEM.navLabel}
                  </Link>
                </li>
              )}

              {!isLoggedIn && AUTH_ENTRIES.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="app-header__link">
                    {link.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main className="app-main">
          {/* Outlet renders the currently matched route content */}
          <Outlet />
        </main>
      </div>
    );
}
