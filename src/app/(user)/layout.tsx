import BottomNavbar from "@/components/common/BottomNavbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="relative w-full max-w-[375px] bg-white mx-auto flex flex-col h-screen">
        <div className="flex-grow overflow-y-auto pb-[58px] scrollbar-hide">
          {children}
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <BottomNavbar />
        </div>
      </div>
    </div>
  );
}
