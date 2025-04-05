export interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number | undefined;
  id?: string;
  rows?: number;
}

function Textarea({ value, onChange, disabled, placeholder, maxLength = 100, id, rows = 4 }: TextareaProps) {
  return (
    <div className="relative border-gray-200 border text-gray-900 rounded-lg px-4 py-[14px] font-medium text-sm">
      <textarea
        className="w-full h-full resize-none outline-none"
        rows={rows}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      <div className="absolute bottom-[14px] right-4 text-sm">
        {value.length}
        <span className="text-gray-400">/{maxLength}</span>
      </div>
    </div>
  );
}

export default Textarea;
