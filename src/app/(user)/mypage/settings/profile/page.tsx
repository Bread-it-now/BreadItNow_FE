'use client';
import Image from 'next/image';
import Profile from '@/assets/images/profile.png';
import Button from '@/components/button/Button';
import Input from '@/components/common/Input/Input';
import { useState, useRef } from 'react';
import PasswordInput from '@/components/common/Input/PasswordInput';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { IUser } from '@/store/userStore';
import { chkDuplicateNickname } from '@/lib/api/login';

interface EditableInputProps {
  title: string;
  value: string;
  buttonText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonMode: boolean;
  onButtonClick: () => void;
  isCorrectNickname?: boolean;
  wornNicknameLabel?: string;
}

function EditableInput({
  title,
  value,
  onChange,
  buttonMode,
  onButtonClick,
  buttonText,
  isCorrectNickname = true,
  wornNicknameLabel = '',
}: EditableInputProps) {
  return (
    <>
      <div className="text-body-s">{title}</div>
      <div className="mt-2 flex items-center gap-2">
        <Input
          className="border h-[48px] box-border border-gray-200 bg-gray-white rounded-lg"
          value={value}
          disabled={!buttonMode}
          onChange={onChange}
        />
        <Button className="grow" variant={buttonMode ? 'default' : 'primary'} onClick={onButtonClick}>
          {buttonText}
        </Button>
        <div className={`text-body-s ${isCorrectNickname ? 'text-primary' : 'text-red-500'}`}>{wornNicknameLabel}</div>
      </div>
    </>
  );
}

export default function Page() {
  //TODO... 전역 상태가 필요할 경우 로직 분리 필요
  const [modalInfo, setModalInfo] = useState<{
    title?: string;
    description?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const userInfo: IUser | null = JSON.parse(localStorage.getItem('user') || '{}');
  // if (!userInfo || Object.keys(userInfo).length === 0) {
  //   alert('로그인 후 이용해주세요.');
  //   router.push(ROUTES.AUTH.LOGIN);
  // }
  const [nickname, setNickname] = useState<string>(userInfo?.nickname || '');
  const [email, setEmail] = useState<string>(userInfo?.email || '');
  const [isCorrectNickname, setIsCorrectNickname] = useState<boolean>(false);
  const [wornNicknameLabel, setWornNicknameLabel] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>(userInfo?.phone || '');
  const [nicknameButtonMode, setNicknameButtonMode] = useState<boolean>(false);
  // const [phoneNumberButtonMode, setPhoneNumberButtonMode] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  //파일 업로드
  const fileRef = useRef<HTMLInputElement>(null);
  const handleFileButtonClick = () => {
    fileRef.current!.click();
  };

  //Validation을 위해 function으로 wrapping
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onNicknameChange = async () => {
    if (nicknameButtonMode === false) {
      setNicknameButtonMode(true);
      const response = await chkDuplicateNickname(nickname);
      if (response.status === 'SUCCESS') {
        setIsCorrectNickname(true);
        setWornNicknameLabel('사용 가능한 닉네임입니다.');
      } else {
        setIsCorrectNickname(false);
        setWornNicknameLabel('이미 사용 중인 닉네임입니다.');
      }
    }
  };

  const onSubmitProfileImage = async (type: 'default' | 'custom') => {
    //분기처리
    if (type === 'default') {
    } else {
      if (fileRef.current!.files && fileRef.current!.files.length) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const file: File = fileRef.current!.files[0];
        // console.log('file:', file.text);
      } else {
        //선택된 파일이 없습니다.
      }
    }
  };

  const openModal = (type: 'logout' | 'withdrawal') => {
    if (type === 'logout') {
      setModalInfo({
        description: '로그아웃 하시겠습니까?',
        onCancel: () => setIsModalOpen(false),
        onConfirm: () => {},
      });
    } else {
      setModalInfo({
        title: '회원탈퇴 하시겠습니까?',
        description: '탈퇴시 계정은 삭제되며, 복구되지 않습니다.',
        onConfirm: () => {},
        onCancel: () => setIsModalOpen(false),
      });
    }
    setIsModalOpen(true);
  };

  const onSave = () => {
    // console.log('저장');
  };

  return (
    <div className="bg-gray-200 relative text-black overflow-y-auto flex flex-col gap-[10px]">
      <div className="px-5 pb-[30px] bg-white rounded-b-2xl">
        <div className="text-title-content-l">기본 정보</div>
        <div className="mt-6">
          <div className="text-body-s">프로필 사진</div>
          <div className="text-center mt-2">
            <div className="w-20 h-20 bg-gray-50 rounded-full border border-gray-200 mx-auto">
              <Image src={Profile} width={80} height={80} className="mx-auto" alt="프로필" />
            </div>
            <div className="mt-4 mb-5 text-[13px] text-gray-900 font-semibold">
              빵잇나우에서 사용할 프로필 사진을 등록해주세요.
            </div>
          </div>
          <div className="flex gap-2 h-9">
            <Button className="!h-full grow" variant="default" onClick={() => onSubmitProfileImage('default')}>
              <div className="text-body-s">기본 이미지로 변경 </div>
            </Button>
            <Button id="profile-file" className="!h-full grow" variant="default" onClick={handleFileButtonClick}>
              <div className="text-body-s">이미지 변경</div>
              <input
                onChange={() => onSubmitProfileImage('custom')}
                ref={fileRef}
                id="profile-file"
                type="file"
                className="hidden"
              />
            </Button>
          </div>
          <div className="mt-[30px]">
            <EditableInput
              title="닉네임"
              value={nickname}
              buttonText={nicknameButtonMode ? '변경하기' : '중복확인'}
              onChange={onChangeNickname}
              buttonMode={nicknameButtonMode}
              onButtonClick={onNicknameChange}
              isCorrectNickname={isCorrectNickname}
              wornNicknameLabel={wornNicknameLabel}
            />
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 pb-[30px] bg-white rounded-2xl">
        <div className="text-title-content-l">회원 정보</div>
        <div className="mt-6">
          <div className="text-body-s">이메일</div>
          <div className="mt-2 flex items-center align gap-2">
            <Input
              className="border w-full border-gray-200 rounded-lg"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-[30px]">
            <div className="text-body-s mb-2">휴대폰 번호</div>
            <Input
              className="border w-full border-gray-200 rounded-lg"
              value={phoneNumber}
              disabled
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mt-[30px]">
            <div className="text-body-s">비밀번호</div>
            {changePassword ? (
              <>
                <PasswordInput
                  className="mt-2 border rounded-lg"
                  value={nickname}
                  onChange={onChangeNickname}
                  placeholder="영문, 숫자, 특수기호 모두 포함 (8글자 이상)"
                />
                <PasswordInput
                  className="mt-2 border rounded-lg"
                  value={nickname}
                  onChange={onChangeNickname}
                  placeholder="새 비밀번호 확인"
                />
                <Button
                  onClick={() => setChangePassword(!changePassword)}
                  className="mt-2 grow w-full"
                  variant="primary">
                  비밀번호 변경 취소
                </Button>
              </>
            ) : (
              <Button onClick={() => setChangePassword(!changePassword)} className="mt-2 grow w-full" variant="primary">
                비밀번호 변경하기
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex px-5 h-[19px] justify-center items-center font-medium text-[13px] mb-[50px]">
        <button className="text-gray-500" onClick={() => openModal('logout')}>
          로그아웃
        </button>
        <div className="mx-4 w-[3px] h-[3px] bg-gray-300 rounded-full"></div>
        <button onClick={() => openModal('withdrawal')} className="text-primary !bg-none !h-full">
          회원탈퇴
        </button>
      </div>

      <ConfirmModal {...modalInfo} isOpen={isModalOpen} />
      <div className="sticky bottom-0 left-0 w-full max-w-[375px] bg-white flex gap-2 p-5 h-[92px]">
        <Button className="grow" variant="default" onClick={() => router.push(ROUTES.MYPAGE.HOME)}>
          <div>취소</div>
        </Button>
        <Button className="grow" variant="primary" onClick={onSave}>
          <div>저장</div>
        </Button>
      </div>
    </div>
  );
}
