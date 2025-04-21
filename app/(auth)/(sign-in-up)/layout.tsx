import OAuthProviders from "@/components/OAuthProviders";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center py-5">
        <div className="w-sm flex flex-col gap-2">
          <OAuthProviders />
          {children}
        </div>
      </div>
    </>
  );
}
