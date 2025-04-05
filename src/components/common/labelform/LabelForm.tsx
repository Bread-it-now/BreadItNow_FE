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
}

export const LabelForm = <T extends FieldValues = FieldValues>({
  label,
  children,
  name,
  errors,
}: LabelFormProps<T>) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <p>{label}</p>}
      {children}
      {errors?.[name]?.message && (
        <span className="text-title-content-2xs text-error font-medium">
          {(errors?.[name] as FieldErrors)?.message?.toString()}
        </span>
      )}
    </div>
  );
};
