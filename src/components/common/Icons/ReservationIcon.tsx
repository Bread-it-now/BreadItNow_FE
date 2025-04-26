'use client';
interface IconProps {
  color?: string;
}

export default function ReservationIcon({ color = '#1C1E20' }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
      <rect
        width="17"
        height="20"
        x="3"
        y="2"
        fill={color === '#1C1E20' ? '#FFF' : color}
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="1.5"
        rx="2"
      />
      <path
        stroke={color === '#1C1E20' ? '#1C1E20' : '#FFF'}
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M7 8h5M7 16h5M7 12h9"
      />
    </svg>
  );
}
