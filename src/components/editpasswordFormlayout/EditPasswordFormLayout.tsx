import Button from '@/components/button/Button';
import { ROUTES } from '@/constants/routes';
import { LabelForm } from '@/components/common/labelform/LabelForm';
import InputText from '@/components/common/inputtext/InputText';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { EditPasswordForm } from '@/types/auth';
import PWSHOWICON from '@/assets/icons/pw_show.svg';
import PWHIDEICON from '@/assets/icons/pw_hide.svg';
import { useState } from 'react';

interface EditPasswordFormLayoutProps {
  mutate: (data: EditPasswordForm) => void;
}
export const EditPasswordFormLayout = ({ mutate }: EditPasswordFormLayoutProps) => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty },
    register,
  } = useForm<EditPasswordForm>({});
  const data = watch();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(true);

  return (
    <div className="flex flex-col items-start w-full h-full bg-gray50">
      <form
        className="flex flex-col items-start gap-2 px-5 pt-6 pb-[102px] w-full bg-white"
        onSubmit={handleSubmit(() => {
          mutate(data);
          router.push(ROUTES.OWNER.HOME);
        })}>
        <LabelForm name="newPassword" label="비밀 번호" errors={errors} className="w-full">
          <Controller
            control={control}
            rules={{
              required: '비밀번호를 입력해주세요.',
              validate: (value) => {
                const hasLetter = /[A-Za-z]/.test(value);
                const hasNumber = /[0-9]/.test(value);
                const hasSpecial = /[^A-Za-z0-9]/.test(value);
                const isLongEnough = value.length >= 8;

                if (!isLongEnough) return '8자 이상 입력해주세요.';
                if (!hasLetter || !hasNumber || !hasSpecial) return '영문, 숫자, 특수기호를 모두 포함해야 합니다.';
                return true;
              },
            }}
            {...register('newPassword')}
            render={({ field }) => {
              return (
                <InputText
                  defaultValue={field.value}
                  placeholder="영문, 숫자, 특수기호 모두 포함 (8글자 이상)"
                  onChange={(e) => field.onChange(e.target.value)}
                  icon={showPassword ? PWSHOWICON : PWHIDEICON}
                  inputType={showPassword ? 'text' : 'password'}
                  onIconClick={() => setShowPassword((prev) => !prev)}
                />
              );
            }}
          />
        </LabelForm>
        <LabelForm name="confirmNewPassword" errors={errors} className="w-full">
          <Controller
            control={control}
            rules={{
              required: '비밀번호를 한 번 더 입력해주세요.',
              validate: (value) => {
                if (value !== watch('newPassword')) {
                  return '비밀번호가 일치하지 않습니다.';
                }
                return true;
              },
            }}
            {...register('confirmNewPassword')}
            render={({ field }) => {
              return (
                <InputText
                  defaultValue={field.value}
                  placeholder="새 비밀번호 확인"
                  onChange={(e) => field.onChange(e.target.value)}
                  icon={showConfirmNewPassword ? PWSHOWICON : PWHIDEICON}
                  inputType={showConfirmNewPassword ? 'text' : 'password'}
                  onIconClick={() => setShowConfirmNewPassword((prev) => !prev)}
                />
              );
            }}
          />
        </LabelForm>

        <div className="absolute bottom-0 left-0 flex p-5 gap-2 w-full shadow-[0px_-1px_20px_0px_rgba(28,30,32,0.08)] bg-white">
          <Button variant="default" fullWidth onClick={() => router.push(ROUTES.OWNER.BAKERY.SETTING_HOME)}>
            취소
          </Button>
          <Button variant="primary" type="submit" disabled={!isDirty} fullWidth onClick={() => {}}>
            저장
          </Button>
        </div>
      </form>
    </div>
  );
};
