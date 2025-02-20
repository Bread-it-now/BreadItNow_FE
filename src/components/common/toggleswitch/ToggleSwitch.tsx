'use client';

import { cn } from '@/utils/cn';
import React, { ChangeEvent, useState } from 'react';

export interface ToggleSwitchProps {
  /** 설정 타입 */
  type: 'BREAD_NOTIFICATION' | 'DO_NOT_DISTURB' | 'RESERVATION_NOTIFICATION' | 'PUSH_NOTIFICATION' | 'APP_NOTIFICATION';

  /** 토글 시 실행할 로직이 포함된 mutate 함수 */
  toggleMutate?: ({
    type,
    params,
    active,
  }: {
    type:
      | 'BREAD_NOTIFICATION'
      | 'DO_NOT_DISTURB'
      | 'RESERVATION_NOTIFICATION'
      | 'PUSH_NOTIFICATION'
      | 'APP_NOTIFICATION';
    params: object;
    active: boolean;
  }) => void;

  /** toggle시 mutate함수에 전달한 params */
  /** 추후에 parmas 타입 재정의 */
  params?: object;

  /** 비활성 여부 */
  disabled?: boolean;

  /* Check 상태 */
  checked?: boolean;

  /** className */
  className?: string;
}

const ToggleSwitch = React.forwardRef<boolean, ToggleSwitchProps>(
  ({ type, disabled = false, toggleMutate, params = {}, checked = false, className }, ref) => {
    const [clicked, setClicked] = useState(checked);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setClicked(e.target.checked);
      if (ref && typeof ref !== 'function') {
        ref.current = null;
      }
      /** 토글 시 mutate 수행 */
      if (toggleMutate) toggleMutate({ type, params, active: !e.target.checked });
    };

    return (
      <div className={(cn('relative'), className)}>
        <input
          type="checkbox"
          role="switch"
          checked={clicked}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            `appearance-none relative w-[51px] h-[31px] border-none rounded-full bg-gray-100 cursor-pointer`,
            `before:content-[''] before:absolute before:top-[calc(50%-13.5px)] before:left-[2px] before:w-[27px] before:h-[27px] before:rounded-full before:bg-white before:transition-[left] before:duration-150 before:ease-in-out`,
            `checked:bg-primary checked:transition-[left] checked:duration-150 checked:ease-in-out checked:border-none`,
            'checked:before:absolute checked:before:top-[calc(50%-13.5px)] checked:before:left-[calc(100%-30px)] checked:before:w-[27px] checked:before:h-[27px] checked:before:bg-white',
            'enabled:hover:before:shadow-[0_3px_8px_rgba(0,0,0,0.1)] enabled:hover:before:checked:shadow-[0_3px_8px_rgba(0,0,0,0.1)]',
            'focus-visible:outline-offset-2 focus-visible:outline-1-primary',
            'disabled:opacity-70 disabled:cursor-not-allowed disabled:before:bg-gray-200',
          )}
        />
      </div>
    );
  },
);

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
