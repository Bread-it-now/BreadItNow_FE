'use client';
import OperatingStatusCard from '@/components/operatingstatuscard/OperatingStatusCard';
import Button from '@/components/button/Button';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

/** 로그인 시 가져온 bakeryId를 통해 빵집 정보 호출 */
const name = '소금 한 꼬집';

export default function Page() {
  const router = useRouter();
  return (
    <>
      <section className="w-full bg-white rounded-b-[0.625rem]">
        <OperatingStatusCard name={name} operatingStatus="TEMPORARY_CLOSED" type="GENERAL" />
      </section>
      <section className="w-full bg-white rounded-[0.625rem]">
        <OperatingStatusCard operatingStatus="TEMPORARY_CLOSED" type="TEMPORARY" />
      </section>
      <section className="flex flex-col items-start px-5 py-[1.875rem] gap-6 w-full bg-white rounded-2xl">
        <div className="flex justify-between items-center gap-[0.625rem] w-full">
          <p className="text-title-content-m text-gray900">예약 상품</p>
          <Button scale="xsmall" onClick={() => router.push(ROUTES.OWNER.HIDE_MENU)} className="w-[105px]">
            메뉴 숨김 관리
          </Button>
        </div>
        <div className="flex flex-col items-start px-5 py-[1.875rem] gap-6 w-full bg-white rounded-2xl"></div>
      </section>
    </>
  );
}
