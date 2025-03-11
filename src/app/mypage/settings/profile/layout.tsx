'use client';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/button/Button';
function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="bg-gray-200 text-black pb-[92px]">
      <div className="bg-white px-5 py-[13px] flex items-center">
        <Image
          className="bg-black"
          src={ArrowLeft}
          alt="뒤로가기"
          width={24}
          height={24}
          onClick={() => router.back()}
        />
        <span className="ml-[10px] title-content-l">내 정보 수정</span>
      </div>
      <div>{children}</div>
      <div className="fixed bottom-0 left-0 w-full bg-white flex gap-2 p-5 h-[92px]">
        <Button className="grow" variant="default" onClick={() => router.back()}>
          <div>취소</div>
        </Button>
        <Button className="grow" variant="primary" onClick={() => router.back()}>
          <div>저장</div>
        </Button>
      </div>
    </div>
  );
}

export default Layout;
