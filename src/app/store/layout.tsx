import Footer from "@/components/breadStoreInfo/Footer";
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" justify-center bg-gray-100">
      <div className=" bg-gray-50 max-h-screen relative w-screen max-w-screen border-1 pb-[58px] h-lvh ">
        <div className="bg-gray-50 ">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
