import Image from 'next/image';
import Personal from '@/assets/images/personal.png';
import Store from '@/assets/images/store.png';

interface UserTypeSelectionProps {
  onSelectType: (type: 'CUSTOMER' | 'OWNER') => void;
}

export default function UserTypeSelection({ onSelectType }: UserTypeSelectionProps) {
  return (
    <>
      <div className="px-5 pt-6 pb-4 text-gray900">
        <h1 className="text-2xl font-bold leading-snug">
          빵잇나우에 <br /> 오신 걸 환영합니다!
        </h1>
        <p className="mt-2 text-sm text-gray500">가입하실 회원 유형을 선택해주세요.</p>
      </div>

      <div className="flex justify-center gap-4 px-5 mt-6">
        <button onClick={() => onSelectType('CUSTOMER')} className="w-40 h-[190px]">
          <div className="w-full h-full border border-gray-300 rounded-2xl flex flex-col items-center py-6 px-4 shadow-sm hover:shadow-md transition">
            <Image src={Personal} alt="개인회원" width={70} height={70} className="mt-3 object-contain" />
            <p className="mt-3 text-base font-medium text-gray-900">개인회원</p>
          </div>
        </button>

        <button onClick={() => onSelectType('OWNER')} className="w-40 h-[190px]">
          <div className="w-full h-full border border-gray-300 rounded-2xl flex flex-col items-center py-6 px-4 shadow-sm hover:shadow-md transition">
            <Image src={Store} alt="빵집회원" width={70} height={70} className="mt-3 object-contain" />
            <p className="mt-3 text-base font-medium text-gray-900">빵집회원</p>
          </div>
        </button>
      </div>
    </>
  );
}
