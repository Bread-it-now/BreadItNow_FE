export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="bg-gray-50 relative w-full max-w-[375px] max-h-[812px] border-1 mx-auto pb-[58px] h-lvh">
        {children}
        <div className="absolute bottom-0 left-0 w-full">하단영역</div>
      </div>
    </div>
  );
}
