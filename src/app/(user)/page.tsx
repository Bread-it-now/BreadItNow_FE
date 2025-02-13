import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1 className="text-primary">메인페이지</h1>
      <br />
      <div className="text-black">
        <Link href="/search">검색페이지 이동</Link>
        <br />
        <Link href="/login">로그인페이지 이동</Link>
        <br />
        <Link href="/breadlist">빵 리스트 이동</Link>
        <br />
      </div>
    </div>
  );
}
