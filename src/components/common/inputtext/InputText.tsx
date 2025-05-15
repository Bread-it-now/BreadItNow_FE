import Image, { StaticImageData } from 'next/image';
import { ComponentProps, ForwardedRef, forwardRef } from 'react';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  inputType?: 'text' | 'email' | 'password' | 'number';
  defaultValue?: string;
  currentLength?: number;
  maxLength?: number;
  label?: string;
  icon?: string | StaticImageData;
  unit?: string;
  onIconClick?: () => void;
}

const InputText = forwardRef<HTMLInputElement, ComponentProps<'input'> & InputTextProps>(
  (
    {
      name,
      placeholder,
      defaultValue,
      inputType,
      onChange,
      maxLength,
      currentLength,
      label,
      icon,
      disabled,
      unit,
      onIconClick,
      ...props
    }: InputTextProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className="relative flex flex-col w-full">
        {label && <label className="font-medium text-gray-700 block">{label}</label>}
        <div className="flex justify-between w-full">
          <input
            className={
              'flex items-center px-4 py-[13px] gap-[10px] w-full min-h-[48px] border border-gray200 rounded-lg text-title-content-s font-medium text-gray900 bg-white leading-6 placeholder:text-title-content-s placeholder:text-gray400 placeholder:font-medium truncate'
            }
            placeholder={placeholder}
            defaultValue={defaultValue}
            name={name}
            ref={ref}
            type={inputType ?? 'text'}
            onChange={onChange}
            maxLength={maxLength}
            autoComplete="off"
            disabled={disabled}
            {...props}
          />
          {unit && <div className="absolute top-[16px] right-[16px] text-title-content-s">{unit}</div>}
        </div>

        {maxLength && (
          <div className="absolute bottom-4 right-4 text-[11px] font-medium text-black2">
            <span className="text-gray700">{currentLength}</span>
            <span className="text-gray400">/{maxLength}</span>
          </div>
        )}
        {icon && (
          <Image
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            src={icon}
            alt="show"
            width={22}
            height={22}
            onClick={onIconClick}
          />
        )}
      </div>
    );
  },
);

InputText.displayName = 'InputText';
export default InputText;
