
import React from 'react';

const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className || "h-6 w-6 text-white"}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M12 21a9 9 0 100-18 9 9 0 000 18z" 
    />
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M19.5 7.5a9 9 0 00-15 0m15 9a9 9 0 01-15 0" 
    />
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M3.75 12h16.5" 
    />
  </svg>
);

export default GlobeIcon;
