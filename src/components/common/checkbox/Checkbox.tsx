interface CheckboxProps {
  id: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

function Checkbox({ id, checked, onChange, disabled = false }: CheckboxProps) {
  return (
    <label
      className={`checkbox ${checked ? 'bg-primary border-primary' : 'bg-white  border-gray-300'} cursor-pointer ${disabled ? 'cursor-not-allowed !opacity-50' : ''}`}
      htmlFor={id}>
      <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 3.72727L4.375 7L10 1"
          stroke={checked ? 'white' : '#B2B4B6'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        className="hidden"
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}

export default Checkbox;
