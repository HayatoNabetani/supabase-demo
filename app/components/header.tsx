import { Button } from "@/components/ui/button";
import { signIn, signOut } from "../actions/auth";
import { currentUser } from "../datas/auth";
import Link from "next/link";

const Header = async () => {
  const user = await currentUser();
  return (
    <header className="container border-b h-16 flex justify-between items-center">
      <Link href="/">supabase demo</Link>
      {user ? (
        <form action={signOut}>
          <Button variant="outline">ログアウト</Button>
        </form>
      ) : (
        <form action={signIn}>
          <Button>ログイン</Button>
        </form>
      )}
    </header>
  );
};

export default Header;
