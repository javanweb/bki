
import React from 'react';

const PlaceholderIcon: React.FC = () => (
    <svg className="h-16 w-16 text-gray-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="2"/>
        <path d="M32 12V52" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M52 32L12 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2"/>
    </svg>
);

export default PlaceholderIcon;
