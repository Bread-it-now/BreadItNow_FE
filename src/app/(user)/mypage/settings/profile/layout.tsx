'use client';
import { useRouter } from 'next/navigation';
import Button from '@/components/button/Button';
function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="bg-gray-200 text-black relative">
      <div>{children}</div>
      <div className="sticky bottom-0 left-0 w-full max-w-[375px] bg-white flex gap-2 p-5 h-[92px]">
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
