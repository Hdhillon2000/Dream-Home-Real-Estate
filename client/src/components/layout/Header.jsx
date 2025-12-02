/**
 * @file Header.jsx
 * @author Alex Kachur
 * @since 2025-12-01
 * @purpose Fixed header with navigation, auth actions, and scroll-aware styling.
 */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.js'
import { Logo } from '../ui/Logo.jsx'
import { Button } from '../ui/Button.jsx'
import { MenuIcon, CloseIcon } from '../ui/Icons.jsx'
import { MENU_ENTRIES, LOGOUT_NAV_ITEM } from '../../utils/navigation.js'

export default function Header() {
  const { isLoggedIn } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll detection for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-lg">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {MENU_ENTRIES.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-medium transition-colors text-deepsea hover:text-forest relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-forest after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.navLabel}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
              <Button href={LOGOUT_NAV_ITEM.path} variant="outline" size="sm" className="text-deepsea border-deepsea hover:bg-deepsea hover:text-white">
                {LOGOUT_NAV_ITEM.navLabel}
              </Button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-medium transition-colors text-deepsea hover:text-forest"
                >
                  Sign In
                </Link>
                <Button href="/register" variant="forest" size="sm">
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 transition-colors text-deepsea hover:text-forest"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <CloseIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-borderGrey">
          <nav className="container-lg py-4">
            <ul className="space-y-2">
              {MENU_ENTRIES.map((link, index) => (
                <li
                  key={link.path}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Link
                    to={link.path}
                    className="block py-3 px-4 rounded-lg text-deepsea hover:text-forest hover:bg-fog font-medium transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.navLabel}
                  </Link>
                </li>
              ))}

              <li className="pt-4 border-t border-borderGrey mt-4">
                {isLoggedIn ? (
                  <Link
                    to={LOGOUT_NAV_ITEM.path}
                    className="block py-3 px-4 rounded-lg text-deepsea hover:text-forest hover:bg-fog font-medium transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {LOGOUT_NAV_ITEM.navLabel}
                  </Link>
                ) : (
                  <div className="space-y-3 px-4">
                    <Link
                      to="/login"
                      className="block py-3 text-deepsea hover:text-forest font-medium transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Button
                      href="/register"
                      variant="forest"
                      fullWidth
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Button>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
