import Image from 'next/image';
import emptyIcon from '@/assets/images/empty.png';

interface EmptyStateProps {
  searchTerm: string;
}

const EmptyState = ({ searchTerm }: EmptyStateProps) => {
  return (
    <div className="flex pt-10 flex-col items-center justify-center h-full text-center text-gray500">
      <Image src={emptyIcon} alt="검색 결과 없음" width={75} height={75} />
      <p className="mt-4 font-semibold">
        ‘<span>{searchTerm}</span>’ 에 대한 검색 결과가 없습니다.
      </p>
      <p className="text-sm mt-2">다른 키워드로 검색해보세요.</p>
    </div>
  );
};

export default EmptyState;
