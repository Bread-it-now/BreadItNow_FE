'use client';

import React from 'react';

interface ResendButtonProps {
  disabled: boolean;
  onClick: () => void;
  className?: string;
}

export default function ResendButton({ disabled, onClick, className }: ResendButtonProps) {
  return (
    <button
      className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${className} ${
        disabled ? 'text-gray400 bg-gray100' : 'text-primary'
      }`}
      disabled={disabled}
      onClick={onClick}>
      재전송
    </button>
  );
}
