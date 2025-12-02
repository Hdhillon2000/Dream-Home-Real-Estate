/**
 * @file Icons.jsx
 * @author Alex Kachur
 * @since 2025-12-01
 * @purpose SVG icon components for consistent iconography.
 */
import React from "react"

export const ChevronDown = ({ className = "w-2.5 h-1.5" }) => (
  <svg
    className={className}
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M.7 1.8 1.8.5 5 3.3 8.3.5l1.1 1.3L5 5.5.7 1.8z"
    />
  </svg>
)

export const ChevronRight = ({ className = "w-1.5 h-2.5" }) => (
  <svg
    className={className}
    viewBox="0 0 6 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="m1.8 9.3-1.3-1L3.3 5 .5 1.7 1.8.6 5.5 5 1.8 9.3z"
    />
  </svg>
)

export const FacebookIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.625 9.05166C17.6247 7.40344 17.1522 5.7898 16.2634 4.40178C15.3746 3.01376 14.1066 1.90948 12.6097 1.21967C11.1128 0.529869 9.44953 0.283424 7.81688 0.509515C6.18424 0.735606 4.65057 1.42476 3.39743 2.49541C2.14429 3.56605 1.22416 4.97333 0.74597 6.55066C0.267781 8.12799 0.251558 9.80931 0.699222 11.3956C1.14689 12.9818 2.03969 14.4066 3.27194 15.5012C4.50419 16.5959 6.02428 17.3145 7.65225 17.572V11.5447H5.46263V9.05166H7.65225V7.15116C7.65225 4.98966 8.94 3.79566 10.9099 3.79566C11.5567 3.80464 12.2021 3.86092 12.8408 3.96403V6.08653H11.7532C11.4256 6.04318 11.0942 6.13168 10.8318 6.33257C10.5693 6.53346 10.3974 6.83032 10.3538 7.15791C10.3418 7.24955 10.3399 7.34223 10.3481 7.43428V9.05166H12.7402L12.3577 11.5447H10.3477V17.572C12.3766 17.2511 14.2244 16.2165 15.5584 14.6545C16.8925 13.0926 17.6253 11.1058 17.625 9.05166Z"
      fill="currentColor"
    />
  </svg>
)

export const TwitterIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.3092 3.43304C17.6226 3.77634 16.936 3.89078 16.135 4.00521C16.936 3.54748 17.5082 2.86088 17.7371 1.94542C17.0505 2.40315 16.2495 2.63201 15.334 2.86088C14.6474 2.17428 13.6175 1.71655 12.5876 1.71655C10.6422 1.71655 8.92576 3.43304 8.92576 5.49283C8.92576 5.83613 8.92576 6.065 9.04019 6.29386C5.9505 6.17943 3.08968 4.6918 1.25876 2.40315C0.915462 2.97531 0.801029 3.54748 0.801029 4.34851C0.801029 5.60727 1.48763 6.75159 2.51752 7.43819C1.94536 7.43819 1.37319 7.20933 0.801029 6.98046C0.801029 8.81138 2.05979 10.299 3.77628 10.6423C3.43298 10.7567 3.08968 10.7567 2.74639 10.7567C2.51752 10.7567 2.28866 10.7567 2.05979 10.6423C2.51752 12.1299 3.89071 13.2743 5.60721 13.2743C4.34845 14.3042 2.74639 14.8763 0.915462 14.8763C0.572164 14.8763 0.343298 14.8763 0 14.8763C1.71649 15.9062 3.66185 16.5928 5.72164 16.5928C12.5876 16.5928 16.3639 10.8712 16.3639 5.95056C16.3639 5.83613 16.3639 5.60727 16.3639 5.49283C17.1649 4.92067 17.8515 4.23407 18.3092 3.43304Z"
      fill="currentColor"
    />
  </svg>
)

export const LinkedInIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.2 0H1.8C0.81 0 0 0.81 0 1.8V16.2C0 17.19 0.81 18 1.8 18H16.2C17.19 18 18 17.19 18 16.2V1.8C18 0.81 17.19 0 16.2 0ZM5.4 15.3H2.7V6.75H5.4V15.3ZM4.05 5.565C3.15 5.565 2.43 4.845 2.43 3.945C2.43 3.045 3.15 2.325 4.05 2.325C4.95 2.325 5.67 3.045 5.67 3.945C5.67 4.845 4.95 5.565 4.05 5.565ZM15.3 15.3H12.6V10.98C12.6 9.36 11.88 8.82 11.07 8.82C10.215 8.82 9.27 9.54 9.27 11.025V15.3H6.57V6.75H9.18V7.965H9.225C9.495 7.425 10.44 6.48 11.88 6.48C13.455 6.48 15.3 7.47 15.3 10.35V15.3Z"
      fill="currentColor"
    />
  </svg>
)

export const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      fill="currentColor"
    />
  </svg>
)

export const CloseIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      fill="currentColor"
    />
  </svg>
)

export const ArrowRightIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      fill="currentColor"
    />
  </svg>
)

export const MenuIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 12h18M3 6h18M3 18h18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const HomeIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 22V12h6v10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const UsersIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const BuildingIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const KeyIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
