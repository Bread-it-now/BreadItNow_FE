import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

function BakeryImages({ images }: { images: string[] }) {
  const router = useRouter();
  const params = useParams();
  //TODO... 이미지 마지막 이미지를 클릭했을 때 어떤 로직이 필요한지..?
  const moveImageViewPage = () => {
    router.push(`/store/image_view/${params.id}`);
  };
  if (images.length === 0) {
    return (
      <div className="w-full font-normal text-[13px] text-gray-500 py-5 text-center">등록된 이미지가 없습니다.</div>
    );
  }
  return (
    <div className="flex gap-[10px] h-[105px] mt-5">
      {images.slice(0, 3).map((image, index) => (
        <div key={`image-${index}`} className="relative w-full h-[105px]" onClick={moveImageViewPage}>
          <Image src={`${image}`} alt={`빵집 이미지 ${index + 1}`} fill className="object-cover" />
          {images.length > 3 && images.length - 1 === index && (
            <div className="absolute inset-0 z-10 bg-black bg-opacity-30 rounded-lg h-full text-white">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-md">
                {images.length - 3} +
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default BakeryImages;
