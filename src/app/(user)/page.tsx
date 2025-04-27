'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useScrollDetection } from '@/hooks/useScrollDetection';
import { useReservationBottomSheet } from '@/hooks/useReservationBottomSheet';
import BottomSheet from '@/components/bottomsheet/LocationBottomsheet';
import TodayBread from '@/components/main/TodayBread';
import BakeryCard from '@/components/bakerycard/BakeryCard';
import { bakeryCardMockData } from '@/mocks/data/bakery';
import { useSearchParams } from 'next/navigation';
import Bakery from '@/assets/images/bakery.png';
import MapIcon from '@/components/common/Icons/MapIcon';
import ArrowDown from '@/assets/icons/arrow-down-white.svg';
import ArrowDownBlack from '@/assets/icons/arrow-down.svg';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import SearchIcon from '@/components/common/Icons/SearchIcon';
import NotificationIcon from '@/components/common/Icons/NotificationIcon';
import { getMonthDateDay } from '@/utils/date';
import { useTodayAlertProducts } from '@/lib/api/notification';
import { useHotProducts } from '@/lib/api/bakery';
import { HotProduct } from '@/types/bakery';
import BreadCard from '@/components/bakerycard/BreadCard';
import EmptyState from '@/components/common/EmptyState';

const TodayProductsSection = () => {
  const { data: todayProducts } = useTodayAlertProducts();
  const { month, date, day } = getMonthDateDay(new Date());
  return (
    <>
      <div className="flex px-4 justify-between items-center my-8">
        <div className="relative flex items-center">
          <div className="text-white text-2xl font-semibold leading-[34px]">오늘의 빵 It Now</div>
          <div className="absolute top-0 -right-1 transform translate-x-1/2 -translate-y-1/2 bg-[#6BFFD5] w-2 h-2 rounded-full"></div>
        </div>
        <div className="flex flex-col items-end text-white text-sm leading-tight opacity-70">
          <span>
            {month} {date}
          </span>
          <span>{day}</span>
        </div>
      </div>
      <div
        className={`flex gap-3 mx-4 overflow-x-auto pl-1 'min-h-[161px]' ${todayProducts && todayProducts.length === 0 ? 'items-center min-h-[80px]' : 'min-h-[161px]'}`}>
        {todayProducts &&
          (todayProducts.length !== 0 ? (
            todayProducts.map((product) => <TodayBread key={product.productId} {...product} />)
          ) : (
            <div className="flex justify-center text-title-content-l w-full h-full text-white">
              오늘의 빵을 설정해주세요
            </div>
          ))}
      </div>
    </>
  );
};

const HotProductsSection = () => {
  const router = useRouter();
  const navigateToBreads = () => router.push(ROUTES.HOME.BREAD_LIST);
  const { data } = useHotProducts({ size: 5, sort: 'reservation' });

  return (
    <div className="flex flex-col gap-[30px] w-full">
      <div className="flex mt-3 justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-gray900">핫한 빵 top 5</h2>
          <p className="text-gray500 text-sm">최근 한 달 간 예약이 많은 순</p>
        </div>
        <button onClick={navigateToBreads}>
          <Image src={ArrowRight} alt="더보기" />
        </button>
      </div>
      <div className="flex flex-col gap-4 bg-white rounded-t-2xl my-1 w-[100%]">
        <>
          {data?.pages[0].data.hotProducts.length !== 0 ? (
            data?.pages.map((page) =>
              page.data.hotProducts.map((product: HotProduct, idx: number) => (
                <BreadCard
                  key={product.productId}
                  id={product.productId}
                  bakeryId={product.bakeryId}
                  profileImgUrl={product.image}
                  name={product.productName}
                  bakeryName={product.bakeryName}
                  price={product.price}
                  isBookmarked={false}
                  stock={product.stock}
                  direction="row"
                  isShowRank
                  rank={idx + 1}
                />
              )),
            )
          ) : (
            <EmptyState title="핫한 빵이 없습니다." message="핫한 빵이 없습니다." />
          )}
        </>
      </div>
    </div>
  );
};

export default function Page() {
  const { isOpen, open, close, handleAddReservation } = useReservationBottomSheet();

  const router = useRouter();

  const navigateToBakeries = () => router.push(ROUTES.HOME.BAKERY_LIST);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isScrolled = useScrollDetection(scrollContainerRef);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('isNewUser') === 'true') {
      router.push(ROUTES.AUTH.LOGIN + '?isNewUser=true');
    }
  }, [searchParams, router]);

  return (
    <div
      className="flex flex-col h-[100%]"
      style={{
        background: 'linear-gradient(to bottom, #FF6A42 0%, #FF7651 15%, #FFFFFF 100%)',
      }}>
      <div
        className={`px-4 py-5 flex flex-col gap-3 sticky top-0 left-0 right-0 transition-all duration-100 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}>
        <div className="flex justify-between items-center">
          <button
            onClick={open}
            className={`flex items-center gap-2 text-lg font-medium transition-colors ${
              isScrolled ? 'text-black' : 'text-white'
            }`}>
            <MapIcon color={isScrolled ? '#ff7651' : 'white'} />
            <span>전체</span>
            <Image src={isScrolled ? ArrowDownBlack : ArrowDown} alt="arrow" className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <Link href="/search">
              <SearchIcon color={isScrolled ? '#000000' : '#FFFFFF'} />
            </Link>
            <Link href="/mypage/notifications">
              <div className="relative">
                <NotificationIcon color={isScrolled ? '#000000' : '#FFFFFF'} />
                <span
                  className={`absolute -top-1 -right-1 text-xs rounded-full px-1 transition-all duration-100 ${
                    isScrolled ? 'text-white bg-primary' : 'text-primary bg-white'
                  }`}></span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pb-4">
        <TodayProductsSection />
        <div className="bg-white rounded-t-2xl mt-6 mb-1 p-4 w-[100%]">
          <HotProductsSection />

          <div className="mt-6">
            <div className="mb-6 flex justify-between items-center">
              <div className="flex flex-col">
                <h2 className="text-lg font-bold text-gray900">핫한 빵집 top 5</h2>
                <p className="text-gray500 text-sm">최근 한 달 간 예약이 많은 순</p>
              </div>
              <button onClick={navigateToBakeries}>
                <Image src={ArrowRight} alt="더보기" />
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pl-1 scrollbar-hide pb-10">
              {[
                {
                  id: 1,
                  name: '라 메종 뒤 팡 에 뒤 레브',
                  operatingStatus: 'OPEN' as const,
                  distance: 1.5,
                  profileImage: Bakery.src,
                },
                {
                  id: 2,
                  name: '달콤한 아침',
                  operatingStatus: 'CLOSED' as const,
                  distance: 1.7,
                  profileImage: Bakery.src,
                },
                {
                  id: 3,
                  name: '버터 앤 드림',
                  operatingStatus: 'OPEN' as const,
                  distance: 2.3,
                  profileImage: Bakery.src,
                },
                {
                  id: 4,
                  name: '소금 한 꼬집',
                  operatingStatus: 'CLOSED' as const,
                  distance: 3.0,
                  profileImage: Bakery.src,
                },
                {
                  id: 5,
                  name: '빵굽는 집',
                  operatingStatus: 'OPEN' as const,
                  distance: 3.5,
                  profileImage: Bakery.src,
                },
              ].map((bakery, index) => (
                <div key={index} className="flex-shrink-0 w-[250px] text-gray900">
                  <BakeryCard
                    bakeryId={bakery.id}
                    name={bakery.name}
                    operatingStatus={bakery.operatingStatus}
                    distance={bakery.distance}
                    profileImage={bakery.profileImage}
                    rank={index + 1}
                    size="large"
                    showBookmark={false}
                    isBookmarked={false}
                    onToggleBookmark={() => {}}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomSheet
        isOpen={isOpen}
        title="관심지역 설정"
        cancelText="취소"
        confirmText="관심지역 설정 완료"
        onClose={close}
        onConfirm={handleAddReservation}
        selectedRegion={{
          id: 0,
          name: '',
          subRegions: [],
        }}>
        <div className="grid grid-cols-2 gap-4">
          <BakeryCard {...bakeryCardMockData} />
          <BakeryCard {...bakeryCardMockData} />
          <BakeryCard {...bakeryCardMockData} />
          <BakeryCard {...bakeryCardMockData} />
        </div>
      </BottomSheet>
    </div>
  );
}
