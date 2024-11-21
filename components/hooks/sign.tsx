import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export const Sign = () => {
  const { data: session } = useSession();
  const name = session ? session?.user?.name : "Login";
  const icon = session?.user?.image || "/default-user-image.png";

  return (
    <>
      {!session ? (
        <>
          <Link href="/login" className="w-full flex flex-col">
            <Button
              variant="outline"
              className="mt-4 text-center items-center mx-auto capitalize font-bold "
            >
              sign in
            </Button>
          </Link>
          <div className="bg-red-500 text-white text-center p-1 rounded-xl mt-2">
            Please log in to save your progress.
          </div>
        </>
      ) : (
        <div className="flex flex-col w-full">
          <div className="flex flex-row m-auto items-center gap-2 my-4">
            <Image
              src={icon}
              alt="user image"
              width={35}
              height={35}
              className="rounded-full m-auto bg-slate-100"
            />
            <p className=" text-sm flex font-bold capitalize">{name}</p>
          </div>
          <div className="bg-zinc-600 w-1/2 h-[1px] mx-auto " />
          <Link href="/logout" className="w-full flex flex-col">
            <Button
              variant="outline"
              className="mt-4 text-center items-center mx-auto capitalize font-bold "
            >
              sign up
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};
