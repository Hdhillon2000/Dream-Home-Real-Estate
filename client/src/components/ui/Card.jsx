/**
 * @file Card.jsx
 * @author Alex Kachur
 * @since 2025-12-01
 * @purpose Card components with variants, hover effects, and enhanced styling.
 */
import React from "react"
import { Link } from "react-router-dom"

const variantStyles = {
  white: "bg-white text-deepsea",
  sea: "bg-sea text-white",
  fog: "bg-fog text-deepsea",
  pampas: "bg-pampas text-deepsea",
  gradient: "bg-gradient-to-br from-fog to-white text-deepsea",
}

const paddingStyles = {
  sm: "p-4 lg:p-6",
  md: "p-6 lg:p-8",
  lg: "p-8 lg:p-10",
}

export const Card = ({
  children,
  variant = "white",
  href,
  className = "",
  hover = false,
  padding = "md",
  bordered = false,
}) => {
  const hoverStyles = hover
    ? "transition-all duration-300 ease-out hover:shadow-xl hover:shadow-deepsea/10 hover:-translate-y-1"
    : ""

  const borderStyles = bordered ? "border border-borderGrey" : ""

  const baseStyles = `
    rounded-xl
    ${variantStyles[variant] || variantStyles.white}
    ${paddingStyles[padding] || paddingStyles.md}
    ${hoverStyles}
    ${borderStyles}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  if (href) {
    return (
      <Link to={href} className={`block ${baseStyles}`}>
        {children}
      </Link>
    )
  }

  return <div className={baseStyles}>{children}</div>
}

export const FeatureCard = ({
  title,
  description,
  icon,
  href,
  variant = "white",
}) => {
  const content = (
    <div className="flex flex-col h-full">
      {icon && (
        <div className="mb-4 text-forest transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      )}
      <h3 className="text-h5 mb-3">{title}</h3>
      <p className="text-[17px] opacity-80 leading-relaxed">{description}</p>
    </div>
  )

  return (
    <Card variant={variant} href={href} hover={!!href} className="group">
      {content}
    </Card>
  )
}

export const StatCard = ({ value, label, className = "" }) => (
  <div className={`text-center ${className}`}>
    <div className="text-h2 md:text-h1 text-forest font-heading mb-2">{value}</div>
    <p className="text-[17px] text-deepsea/80 max-w-[220px] mx-auto leading-relaxed">{label}</p>
  </div>
)

export default Card
