'use client';
import Image from 'next/image';
import KakaoIcon from '@/assets/icons/kakao.svg';
import NaverIcon from '@/assets/icons/naver.svg';
import CopyIcon from '@/assets/icons/copy.svg';

function BakeryAddressBottomSheet({ address = '' }: { address?: string }) {
  const openMap = (type: 'kakao' | 'naver') => {
    const url =
      type === 'kakao' ? `https://map.kakao.com/link/to/${address}` : `https://map.naver.com/p/search/${address}`;
    window.open(url, '_blank');
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="bg-gray-50 w-full">
      <div className="px-5 py-[30px] text-gray-900 rounded-[10px]">
        <div className="p-5 bg-white rounded-[10px]">
          <button
            onClick={() => openMap('kakao')}
            type="button"
            className="flex w-full gap-5 items-center justify-between">
            <div className="text-md font-medium">카카오맵</div>
            <Image src={KakaoIcon} alt="kakao" width={20} height={20} />
          </button>
          <button
            onClick={() => openMap('naver')}
            type="button"
            className="flex w-full gap-5 items-center justify-between mt-6">
            <div className="text-md font-medium">네이버 지도</div>
            <Image src={NaverIcon} alt="naver" width={20} height={20} />
          </button>
        </div>
        <button
          onClick={copyAddress}
          type="button"
          className="mt-[10px] w-full  flex gap-5 items-center justify-between p-5 bg-white rounded-[10px]">
          <div className="text-md font-medium">복사</div>
          <Image src={CopyIcon} alt="copy" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}

export default BakeryAddressBottomSheet;
