import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <h1 className="text-primary">메인페이지</h1>
      <br />
      <Link href="/search">검색페이지 이동</Link>
    </div>
  );
}
