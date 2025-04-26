export interface RadioProps<T> {
  /* 값 */
  value: T;
  /** 버튼 사이즈 */
  outerSize?: number;

  innerSize?: number;

  /** 체크 여부 */
  checked?: boolean;

  handleSelectedValue: (value: T) => void;
}

const Radio = <T extends string | number>({
  value,
  outerSize = 22,
  innerSize = 10,
  checked,
  handleSelectedValue,
}: RadioProps<T>) => {
  return (
    <label>
      <div className="flex items-center gap-2">
        <div
          className={`relative flex justify-center items-center w-[${outerSize}px] h-[${outerSize}px] rounded-xl hover:cursor-pointer`}>
          <div
            className={`absolute flex-shrink-0 w-[${outerSize}px] h-[${outerSize}px] border-2 ${checked ? 'border-primary' : 'border-gray200'} rounded-full hover:cursor-pointer`}
          />
          <div
            className={`absolute w-[${innerSize}px] h-[${innerSize}px] rounded-full ${checked ? 'bg-primary' : 'bg-transparent'} hover:cursor-pointer`}
          />
          <input
            type="radio"
            className="absolute opacity-0"
            onChange={() => handleSelectedValue(value)}
            checked={checked}
            value={value}
          />
        </div>
        <span className="text-title-content-s font-medium text-gray900">{value}</span>
      </div>
    </label>
  );
};

export default Radio;
