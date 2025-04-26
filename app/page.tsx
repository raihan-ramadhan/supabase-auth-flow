import type { Metadata } from "next";

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="h-[100dvh] w-full flex flex-col justify-center items-center">
        <h1>Home</h1>
      </div>
    </>
  );
}
