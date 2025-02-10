"use client";

import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [response, setResponse] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <br />
      <Link href="/">메인페이지 이동</Link>
      <br />
      <br />
      <h1>Login Test</h1>
      <button
        className="bg-white text-black px-1 m-1 rounded-md"
        onClick={handleLogin}
      >
        로그인 테스트 버튼
      </button>
      <pre>{response}</pre>
    </div>
  );
}
