'use client';
import Stack from '@/components/common/stack/Stack';
import NavLink from '@/components/navlink/NavLink';
import inquiry from '@/assets/icons/inquiry.svg';
import { ROUTES } from '@/constants/routes';
import lock from '@/assets/icons/lock.svg';
import store from '@/assets/icons/store.svg';
import { logout } from '@/lib/api/bakery';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col gap-4 bg-gray50">
      <section className="flex flex-col items-start px-5 py-[1.875rem] gap-5 w-full rounded-2xl bg-white">
        <Stack divider={<div className="w-full h-[1px] bg-gray100"></div>}>
          <NavLink title={'비밀번호 수정'} icon={lock} targetUrl={ROUTES.OWNER.BAKERY.EDIT_PROFILE} />
          <NavLink title={'빵집 삭제'} icon={store} targetUrl={''} showBtn={false} />
        </Stack>
      </section>
      <section className="flex flex-col items-start px-5 py-[1.875rem] gap-5 w-full rounded-2xl bg-white">
        <NavLink title={'빵잇나우팀에게 문의하기'} icon={inquiry} targetUrl={ROUTES.OWNER.HOME} />
      </section>
      <section className="flex w-full text-title-content-xs px-5">
        <button
          className="w-full text-gray500"
          onClick={() => {
            logout();
            router.push(ROUTES.HOME.ROOT);
          }}>
          로그아웃
        </button>
        <button className="w-full text-primary" onClick={() => {}}>
          회원탈퇴
        </button>
      </section>
    </div>
  );
}
