import UpdatePassword from "@/components/UpdatePassword";

export default async function recoverPasswordPage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const { code } = await searchParams;

  return (
    <div className="h-screen flex justify-center items-center text-center">
      <div className="w-sm flex flex-col gap-4">
        <h1 className="text-xl font-bold pb-2">Update your password</h1>

        <UpdatePassword code={code} />
      </div>
    </div>
  );
}
