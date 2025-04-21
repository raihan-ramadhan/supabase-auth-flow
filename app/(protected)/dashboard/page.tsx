import { redirect } from "next/navigation";

import { getUserSession } from "@/actions/auth";
import LogoutButton from "@/components/LogoutButton";

const page = async () => {
  const session = await getUserSession();
  if (!session) {
    redirect("/sign-in");
  }

  const { user } = session;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2>Dashboard</h2>
      {user && <p>Welcome, {user.email}</p>}
      <LogoutButton />
    </div>
  );
};

export default page;
