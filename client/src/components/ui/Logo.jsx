/**
 * @file Logo.jsx
 * @author Alex Kachur
 * @since 2025-12-01
 * @purpose Dream Home Real Estate branding logo components.
 */
import React from "react"
import { Link } from "react-router-dom"

export const Logo = ({ className = "", size = "default" }) => {
  const sizeClasses = size === "large" ? "h-20 lg:h-24" : "h-14 lg:h-16";
  return (
    <Link to="/" className={`block transition-opacity hover:opacity-80 ${className}`}>
      <img
        src="/images/logo (1).png"
        alt="Dream Home Real Estate"
        className={`${sizeClasses} w-auto`}
      />
    </Link>
  );
}

export const LogoIcon = ({ className = "w-10 h-10" }) => (
  <svg
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* House icon */}
    <path
      d="M20 4L4 16v18a2 2 0 002 2h28a2 2 0 002-2V16L20 4z"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M20 4L4 16v18a2 2 0 002 2h28a2 2 0 002-2V16L20 4z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 36V22h12v14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 22h12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Logo
