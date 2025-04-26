'use client';
import Image from 'next/image';
import emptyIcon from '@/assets/images/empty.png';

interface EmptyStateProps {
  searchTerm?: string; // 검색어가 있을 때만 표시
  title?: string; // 제목 (ex. 즐겨찾기한 빵집이 없습니다.)
  message: string; // 추가 설명 (ex. 자주 가는 빵집을 추가해 보세요.)
}

const EmptyState = ({ searchTerm, title, message }: EmptyStateProps) => {
  return (
    <div className="flex pt-10 flex-col items-center justify-center h-full text-center text-gray500">
      <Image src={emptyIcon} alt="데이터 없음" width={75} height={75} />
      <p className="mt-4 font-semibold">
        {searchTerm ? (
          <>
            ‘<span>{searchTerm}</span>’ 에 대한 검색 결과가 없습니다.
          </>
        ) : (
          title // searchTerm이 없을 경우 title을 표시
        )}
      </p>
      <p className="text-sm mt-2">{message}</p>
    </div>
  );
};

export default EmptyState;
