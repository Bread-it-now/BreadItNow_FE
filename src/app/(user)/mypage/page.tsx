'use client';

import Image from 'next/image';
import bell from '@/assets/icons/bell.svg';
import bread from '@/assets/icons/bread-20.svg';
import profile from '@/assets/images/profile.png';
import smallArrow from '@/assets/icons/arrow-left-sub.svg';
import { useRouter } from 'next/navigation';
import { MYPAGE_TITLE, ROUTES } from '@/constants/routes';
import NavLink from '@/components/navlink/NavLink';
import bookmark from '@/assets/icons/bookmark-20.svg';
import reservation from '@/assets/icons/reservation-20.svg';
import inquiry from '@/assets/icons/inquiry.svg';
import Stack from '@/components/common/stack/Stack';
import { IUser } from '@/lib/api/login';

const notificationCnt: number = 8;

export default function Page() {
  const router = useRouter();
  const userInfo: IUser | null = JSON.parse(localStorage.getItem('user') || '{}');
  if (!userInfo || Object.keys(userInfo).length === 0) {
    alert('로그인 후 이용해주세요.');
    router.push(ROUTES.AUTH.LOGIN);
  }
  return (
    <>
      {/* 알림 컴포넌트  */}
      <button className="absolute right-5 top-[3.625rem]" onClick={() => {}}>
        <span
          className={'relative w-[1.5rem] h-[1.5rem] text-right text-body-m font-medium text-primary hover:opacity-70'}>
          <Image src={bell} width={24} height={24} alt="bell" />
          {notificationCnt !== 0 && (
            <div className="absolute top-[-4px] right-[-3px] px-[3px] pb-[1px] flex justify-center text-center items-center w-[15px] h-[15px] bg-primary rounded-full text-white text-[10px] font-semibold">
              {notificationCnt}
            </div>
          )}
        </span>
      </button>
      {/* 간략한 프로필 섹션 */}
      <section className="flex items-center px-5 pt-6 pb-[1.875rem] gap-4 w-full bg-white rounded-b-2xl">
        <div className="w-[3.75rem] h-]3.75rem]">
          <Image
            src={userInfo?.profileImage || profile}
            width={60}
            height={60}
            alt="profile"
            className="border bg-gray50 rounded-full"
          />
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <p className="flex items-center gap-[2px] w-full h-[1.625rem] text-title-content-l">{userInfo?.nickname}</p>
          <button className="flex items-center gap-[2px]" onClick={() => router.push(ROUTES.MYPAGE.CHECK_PASSWPRD)}>
            <span className="text-title-content-xs font-normal text-gray500">내 정보 수정</span>
            <Image src={smallArrow} width={12} height={12} alt="arrow" />
          </button>
        </div>
      </section>
      <section className="flex flex-col items-start px-5 py-[1.875rem] gap-5 w-full rounded-2xl bg-white">
        <Stack divider={<div className="w-full h-[1px] bg-gray100"></div>}>
          <NavLink
            title={MYPAGE_TITLE.BREAD_NOTIFICATIONS_SETTING}
            icon={bread}
            targetUrl={ROUTES.MYPAGE.BREAD_NOTIFICATIONS_SETTING}
          />
          <NavLink title={MYPAGE_TITLE.NOTIFICATIONS + ' 내역'} icon={bell} targetUrl={ROUTES.MYPAGE.NOTIFICATIONS} />
          <NavLink title={MYPAGE_TITLE.RESERVATIONS} icon={reservation} targetUrl={ROUTES.MYPAGE.RESERVATIONS} />
          <NavLink title={MYPAGE_TITLE.FAVORITES} icon={bookmark} targetUrl={ROUTES.MYPAGE.FAVORITES} />
        </Stack>
      </section>
      <section className="flex flex-col items-start px-5 py-[1.875rem] gap-5 w-full rounded-2xl bg-white">
        <NavLink title={'빵잇나우팀에게 문의하기'} icon={inquiry} targetUrl={ROUTES.HOME.ROOT} />
      </section>
    </>
  );
}
