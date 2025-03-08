import { cn } from '@/utils/cn';
interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  maxLength?: number | undefined;
  id?: string;
}

function Input({
  value,
  onChange,
  disabled = false,
  placeholder = '',
  className = '',
  maxLength = undefined,
  id,
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
    />
  );
}

export default Input;
