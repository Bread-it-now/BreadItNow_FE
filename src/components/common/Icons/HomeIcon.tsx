'use client';
interface IconProps {
  color?: string;
}

export default function HomeIcon({ color = '#1C1E20' }: IconProps) {
  return (
    <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.1688 2.18738L2.16877 9.32251C1.7433 9.70198 1.5 10.245 1.5 10.8151V21.0001C1.5 22.1046 2.39544 23.0001 3.50001 23.0001L8.5 23V18C8.5 17.4477 8.94772 17 9.5 17H13.5C14.0523 17 14.5 17.4477 14.5 18V23L19.5 23.0001C20.6046 23.0001 21.5 22.1046 21.5 21.0001V10.8151C21.5 10.245 21.2567 9.70198 20.8312 9.32251L12.8312 2.18737C12.0727 1.51083 10.9273 1.51083 10.1688 2.18738Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
