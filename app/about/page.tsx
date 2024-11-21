import Link from "next/link";

export default function About() {
  return (
    <div>
      <div className="flex-col flex items-center justify-center h-full w-1/2 m-auto rounded-xl  bg-card/[0.99] shadow-2xl shadow-zinc-800/50 p-5">
        <h1 className="text-2xl ">Welcome to the farming tab Helper!</h1>
        <p>
          If you&apos;re a Warframe player, you know how struggling it can be to
          farm relics with so many warframes and weapons. Here is a tab that can
          help you register your progression in your long farming sessions.
        </p>
        <p>
          You can register <Link href={"/login"}>here</Link> easily with Google
          to save your progress constantly!
        </p>
      </div>
    </div>
  );
}
