import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="h-[100dvh] w-full flex flex-col justify-center items-center">
      <div>
        <h1>Home</h1>
      </div>
      <div className="flex gap-4">
        <Link href={"/sign-in"}>Sign In</Link>
        <Link href={"/sign-up"}>Sign Up</Link>
      </div>
    </div>
  );
}
