"use client";
import BakeryCard from "@/components/bakerycard/BakeryCard";
import BottomSheet from "@/components/bottomsheet/Bottomsheet";
import { useReservationBottomSheet } from "@/hooks/useReservationBottomSheet";
import { bakeryCardMockData } from "@/mocks/data/bakery";
import Link from "next/link";

export default function Page() {
  const { isOpen, open, close, title } = useReservationBottomSheet();

  return (
    <div>
      <h1 className="text-primary">메인페이지</h1>
      <br />
      <Link href="/search">검색페이지 이동</Link>
      <Link href="/login">로그인페이지 이동</Link>
      <Link href="/breadlist">빵 리스트 이동</Link>
      <div>
        <button onClick={open}>바텀시트 열기</button>
      </div>

      <BottomSheet
        isOpen={isOpen}
        title={title}
        cancelText="취소"
        confirmText="관심지역 설정하기"
        onClose={close}
        onConfirm={() => {}}
      >
        <div className="overflow-hidden">
          <BakeryCard {...bakeryCardMockData} />
          <BakeryCard {...bakeryCardMockData} />
        </div>
      </BottomSheet>
    </div>
  );
}
