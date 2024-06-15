import AccountForm from "@/components/account-form";
import { login } from "@/lib/actions";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "로그인",
  description: "로그인 페이지",
};

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">로그인</h1>
      <AccountForm action={login} />
      <p className="text-slate-500 text-center mt-4">
        계정이 없으신가요?{" "}
        <Link href="/signup" className="text-blue-600 underline">
          가입하기
        </Link>
      </p>
    </div>
  );
}
