import breadImage from "./bread.png";
import Image from "next/image";
import Checkbox from "@/components/common/checkbox/Checkbox";
function BreadReserveCard() {
  return (
    <div className="flex gap-4 h-[109px]">
      <div className="min-w-[90px] w-[90px] h-[90px] relative shrink-0">
        <Image
          src={breadImage}
          alt="bread"
          className="object-cover rounded-lg"
          fill
        />
        <div className="absolute top-2 left-2 z-10">
          <Checkbox id="checkbox" checked={true} onChange={() => {}} />
        </div>
      </div>
      <div className="flex flex-col gap-1 line-heigh">
        <div className="font-medium text-sm">모카크림빵</div>
        <div className="text-[13px] text-gray-500">
          서브 텍스트 영역입니다. 서브 텍스트 영역입니다. 두줄 영역입니다.
        </div>
        <div className="text-[13px] text-gray-700">N개 남음</div>
        <div className="text-sm font-medium">2,700원</div>
      </div>
    </div>
  );
}

export default BreadReserveCard;
