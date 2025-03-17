'use client';
interface IconProps {
  color?: string;
}

export default function MangementIcon({ color = '#1C1E20' }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
      <path
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M20 13v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7"
      />
      <path
        fill={color}
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M21.121 7.364a3 3 0 1 0-4.242-4.243l-8.456 8.456a.151.151 0 0 0-.04.07l-1 4a1 1 0 0 0 1.213 1.212l4-1a.15.15 0 0 0 .07-.04l8.455-8.455Z"
      />
    </svg>
  );
}
