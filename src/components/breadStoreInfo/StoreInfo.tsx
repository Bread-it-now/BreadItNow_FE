import { Bakery } from "@/types/bakery";
import Bookmark from "@/assets/icons/bookmark.svg";
import Image from "next/image";

function StoreInfo({ bakery }: { bakery: Bakery }) {
  return (
    <article className="bg-white rounded-2xl px-5 py-[30px]">
      <div>
        <div className="flex justify-between">
          <div className="font-semibold text-black text-[22px]">
            {bakery.name}
          </div>
          <button className="w-8 h-8 rounded-full border-gray-100">
            <Image src={Bookmark} alt="북마크" />
          </button>
        </div>
        <div>
          <span className="font-semibold text-secondary text-xs">
            {bakery.operatingStatus}
          </span>
          <span className="mx-1">&#183;</span>
          <span className="font-regular text-xs text-gray-500">1.5KM</span>
        </div>
      </div>
      <div className="mt-5 font-regular text-xs text-gray-500">
        {bakery.description}
      </div>
    </article>
  );
}

export default StoreInfo;
