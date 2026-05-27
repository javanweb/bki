import React from 'react';

const DotPattern: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 400"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <defs>
                <pattern
                    id="dot-grid-partnership"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                >
                    <circle cx="2" cy="2" r="2" fill="white" />
                </pattern>
                <mask id="graph-mask-partnership">
                    <rect width="1000" height="400" fill="black" />
                    <path
                        d="M -50,150 L 150,150 L 250,100 L 400,180 L 550,140 L 700,220 L 850,190 L 1050,190"
                        stroke="white"
                        strokeWidth="50"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </mask>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid-partnership)" mask="url(#graph-mask-partnership)" opacity="0.15" />
        </svg>
    );
};

export default DotPattern;
