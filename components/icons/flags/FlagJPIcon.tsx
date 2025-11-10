import React from 'react';
const FlagJPIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" {...props}>
        <rect width="300" height="200" fill="#fff"/>
        <circle cx="150" cy="100" r="60" fill="#BC002D"/>
    </svg>
);
export default FlagJPIcon;
