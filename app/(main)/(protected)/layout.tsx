import { redirect } from "next/navigation";

import { getUserSession } from "@/actions/auth";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getUserSession();

  if (!session) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}
