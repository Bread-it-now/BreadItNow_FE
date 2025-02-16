"use client";

import Link from "next/link";
import { useState } from "react";
import SearchBar from "@/components/common/SearchBar";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <h1>검색페이지</h1>
      <br />
      <SearchBar
        name="search"
        placeholder="검색어를 입력해 주세요.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        // onEnter={() => console.log("검색 실행:", searchTerm)}
        onClear={() => setSearchTerm("")}
      />
      <Link href="/">home 이동</Link>
    </div>
  );
}
