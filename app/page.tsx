import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="h-[100dvh] w-full flex justify-center items-center">
      <h1>Home</h1>
    </div>
  );
}
