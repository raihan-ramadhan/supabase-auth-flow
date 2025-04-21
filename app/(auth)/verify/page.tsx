import OtpInputContainer from "@/components/OtpInputContainer";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email: string }>;
}) {
  const { token, email } = await searchParams;

  return (
    <div className="h-screen flex items-center justify-center">
      <OtpInputContainer token={token} email={email} />
    </div>
  );
}
