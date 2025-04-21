import RecoverPassword from "@/components/RecoverPassword";

export default function recoverPasswordPage() {
  return (
    <div className="h-screen flex justify-center items-center text-center">
      <div className="w-sm flex flex-col gap-2">
        <h1 className="text-xl font-bold">Recover your password</h1>
        <p>You'll receive an email to recover your password.</p>
        <RecoverPassword />
      </div>
    </div>
  );
}
