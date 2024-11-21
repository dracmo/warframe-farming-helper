import { useSession, signOut } from "next-auth/react";
import SignGoogle from "../schema/signGoogle";
import { Button } from "../ui/button";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <Button variant={"outline"} onClick={() => signOut()}>
          Sign out
        </Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <SignGoogle />
    </>
  );
}
