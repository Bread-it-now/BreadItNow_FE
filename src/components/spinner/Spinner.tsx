"use client";

import { cn } from "@/utils/cn";
import plusIcon from "@/assets/icons/plus.svg";
import minusIcon from "@/assets/icons/minus.svg";
import Image from "next/image";
import { forwardRef, useId } from "react";

//
export interface SpinnerProps {
  /** 최소 수량 */
  minQuantity?: number;

  /** 최대 수량 */
  maxQuantity?: number;

  /** 초기값 수량 */
  ininitialQuantity?: number;

  /** label */
  label?: string;
}

const Spinner = forwardRef<HTMLInputElement, SpinnerProps>(
  ({ ininitialQuantity = 1, label }, ref) => {
    const inputId = useId();

    return (
      <>
        <label htmlFor={inputId}>{label}</label>
        <div
          className={cn(
            "flex justify-center items-center",
            "bg-white border border-gray-100 rounded-[18px]",
            "w-[88px] h-[34px] px-[6px] py-[3px]",
          )}
        >
          <button>
            <Image
              aria-label="수량 1 증가"
              src={plusIcon}
              alt="increase"
              width={20}
              height={20}
            />
          </button>
          <input
            type="number"
            value={ininitialQuantity}
            ref={ref}
            className={cn(
              "flex items-center justify-center text-center",
              "w-6 h-5",
              "text-body-s text-gray-900",
            )}
            readOnly
          />
          <button>
            <Image
              aria-label="수량 1 감소"
              src={minusIcon}
              alt="decrease"
              width={20}
              height={20}
            />
          </button>
        </div>
      </>
    );
  },
);

Spinner.displayName = "Input";
export default Spinner;
