export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="relative w-full h-full max-w-[375px] max-h-[812px] bg-white border-1 mx-auto pt-[44px] h-lvh">
        <div id="bottomsheet-root" />
        {children}
      </div>
    </div>
  );
}
