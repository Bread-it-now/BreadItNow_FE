'use client';

import React from 'react';

interface CategoryButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function CategoryButton({ selected, onClick, children }: CategoryButtonProps) {
  return (
    <button
      className={`w-full py-3 rounded-lg text-center font-semibold transition ${
        selected ? 'text-primary bg-[#FFF0EC]' : 'bg-gray-50 text-gray-500'
      }`}
      onClick={onClick}>
      {children}
    </button>
  );
}
