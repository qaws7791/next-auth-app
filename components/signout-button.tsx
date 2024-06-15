import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions";
import React from "react";

export default function SignOutButton() {
  return (
    <form action={logout}>
      <Button type="submit">로그아웃</Button>
    </form>
  );
}
