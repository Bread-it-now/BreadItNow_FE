"use client";
import Image from "next/image";
import Checkbox from "@/components/common/checkbox/Checkbox";
import { comma } from "@/utils/comma";
import Tag from "../common/Tag";
import BellIcon from "../common/Icons/BellIcon";
import Bookmark from "@/assets/icons/bookmark.svg";
import { Product } from "@/types/product";
interface BreadReserveCardProps extends Product {
  isChecked?: boolean;
  setIsChecked?: (value: string) => void;
  existReserveTime?: boolean;
  openType?: "select" | "bookmark";
}
function BreadReserveCard({
  name,
  price,
  stock,
  description,
  image,
  setIsChecked = () => {},
  isChecked = false,
  openType = "bookmark",
}: BreadReserveCardProps) {
  const onCheckboxChange = () => {
    setIsChecked(name);
  };

  return (
    <div className="flex gap-4 border-b py-5 relative">
      <div className="min-w-[90px] w-[90px] h-[90px] relative shrink-0">
        <Image
          src={image ? image : ""}
          alt="bread"
          className="object-cover rounded-lg"
          fill
        />
        {openType === "select" ? (
          <div className="absolute top-2 left-2 z-10">
            <Checkbox
              id={name}
              checked={isChecked}
              onChange={onCheckboxChange}
            />
          </div>
        ) : (
          <div className="absolute right-2 w-8 h-8 bottom-2 z-10">
            <button className="rounde-full relative w-full h-full rounded-full border-gray-100 bg-white bg-opacity-80">
              <Image
                src={Bookmark}
                alt="북마크"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 line-heigh text-gray-900 font-medium">
        <div className="font-semibold text-sm">{name}</div>
        <div className="text-[13px] font-normal text-gray-500">
          {description}
        </div>
        <div className="text-[13px] text-gray-700">{stock}개 남음</div>
        <div className="text-sm">{comma(price) ? comma(price) : "0"}원</div>
        {openType === "select" && (
          <div className="flex gap-[2px]">
            <Tag type="time" label="08:00" />
            <Tag type="time" label="08:00" />
            <Tag type="time" label="08:00" />
          </div>
        )}
      </div>
      {openType === "bookmark" && (
        <button className="absolute right-0 bottom-5 w-9 h-9 rounded-full bg-primary bg-opacity-10">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <BellIcon />
          </div>
        </button>
      )}
    </div>
  );
}

export default BreadReserveCard;
