import React from 'react';
const FlagPTIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" {...props}>
        <rect width="300" height="200" fill="#006241" />
        <rect width="120" height="200" fill="#DA291C" />
        <circle cx="120" cy="100" r="50" fill="#F8D100" />
    </svg>
);
export default FlagPTIcon;
