export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-gray-50">{children}</div>
      <div id="bottomsheet-root" />
    </>
  );
}
