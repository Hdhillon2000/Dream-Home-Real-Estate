/**
 * @file Layout.jsx
 * @author Alex Kachur
 * @since 2025-10-31
 * @purpose Provides the shared page chrome with header and footer.
 */
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from './auth/AuthContext.js'
import Loader from './loader/loader.jsx'
import Header from './layout/Header.jsx'
import Footer from './layout/Footer.jsx'

export default function Layout() {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pearl flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pearl flex flex-col">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-forest focus:text-white focus:rounded-full"
      >
        Skip to main content
      </a>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
