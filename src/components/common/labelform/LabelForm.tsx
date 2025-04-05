import { FieldErrors, FieldValues } from 'react-hook-form';

export interface LabelFormProps<T extends FieldValues = FieldValues> {
  /** 라벨 */
  label?: string;

  children: React.ReactNode;

  /** RHF와 호환되는 에러 객체 */
  errors?: FieldErrors<T>;

  /** react-hook-form field key */
  name?: keyof T;

  /** 비활성화 여부 */
  disabled?: boolean;

  /** 핖수 값인지에 대한 boolea */
  isRequired?: boolean;
}

export const LabelForm = <T extends FieldValues = FieldValues>({
  label,
  children,
  name,
  errors,
  isRequired,
}: LabelFormProps<T>) => {
  return (
    <div className="relative flex flex-col gap-2">
      {label && (
        <div className="flex gap-[2px]">
          <span className="text-title-content-xs">{label}</span>
          {isRequired && <span className="absolute top-0 right-[-6px] w-[3px] h-[3px] rounded-full bg-error" />}
        </div>
      )}
      {children}
      {errors?.[name]?.message && (
        <span className="text-title-content-2xs text-error font-medium">
          {(errors?.[name] as FieldErrors)?.message?.toString()}
        </span>
      )}
    </div>
  );
};
