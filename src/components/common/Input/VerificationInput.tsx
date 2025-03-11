'use client';

import React, { useState } from 'react';
import PasswordToggle from '@/components/login/PasswordToggle';

interface VerificationInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'password';
  showToggle?: boolean;
  timeLeft?: number;
  className?: string;
  maxLength?: number;
}

export default function VerificationInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  showToggle = false,
  timeLeft,
  maxLength,
}: VerificationInputProps) {
  const [isVisible, setIsVisible] = useState(type !== 'password');

  return (
    <div className="relative flex-1">
      <input
        type={isVisible ? 'text' : 'password'}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full h-12 px-4 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-primary pr-14"
        value={value}
        onChange={onChange}
      />

      {timeLeft !== undefined && (
        <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-green-500 text-sm">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </span>
      )}

      {showToggle && <PasswordToggle isVisible={isVisible} onToggle={() => setIsVisible((prev) => !prev)} />}
    </div>
  );
}
