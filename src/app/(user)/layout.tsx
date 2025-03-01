import BottomNavbar from '@/components/common/BottomNavbar';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="relative w-full max-w-[375px] max-h-[812px] bg-white border-1 mx-auto pt-[44px] pb-[58px] h-lvh overflow-scroll">
        <div id="bottomsheet-root" />
        {children}
        <div className="absolute bottom-0 left-0 w-full">
          <BottomNavbar />
        </div>
      </div>
    </div>
  );
}
