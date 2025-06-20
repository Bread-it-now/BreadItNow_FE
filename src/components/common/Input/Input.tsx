import { cn } from '@/utils/cn';
export interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  maxLength?: number | undefined;
  id?: string;
  readonly?: boolean;
}

function Input({
  value,
  onChange,
  disabled = false,
  placeholder = '',
  className = '',
  maxLength = undefined,
  id,
  readonly = false,
}: InputProps) {
  return (
    <input
      id={id}
      className={cn('px-4 py-[14px] outline-none text-gray-900', className)}
      onChange={onChange}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      maxLength={maxLength}
      readOnly={readonly}
    />
  );
}

export default Input;
