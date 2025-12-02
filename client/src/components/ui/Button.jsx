/**
 * @file Button.jsx
 * @author Alex Kachur
 * @since 2025-12-01
 * @purpose Button component with multiple variants, sizes, and enhanced interactions.
 */
import { Link } from "react-router-dom"

const variantStyles = {
  forest: "bg-forest text-white hover:bg-forestdark active:bg-deepsea",
  sea: "bg-sea text-white hover:bg-deepsea active:bg-midnight",
  outline: "bg-transparent border-2 border-deepsea text-deepsea hover:bg-deepsea hover:text-white",
  "outline-light": "bg-transparent border-2 border-white text-white hover:bg-white hover:text-sea",
  ghost: "bg-transparent hover:bg-fog active:bg-pampas",
  gold: "bg-gold text-midnight hover:bg-gold/90 active:bg-gold/80",
}

const sizeStyles = {
  sm: "py-2 px-4 text-sm",
  md: "py-3 px-6 text-base",
  lg: "py-4 px-8 text-lg",
}

export const Button = ({
  children,
  variant = "forest",
  size = "md",
  href,
  external = false,
  className = "",
  onClick,
  disabled = false,
  type = "button",
  fullWidth = false,
  icon,
  iconPosition = "left",
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold text-center rounded-full
    transition-all duration-200 ease-out
    hover:scale-[1.02] active:scale-[0.98]
    focus:outline-none focus:ring-2 focus:ring-forest/30 focus:ring-offset-2
    ${variantStyles[variant] || variantStyles.forest}
    ${sizeStyles[size] || sizeStyles.md}
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : "cursor-pointer"}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="inline-flex">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="inline-flex">{icon}</span>}
    </>
  )

  // External link
  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseStyles}
      >
        {content}
      </a>
    )
  }

  // Internal link
  if (href) {
    return (
      <Link to={href} className={baseStyles}>
        {content}
      </Link>
    )
  }

  // Button
  return (
    <button
      type={type}
      className={baseStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  )
}

export default Button
