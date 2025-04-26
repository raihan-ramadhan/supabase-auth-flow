import Link from "next/link";
import { redirect } from "next/navigation";

import { getUserSession } from "@/actions/auth";
import { getDocumentCards } from "@/actions/documents";
import CreateDocButton from "@/components/CreateDocButton";

const page = async () => {
  const session = await getUserSession();
  if (!session) {
    redirect("/sign-in");
  }

  const { data } = await getDocumentCards();

  if (!data) return null;

  const sharedDocs: typeof data = [];
  const privatedDocs: typeof data = [];

  for (const doc of data) {
    if (doc.created_by === session.user.id) {
      privatedDocs.push(doc);
    } else {
      sharedDocs.push(doc);
    }
  }

  return (
    <div className="flex flex-col min-h-screen pt-[50px] px-5">
      <div className="pt-3 flex flex-col w-full gap-5">
        <CreateDocButton />

        <div className="flex flex-col w-full gap-1">
          <h2 className="text-xl font-bold">Private Documents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {privatedDocs.map((doc) => (
              <Link key={doc.id} href={`/docs/${doc.id}`} className="bg-neutral-300/30 rounded-2xl p-5">
                {doc.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full gap-1">
          <h2 className="text-xl font-bold">Shared Documents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {sharedDocs.map((doc) => (
              <Link key={doc.id} href={`/docs/${doc.id}`} className="bg-neutral-300/30 rounded-2xl p-5">
                {doc.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
