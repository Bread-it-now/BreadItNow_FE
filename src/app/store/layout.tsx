import Footer from "@/components/breadStoreInfo/Footer";
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" justify-center bg-gray-100 overflow-scroll">
      <div className=" bg-gray-50 relative w-full max-w-[375px] border-1 mx-auto pb-[58px] h-lvh ">
        <div className="overflow-y-scroll bg-gray-50 ">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
