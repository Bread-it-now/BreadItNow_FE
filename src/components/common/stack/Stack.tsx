import { cn } from '@/utils/cn';
import { Children, ReactNode } from 'react';

export interface StackProps {
  children?: ReactNode;
  divider?: ReactNode;
  gap?: number;
}

const Stack = ({ divider, gap, children }: StackProps) => {
  const childrenArr = Children.toArray(children);

  const items = divider ? childrenArr.flatMap((child) => [child, divider]) : childrenArr;

  return (
    <ul className={cn(`flex flex-col gap-[16px] h-full w-full`, gap ? `gap-[${gap}px]` : '')}>
      {items.slice(0, -1).map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
};

export default Stack;
