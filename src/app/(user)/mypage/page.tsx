import { ROUTES } from '@/constants/routes';

import Link from 'next/link';

const reservationId = 1;
export default function Page() {
  return (
    <div>
      <Link href={ROUTES.MYPAGE.HOME}>home</Link>
      <br />
      <Link href={ROUTES.MYPAGE.BREAD_NOTIFICATIONS_SETTING}>빵 알림 설정 페이지</Link>
      <br />
      <Link href={ROUTES.MYPAGE.PROFILE_SETTING}>프로필 설정 페이지</Link>
      <br />
      <Link href={ROUTES.MYPAGE.NOTIFICATIONS}>알림 내역 페이지</Link>
      <br />
      <Link href={ROUTES.MYPAGE.RESERVATIONS}>예약 내역 페이지</Link>
      <br />
      <Link href={`${ROUTES.MYPAGE.RESERVATIONS}/${reservationId}`}>예약 내역 상세 페이지</Link>
      <br />
      <Link href={ROUTES.MYPAGE.DO_NOT_DISTURB}>방해금지 모드 설정 페이지</Link>
    </div>
  );
}
