export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="justify-center bg-gray-100">
      <div className="relative max-h-screen h-screen overflow-y-auto bg-gray-50 w-screen max-w-screen border-1">
        <div className="bg-gray-50 ">{children}</div>
      </div>
      <div id="bottomsheet-root" />
    </div>
  );
}
