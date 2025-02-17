import ImageSlider from "@/components/common/slider/ImageSlider";
import StoreInfo from "@/components/breadStoreInfo/StoreInfo";
function Page() {
  return (
    <div className="flex flex-col gap-[10px] ">
      <div className="h-[250px] rounded-b-2xl overflow-hidden">
        <ImageSlider />
      </div>
      <StoreInfo />
    </div>
  );
}

export default Page;
