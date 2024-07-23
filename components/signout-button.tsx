import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions";

export default function SignOutButton() {
  return (
    <form action={logout}>
      <Button type="submit">로그아웃</Button>
    </form>
  );
}
