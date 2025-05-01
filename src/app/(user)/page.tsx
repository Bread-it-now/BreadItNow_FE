'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useScrollDetection } from '@/hooks/useScrollDetection';
import TodayBread from '@/components/todaybread/TodayBread';
import BakeryCard from '@/components/bakerycard/BakeryCard';
import MapIcon from '@/components/common/Icons/MapIcon';
import ArrowDown from '@/assets/icons/arrow-down-white.svg';
import ArrowDownBlack from '@/assets/icons/arrow-down.svg';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import SearchIcon from '@/components/common/Icons/SearchIcon';
import NotificationIcon from '@/components/common/Icons/NotificationIcon';
import { getMonthDateDay } from '@/utils/date';
import { useTodayAlertProducts } from '@/lib/api/notification';
import { useHotBakeries, useHotProducts } from '@/lib/api/bakery';
import { HotBakery, HotProduct } from '@/types/bakery';
import BreadCard from '@/components/bakerycard/BreadCard';
import EmptyState from '@/components/common/EmptyState';
// import { requestPermissionAndGetToken, onForegroundMessage } from '@/lib/firebase';
// import { postNotification } from '@/lib/api/fcm';
import useBaseBottomSheet from '@/hooks/useBaseBottomSheet';
import RegionBottomSheet from '@/components/bottomsheet/regionbottomsheet/RegionBottomSheet';

const TodayProductsSection = () => {
  const { data: todayProducts } = useTodayAlertProducts();
  const { month, date, day } = getMonthDateDay(new Date());

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = useState<string | null>(null);

  // useEffect(() => {
  //   requestPermissionAndGetToken().then((token) => {
  //     if (token) {
  //       setToken(token);
  //       postNotification(1, 1);
  //     }
  //   });
  //   // .catch((err) => console.error('FCM Token Error', err));

  //   onForegroundMessage(() => {
  //     // console.log('🔔 Foreground 메시지 수신:', payload);
  //   });
  // }, []);
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

const HotBakerySection = () => {
  const router = useRouter();
  const navigateToBakeries = () => router.push(ROUTES.HOME.BAKERY_LIST);
  const { data } = useHotBakeries({ size: 5, sort: 'reservation' });

  return (
    <div className="flex flex-col gap-[30px] w-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-gray900">핫한 빵집 top 5</h2>
          <p className="text-gray500 text-sm">최근 한 달 간 예약이 많은 순</p>
        </div>
        <button onClick={navigateToBakeries}>
          <Image src={ArrowRight} alt="더보기" />
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pl-1 scrollbar-hide">
        {data?.pages[0].data.hotBakeries.length !== 0 ? (
          data?.pages.map((page) =>
            page.data.hotBakeries.map((bakery: HotBakery, idx: number) => (
              <div key={idx} className="flex-shrink-0 w-[250px] text-gray900">
                <BakeryCard
                  key={bakery.bakeryId}
                  bakeryId={bakery.bakeryId}
                  name={bakery.bakeryName}
                  operatingStatus={bakery.operatingStatus}
                  distance={bakery.distance}
                  profileImage={bakery.profileImage}
                  rank={idx + 1}
                  isBookmarked={false}
                />
              </div>
            )),
          )
        ) : (
          <EmptyState title="핫한 빵이 없습니다." message="핫한 빵이 없습니다." />
        )}
      </div>
    </div>
  );
};

export default function Page() {
  const { isOpen, dispatch } = useBaseBottomSheet();
  const [regionTitle, setRegionTitle] = useState<string>('전체');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isScrolled = useScrollDetection(scrollContainerRef);
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
            onClick={dispatch.open}
            className={`flex items-center gap-2 text-lg font-medium transition-colors ${
              isScrolled ? 'text-black' : 'text-white'
            }`}>
            <MapIcon color={isScrolled ? '#ff7651' : 'white'} />
            <span>{regionTitle}</span>
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
        <div className="flex flex-col gap-[80px] bg-white rounded-t-2xl p-4 mt-[50px] w-[100%]">
          <HotProductsSection />
          <HotBakerySection />
        </div>
      </div>

      {isOpen && <RegionBottomSheet isOpen={isOpen} close={dispatch.close} handleRegionTitle={setRegionTitle} />}
    </div>
  );
}
