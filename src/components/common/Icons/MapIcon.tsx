import React from 'react';

const MapIcon = ({ color = 'white', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 1C6.13542 1 3 3.95159 3 7.58687C3 11.1483 6.83237 15.9841 9.02875 18.7555C9.08016 18.8204 9.13068 18.8842 9.18023 18.9467C9.59459 19.4699 10.4055 19.47 10.82 18.9469C10.8692 18.8848 10.9193 18.8216 10.9703 18.7572C13.1665 15.987 17 11.1517 17 7.58687C17 3.95159 13.8646 1 10 1ZM13 8C13 9.65685 11.6569 11 10 11C8.34315 11 7 9.65685 7 8C7 6.34315 8.34315 5 10 5C11.6569 5 13 6.34315 13 8Z"
    />
  </svg>
);

export default MapIcon;
