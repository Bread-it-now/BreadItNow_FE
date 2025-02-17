import ImageSlider from "@/components/common/slider/ImageSlider";
import StoreInfo from "@/components/breadStoreInfo/StoreInfo";
import Tag from "@/components/common/Tag";
function Page() {
  const obj = {
    "07:00": [
      "크루아상",
      "생크림식빵",
      "마늘바게트",
      "소보루빵",
      "베이글",
      "크루아상",
      "생크림식빵",
      "마늘바게트",
      "소보루빵",
      "베이글",
    ],
    "09:30": ["크루아상", "생크림식빵", "마늘바게트"],
    "12:00": ["크루아상"],
    "14:30": ["크루아상", "생크림식빵", "마늘바게트", "소보루빵", "베이글"],
    "16:00": ["크루아상", "생크림식빵", "마늘바게트", "소보루빵"],
  };
  return (
    <div className="flex flex-col gap-[10px] ">
      <div className="h-[250px] rounded-b-2xl overflow-hidden">
        <ImageSlider />
      </div>
      <StoreInfo />
      <article className="bg-white rounded-2xl px-5 py-[30px]">
        <div>
          <div className="flex justify-between">
            <div className="font-semibold text-black text-md">영업 시간</div>
            <button className="ml-auto">검색</button>
          </div>
          <div className="text-[13px] font-light mt-5 text-gray-700">
            <div>평일 | 오전 07:00 - 오후 10:00</div>
            <div>토요일 | 오전 07:00 - 오후 06:00</div>
            <div>*정기 휴무 매주 일요일</div>
          </div>
        </div>
      </article>
      <article className="bg-white rounded-2xl px-5 py-[30px]">
        <div>
          <div className="flex justify-between">
            <div className="font-semibold text-black text-md">
              예상 빵 나오는 시간
            </div>
            <button className="ml-auto">검색</button>
          </div>
          <div className="text-[13px] font-light mt-5 text-left">
            {Object.entries(obj).map(([key, value]) => {
              return (
                <div className="flex mt-5" key={key}>
                  <Tag type="time" label={key} />
                  <div
                    className="
                    relative 
                    before:absolute 
                    before:-left-[10px]
                    before:w-[1px] 
                    before:bg-gray-200 
                    before:rounded-full 
                    before:contents-[''] 
                    before:h-full 
                    ml-[20px]          
                    flex
                    flex-wrap 
                    gap-x-1 
                    gap-y-1.5
                  "
                  >
                    {value.map((bread, index) => (
                      <Tag
                        type="category"
                        label={bread}
                        key={`${bread}-${index}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </article>
    </div>
  );
}

export default Page;
