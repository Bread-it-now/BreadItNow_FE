'use client';
interface CheckIconProps {
  color?: string;
  fillColor?: string;
  width?: number;
  height?: number;
}

export default function CheckIcon({ color = '#808284', fillColor = 'none', width = 12, height = 12 }: CheckIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M1 5.72727L4.375 9L10 3" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
