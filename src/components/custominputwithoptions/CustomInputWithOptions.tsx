'use client';
import React, { forwardRef } from 'react';
import { Option } from '@/lib/shared/product';
import Search from '@/assets/icons/search.svg';
import Image from 'next/image';

// Option 타입 정의

export type CustomInputWithOptionsProps = {
  /** 옵션 리스트에 들어갈 배열 */
  options?: Option[];

  /** 셀렉트 위에 라벨이 필요한 경우 지정 */
  label?: string;

  /** 미리보기에 임시로 들어갈 텍스트 */
  placeholder?: string;

  /** 초기값 */
  defaultValue?: string;

  /** 비활성화 여부 */
  isDisabled?: boolean;

  /** 옵션 선택 */
  selectOption: (option: Option) => void;

  onChange?: (value: string) => void;
};

interface DropdownOptionProps {
  option: Option;
  checked?: boolean;
  onClick: (option: Option) => void;
}

const DropdownOption = ({ option, checked, onClick }: DropdownOptionProps) => {
  return (
    <div
      className={`flex px-4 py-2 text-title-content-s font-normal text-gray900 w-full hover:bg-gray50 hover:cursor-pointer ${checked ? 'bg-primaryLight text-primary' : 'bg-white'}`}
      onClick={() => onClick(option)}>
      <label className="flex w-full">{option.label}</label>
    </div>
  );
};

const CustomInputWithOptions = forwardRef<HTMLInputElement, CustomInputWithOptionsProps>(
  ({ options, label, placeholder, defaultValue = '', isDisabled = false, selectOption }, ref) => {
    return (
      <div className="flex flex-col items-start gap-1 w-full">
        <div className="relative flex items-center gap-[10px] h-[48px] px-4 py-[13px] w-full bg-white border border-gray200 rounded-lg">
          {label && <label>{label}</label>}
          <input
            ref={ref}
            type="text"
            defaultValue={defaultValue}
            placeholder={placeholder || 'Search...'}
            onChange={() => {}}
            disabled={isDisabled}
            className="w-full placeholder:text-title-content-s placeholder:text-gray400 focus:outline-none focus:border-transparent disabled:cursor-not-allowed :foucs0"
          />
          <Image src={Search} width={22} height={22} alt="search" className="hover:cursor-pointer" />
        </div>
        <div className="flex flex-col gap-2 py-2 border border-gray200 rounded-lg w-full bg-white max-h-[160px] overflow-y-auto">
          {options?.map((option: Option) => (
            <DropdownOption
              key={option.value}
              option={option}
              checked={defaultValue === option.value}
              onClick={(option) => selectOption(option)}
            />
          ))}
        </div>
      </div>
    );
  },
);

CustomInputWithOptions.displayName = 'CustomInput';

export default CustomInputWithOptions;
