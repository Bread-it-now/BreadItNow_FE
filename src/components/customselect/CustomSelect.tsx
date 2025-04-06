'use client';
import { Option } from '@/lib/shared/product';
import { forwardRef, useMemo } from 'react';
import Select, {
  ActionMeta,
  GroupBase,
  MultiValue,
  Props,
  PropsValue,
  SelectInstance,
  StylesConfig,
} from 'react-select';
import Search from '@/assets/icons/search.svg';
import Image from 'next/image';

/**
 * @description { value: string, label: string }
 * - ex) { value: "1", label: "식빵" }
 */

export type SelectProps = Props & {
  /** 옵션 리스트에 들어갈 배열 */
  values?: Option[];

  /** 셀렉트 위에 라벨이 필요한 경우 지정 */
  label?: string;

  /** 미리보기에 임시로 들어갈 텍스트 */
  placeholder?: string;

  /** 초기값 */
  defaultValue?: PropsValue<Option>;

  /** 여러 개 선택 가능 여부 */
  isMulti?: boolean;

  /** 비활성화 여부 */
  isDisabled?: boolean;
};

const CustomSelect = forwardRef<SelectInstance<Option, boolean, GroupBase<Option>>, SelectProps>(
  ({ onChange = () => {}, values, label, placeholder, defaultValue, isMulti = false, isDisabled }, ref) => {
    const customStyles: StylesConfig<Option> = useMemo(
      () => ({
        control: (provided) => ({
          ...provided,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '48px',
          padding: '13px 16px',
          border: `1px solid #999b9d`,
          borderRadius: '8px',
          background: '#ffffff',
          fontFamily: 'Pretendard400',
          fontSize: '14px',
          cursor: 'pointer',
          '&:active': {
            border: `1px solid #4e5052`,
          },
          '&:focus': {
            border: `1px solid #4e5052`,
          },
          '&:hover': {
            border: `1px solid #4e5052`,
          },
        }),
        option: (provided, { isSelected }) => ({
          ...provided,
          color: isSelected ? '#ff7651' : '#1c1e20',
          fontFamily: 'Pretendard400',
          fontSize: '14px',
          fontWeight: '400',
          padding: '16px',
          backgroundColor: isSelected ? '#FFF0EC' : '#ffffff',
          cursor: 'pointer',
          ':active': {
            ...provided[':active'],
          },
          ':hover': {
            ...provided[':hover'],
            backgroundColor: '#f2f4f6',
          },
        }),

        menu: (provided) => ({
          ...provided,
          marginTop: '10px',
          borderRadius: '8px',
        }),
        placeholder: (provided) => ({
          ...provided,
          color: '#999b9d',
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: 0,
          display: 'flex',
          width: 'auto',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          height: '22px',
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          width: 0,
        }),
      }),
      [],
    );

    return (
      <label>
        {label}
        <Select
          ref={ref}
          isMulti={isMulti}
          placeholder={placeholder ?? ''}
          options={values}
          defaultValue={defaultValue}
          onChange={(newValue: unknown, actionMeta: ActionMeta<unknown>) => {
            if (isMulti) {
              return onChange(
                (newValue as MultiValue<Option>)?.map((values) => values?.value),
                actionMeta as ActionMeta<Option>,
              );
            } else {
              return onChange((newValue as Option)?.value, actionMeta as ActionMeta<Option>);
            }
          }}
          styles={customStyles}
          isDisabled={isDisabled}
          components={{
            IndicatorsContainer: () => <Image src={Search} width={22} height={22} alt="search" />,
          }}
        />
      </label>
    );
  },
);

CustomSelect.displayName = 'CustomSelect';

export default CustomSelect;
