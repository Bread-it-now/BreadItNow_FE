'use client';

import React from 'react';

interface ResendButtonProps {
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
  message: string;
}

export default function ResendButton({ disabled, onClick, className, message }: ResendButtonProps) {
  return (
    <button
      className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${className} ${
        disabled ? 'text-gray400 bg-gray100' : 'text-primary bg-primaryLight'
      }`}
      disabled={disabled}
      onClick={onClick}>
      {message}
    </button>
  );
}
