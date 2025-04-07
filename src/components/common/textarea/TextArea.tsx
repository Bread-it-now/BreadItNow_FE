'use client';

import { ComponentProps, forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  currentLength?: number;
  label?: string;
  className?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, ComponentProps<'textarea'> & TextAreaProps>(
  (
    {
      onChange,
      onBlur,
      placeholder,
      maxLength,
      currentLength,
      label,
      ...props
    }: ComponentProps<'textarea'> & TextAreaProps,
    ref,
  ) => {
    return (
      <div className="relative flex flex-col w-full">
        {label && <label className="font-medium text-gray-700 block">{label}</label>}
        <textarea
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          {...props}
          className={
            'w-full h-[73px] px-4 py-[14px] border border-gray200 rounded-lg text-title-content-s font-medium text-gray900 bg-white leading-6 placeholder:text-title-content-s placeholder:text-gray400 placeholder:font-medium'
          }
        />
        {maxLength && (
          <div className="absolute bottom-4 right-4 text-[11px] font-medium text-black2">
            <span className="text-gray700">{currentLength}</span>
            <span className="text-gray400">/{maxLength}</span>
          </div>
        )}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
