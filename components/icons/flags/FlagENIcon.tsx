import React from 'react';
const FlagENIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" {...props}>
    <rect width="5" height="3" fill="#012169"/>
    <path d="M0,0L5,3M0,3L5,0" stroke="#FFF" strokeWidth="0.6"/>
    <path d="M0,0L5,3M0,3L5,0" stroke="#C8102E" strokeWidth="0.4"/>
    <path d="M2.5,0V3M0,1.5H5" stroke="#FFF" strokeWidth="1"/>
    <path d="M2.5,0V3M0,1.5H5" stroke="#C8102E" strokeWidth="0.6"/>
  </svg>
);
export default FlagENIcon;
