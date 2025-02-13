"use client";
import BakeryCard from "@/components/bakerycard/BakeryCard";
import BottomSheet from "@/components/bottomsheet/Bottomsheet";
import { bakeryCardMockData } from "@/mocks/data/bakery";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1 className="text-primary">메인페이지</h1>
      <br />
      <Link href="/search">검색페이지 이동</Link>
      <Link href="/login">로그인페이지 이동</Link>

      <BottomSheet
        isOpen={true}
        title="할 일 정보 수정하기"
        cancelText="취소하기"
        confirmText="필터 적용"
        onClose={() => {}}
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
