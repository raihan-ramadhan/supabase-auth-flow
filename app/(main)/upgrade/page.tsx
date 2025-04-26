import React from "react";

import { getUserSession } from "@/actions/auth";
import { getUserProfiles } from "@/actions/user_profiles";
import UpgradeCards from "@/components/UpgradeCards";

const page = async () => {
  const session = await getUserSession();

  const { data } = await getUserProfiles();

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-[50px]">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">Pricing</h2>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">
          Whatever your status, our offers evolve according to your needs.
        </p>
      </div>
      <UpgradeCards session={session} currentTier={data?.tier ? data.tier : null} />
    </div>
  );
};

export default page;
