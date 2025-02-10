export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="w-full h-full max-w-[375px] max-h-[812px] bg-white border-1 mx-auto pt-[44px]">
        {children}
      </div>
    </div>
  );
}
