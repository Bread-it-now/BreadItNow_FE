'use client';
interface IconProps {
  color?: string;
}

export default function MyIcon({ color = '#1C1E20' }: IconProps) {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12.5" cy="6" r="5" stroke={color} strokeWidth="1.5" />
      <path
        d="M2.5 20.9231C2.5 17.0996 5.59957 14 9.42308 14H15.5769C19.4004 14 22.5 17.0996 22.5 20.9231V20.9231C22.5 22.0701 21.5701 23 20.4231 23H4.57692C3.42987 23 2.5 22.0701 2.5 20.9231V20.9231Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
