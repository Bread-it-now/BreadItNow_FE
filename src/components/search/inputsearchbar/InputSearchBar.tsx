'use client';

import { Dispatch, forwardRef, SetStateAction, useState } from 'react';
import SearchIcon from '@/components/common/Icons/SearchIcon';
import CloseIcon from '@/components/common/Icons/CloseIcon';

interface SearchInputProps {
  name: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  width?: string;
  height?: string;
  onEnter?: () => void;
  onClear?: () => void;
  handleVisibleResult?: Dispatch<SetStateAction<boolean>>;
}

/**
 * @param name - input의 이름
 * @param placeholder - 플레이스 홀더 (optional)
 * @param onChange - 입력값 변경 시 호출되는 함수
 * @param value - 입력값
 * @param width - 검색 바 너비 (optional, 기본값 제공)
 * @param height - 검색 바 높이 (optional, 기본값 제공)
 * @param onEnter - 엔터키 입력(검색) 시 호출되는 함수 (optional)
 * @param onClear - X 버튼 클릭 시 검색어를 초기화하는 함수 (optional)
 */

const InputSearchBar = forwardRef<HTMLInputElement, SearchInputProps>(function SearchBar(
  {
    name,
    placeholder = '검색...',
    width = 'w-full',
    height = 'h-[40px]',
    onChange,
    onEnter,
    onClear,
    value,
    handleVisibleResult,
  }: SearchInputProps,
  ref,
) {
  const [isFocus, setIsFocus] = useState(false);

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
      if (ref && 'current' in ref && ref.current) {
        ref.current.blur();
      }
      setIsFocus(false);
    }
  };

  return (
    <label
      className={`flex items-center rounded-[8px] bg-white transition-all px-4 shadow-sm max-w-[300px]
        ${width} ${height} ${
          isFocus ? 'outline outline-1 outline-gray400 text-black' : 'outline outline-1 outline-gray200 text-gray400'
        }`}
      htmlFor={name}>
      <input
        ref={ref}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={handlePressEnter}
        onFocus={() => {
          setIsFocus(true);
          if (handleVisibleResult) handleVisibleResult(false);
        }}
        onBlur={() => setIsFocus(false)}
        autoComplete="off"
        className="flex-1 bg-transparent border-none outline-none px-0 text-[14px] text-black placeholder:text-[14px] "
      />

      <div className="w-5 h-5 flex items-center justify-center mr-2">
        {value && (
          <button
            type="button"
            onClick={() => {
              if (onClear) onClear();
              if (handleVisibleResult) handleVisibleResult(false);
            }}
            className="flex items-center justify-center w-5 h-5 p-1.5 bg-gray-100 rounded-full mr-2">
            <CloseIcon color="#808284" />
          </button>
        )}
      </div>

      <button type="button" onClick={onEnter} className="flex items-center justify-center" aria-label="검색">
        <SearchIcon color={'#1C1E20'} />
      </button>
    </label>
  );
});

export default InputSearchBar;
