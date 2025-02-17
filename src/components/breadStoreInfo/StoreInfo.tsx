interface StoreProps {
  title?: string;
  isOpen?: boolean;
  distance?: string;
  description?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function StoreInfo({ title, isOpen, distance, description }: StoreProps) {
  return (
    <article className="bg-white rounded-2xl px-5 py-[30px]">
      <div>
        <div className="flex justify-between">
          <div className="font-semibold text-black text-[22px]">
            소금 한 꼬집
          </div>
          <button className="ml-auto">검색</button>
        </div>
        <div>
          <span className="font-semibold text-secondary text-xs">영업중</span>
          <span className="mx-1">&#183;</span>
          <span className="font-regular text-xs text-gray-500">1.5KM</span>
        </div>
      </div>
      <div className="mt-5 font-regular text-xs text-gray-500">
        신선한 재료로 매일 구워내는 따뜻한 빵과 달콤한 디저트가 가득한 소금 한
        꼬집입니다!
      </div>
    </article>
  );
}

export default StoreInfo;
