'use client';
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-200 text-black relative">
      <div>{children}</div>
    </div>
  );
}

export default Layout;
