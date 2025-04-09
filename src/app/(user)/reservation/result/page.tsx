'use client';
import { useRouter } from 'next/navigation';
import BackIcon from '@/assets/icons/back.svg';
import Image from 'next/image';
import BreadSuccess from '@/assets/icons/reserve-success.svg';
import BreadFail from '@/assets/icons/reserve-fail.svg';
import type { Product } from '@/types/product';
import Button from '@/components/button/Button';
import CompletedReservationCard from '@/components/bakeryInfo/CompletedReservationCard';
import { useSearchParams } from 'next/navigation';
const breadList: Product[] = [
  {
    productId: '1',
    bakery_id: '1',
    type: 'BREAD',
    name: '소금빵',
    price: 1000,
    stock: 10,
    description: '소금빵 소개',
    image: 'https://placehold.co/600x400/png',
    isActive: true,
  },
  {
    productId: '2',
    bakery_id: '1',
    type: 'BREAD',
    name: '휘낭시에',
    price: 1000,
    stock: 10,
    description: '휘낭시에 소개',
    image: 'https://placehold.co/600x400/png',
    isActive: true,
  },
  {
    productId: '3',
    bakery_id: '1',
    type: 'BREAD',
    name: '마들렌',
    price: 1000,
    stock: 10,
    description: '마들렌 소개',
    image: 'https://placehold.co/600x400/png',
    isActive: true,
  },
];

function ReservationFail({ failReason }: { failReason: string }) {
  const router = useRouter();
  return (
    <div className="w-full h-full grow bg-white flex flex-col">
      <div className="flex items-center gap-2 px-5 py-[13px] bg-white">
        <button>
          <Image src={BackIcon} alt="arrow-left" />
        </button>
        <span className="text-title-content-m text-black">예약 완료</span>
      </div>
      <div className="w-full grow px-5 py-6 flex overflow-hidden bg-white flex-col items-center mx-auto">
        <Image src={BreadFail} alt="bread-success" width={70} height={70} />
        <div className="mt-4 text-center">
          <div className="font-semibold text-[22px] text-black">빵 예약을 실패했습니다.</div>
          <div className="font-normal text-sm text-gray-500">{failReason}</div>
        </div>
      </div>
      <div className="w-full border-box bg-white p-5 flex gap-2 shadow-[0_-1px_20px_0_rgba(28,30,32,0.08)]">
        <Button onClick={() => router.push('/')} variant="primary" fullWidth>
          메인
        </Button>
      </div>
    </div>
  );
}

function ReservationSuccess() {
  const router = useRouter();
  return (
    <div className="w-full h-full">
      <div className="flex items-center gap-2 px-5 py-[13px] bg-white">
        <button>
          <Image src={BackIcon} alt="arrow-left" />
        </button>
        <span className="text-title-content-m text-black">예약 완료</span>
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="w-full px-5 py-6 flex overflow-hidden bg-white flex-col items-center mx-auto rounded-b-xl">
          <Image src={BreadSuccess} alt="bread-success" width={70} height={70} />
          <div className="text-center">
            <div className="font-semibold text-[22px] text-black mt-4">빵 예약 요청이 접수되었습니다.</div>
            <div className="font-normal text-sm text-gray-500 mt-2">판매바의 승인이 완료되면 예약이 확정됩니다.</div>
          </div>
        </div>

        <div className="w-full px-5 py-6 overflow-hidden text-black bg-white rounded-xl">
          <div className="text-title-content-m">예약 정보</div>
          <div className="mt-5">
            <div className="flex justify-between">
              <div className="font-normal text-sm text-gray-500">예약 빵집</div>
              <div className="font-medium text-sm">소금 한 꼬집</div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="font-normal text-sm text-gray-500">예약 일시</div>
              <div className="text-sm font-medium">2025.03.01</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl w-full border-box px-5 py-6 overflow-hidden text-black bg-white">
          <div className="text-title-content-m mb-5">예약 상품</div>
          {breadList.map((product, index) => {
            return (
              <>
                <CompletedReservationCard key={`${product.productId}-${index}`} {...product} />
                {index !== breadList.length - 1 && <hr className="w-full border-gray-200 my-5" />}
              </>
            );
          })}
          <div className="mt-[30px] bg-gray-50 font-semibold">
            <div className="px-5 py-[23px] flex justify-between items-center text-black">
              <div>
                총<span className="text-primary">{breadList.length}</span>건 상품 금액
              </div>
              <div className="text-primary">22,100원</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-box sticky z-10 bottom-0 bg-white p-5 flex gap-2 mt-[50px]">
        <Button onClick={() => router.push('/')} variant="default" fullWidth>
          메인
        </Button>
        <Button onClick={() => alert('예약 상세')} variant="primary" fullWidth>
          예약 상세
        </Button>
      </div>
    </div>
  );
}

function Page() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const isSuccess = status === 'success';

  return (
    <>
      {isSuccess ? (
        <ReservationSuccess />
      ) : (
        <ReservationFail failReason="빵집 운영시간이 아닙니다.(실패 사유 노출영역)" />
      )}
    </>
  );
}

export default Page;
