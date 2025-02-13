import BottomNavbar from "@/components/common/BottomNavbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="relative w-full max-w-[375px] bg-white mx-auto min-h-screen flex flex-col">
        <div className="flex-grow">{children}</div>
        <BottomNavbar />
      </div>
    </div>
  );
}
