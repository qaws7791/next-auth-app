import AccountForm from "@/components/account-form";
import { signup } from "@/lib/actions";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "가입하기",
  description: "가입 페이지",
};

export default function SignupPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">가입하기</h1>
      <AccountForm action={signup} />
      <p className="text-slate-500 text-center mt-4">
        계정이 있으신가요?
        <Link href="/login" className="text-blue-600 underline">
          로그인하기
        </Link>
      </p>
    </div>
  );
}
