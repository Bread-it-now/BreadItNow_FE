export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="justify-center bg-gray-100 relative h-full">
      {children}
      <div id="bottomsheet-root" />
    </div>
  );
}
