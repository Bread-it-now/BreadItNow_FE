function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="justify-center bg-gray-100">
      <div className="relative min-h-screen overflow-y-auto bg-gray-50 w-screen max-w-screen border-1 flex flex-col gap-[10px]">
        {children}
      </div>
    </div>
  );
}

export default Layout;
