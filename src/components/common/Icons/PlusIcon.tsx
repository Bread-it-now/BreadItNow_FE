'use client';
interface PlusIconProps {
  color?: string;
  fillColor?: string;
  width?: number;
  height?: number;
}

export default function PlusIcon({ color = '#808284', fillColor = '#808284', width = 12, height = 12 }: PlusIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2V10" stroke={color} strokeLinecap="round" />
      <path d="M10 6H2" stroke={color} strokeLinecap="round" />
    </svg>
  );
}
