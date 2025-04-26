import React, { ReactNode } from "react";
import { User } from "@supabase/supabase-js";

import { tier_type } from "@/types/user_profiles";
import { TierCard } from "./TierCard";

export type TierCardProps = {
  price: ReactNode;
  desc: string;
  items: string[];
  tier: tier_type;
  active?: boolean;
};

const tiers: TierCardProps[] = [
  {
    tier: "free",
    price: "Free",
    desc: "Forever free",
    items: ["1 document"],
  },
  {
    tier: "pro",
    active: true,
    price: (
      <>
        <span className="font-bold text-2xl -me-2">$</span>39
      </>
    ),
    desc: "All the basics for starting a new business",
    items: ["2 documents"],
  },
  {
    tier: "team",
    price: (
      <>
        <span className="font-bold text-2xl -me-2">$</span>89
      </>
    ),
    desc: "All the basics for starting a new business",
    items: ["5 documents"],
  },
  {
    tier: "enterprise",
    price: (
      <>
        <span className="font-bold text-2xl -me-2">$</span>149
      </>
    ),
    desc: "All the basics for starting a new business",
    items: ["Unlimited documents"],
  },
];

const UpgradeCards = ({
  session,
  currentTier,
}: {
  session: { status: "success"; user: User } | null;
  currentTier: tier_type | null;
}) => {
  return (
    <>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:items-center">
        {tiers.map(({ tier, price, desc, items, active }) => (
          <TierCard
            key={tier}
            tier={tier}
            desc={desc}
            price={price}
            items={items}
            active={active}
            isLoggedIn={!!session}
            currentTier={currentTier}
          />
        ))}
      </div>

      <div className="mt-20 lg:mt-32">
        <div className="lg:text-center mb-10 lg:mb-20">
          <h3 className="text-2xl font-semibold dark:text-white">Compare plans</h3>
        </div>

        <div className="space-y-8 lg:hidden">
          <section>
            <div className="px-4 mb-4">
              <h2 className="text-lg leading-6 font-medium text-gray-800 dark:text-neutral-200">Free</h2>
            </div>
            <table className="w-full">
              <caption className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-bold text-gray-800 text-start dark:bg-neutral-700 dark:border-neutral-700 dark:text-white">
                Financial data
              </caption>
              <thead>
                <tr>
                  <th className="sr-only" scope="col">
                    Feature
                  </th>
                  <th className="sr-only" scope="col">
                    Included
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                <tr className="border-t border-gray-200 dark:border-neutral-700">
                  <th
                    className="py-5 px-4 text-sm font-normal text-gray-600 text-start whitespace-nowrap dark:text-neutral-400"
                    scope="row"
                  >
                    Open/High/Low/Close
                  </th>
                  <td className="py-5 pe-4">
                    <svg
                      className="shrink-0 ms-auto size-5 text-blue-600 dark:text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="sr-only">Yes</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <div className="px-4 mb-4">
              <h2 className="text-lg leading-6 font-medium text-gray-800 dark:text-neutral-200">Startup</h2>
            </div>
            <table className="w-full">
              <caption className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-bold text-gray-800 text-start dark:bg-neutral-700 dark:border-neutral-700 dark:text-white">
                Financial data
              </caption>
              <thead>
                <tr>
                  <th className="sr-only" scope="col">
                    Feature
                  </th>
                  <th className="sr-only" scope="col">
                    Included
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                <tr className="border-t border-gray-200 dark:border-neutral-700">
                  <th
                    className="py-5 px-4 text-sm font-normal text-gray-600 text-start whitespace-nowrap dark:text-neutral-400"
                    scope="row"
                  >
                    Open/High/Low/Close
                  </th>
                  <td className="py-5 pe-4">
                    <svg
                      className="shrink-0 ms-auto size-5 text-blue-600 dark:text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="sr-only">Yes</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <div className="px-4 mb-4">
              <h2 className="text-lg leading-6 font-medium text-gray-800 dark:text-neutral-200">Team</h2>
            </div>
            <table className="w-full">
              <caption className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-bold text-gray-800 text-start dark:bg-neutral-700 dark:border-neutral-700 dark:text-white">
                Financial data
              </caption>
              <thead>
                <tr>
                  <th className="sr-only" scope="col">
                    Feature
                  </th>
                  <th className="sr-only" scope="col">
                    Included
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                <tr className="border-t border-gray-200 dark:border-neutral-700">
                  <th
                    className="py-5 px-4 text-sm font-normal text-gray-600 text-start whitespace-nowrap dark:text-neutral-400"
                    scope="row"
                  >
                    Open/High/Low/Close
                  </th>
                  <td className="py-5 pe-4">
                    <svg
                      className="shrink-0 ms-auto size-5 text-blue-600 dark:text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="sr-only">Yes</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <div className="px-4 mb-4">
              <h2 className="text-lg leading-6 font-medium text-gray-800 dark:text-neutral-200">Enterprise</h2>
            </div>
            <table className="w-full">
              <caption className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-bold text-gray-800 text-start dark:bg-neutral-700 dark:border-neutral-700 dark:text-white">
                Financial data
              </caption>
              <thead>
                <tr>
                  <th className="sr-only" scope="col">
                    Feature
                  </th>
                  <th className="sr-only" scope="col">
                    Included
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                <tr className="border-t border-gray-200 dark:border-neutral-700">
                  <th
                    className="py-5 px-4 text-sm font-normal text-gray-600 text-start whitespace-nowrap dark:text-neutral-400"
                    scope="row"
                  >
                    Open/High/Low/Close
                  </th>
                  <td className="py-5 pe-4">
                    <svg
                      className="shrink-0 ms-auto size-5 text-blue-600 dark:text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="sr-only">Yes</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>

        <div>
          <table className="w-full h-px hidden lg:block">
            <caption className="sr-only">Pricing plan comparison</caption>
            <thead className="sticky top-0 inset-x-0 bg-white dark:bg-neutral-900">
              <tr>
                <th className="py-4 ps-6 pe-6 text-sm font-medium text-gray-800 text-start" scope="col">
                  <span className="sr-only">Feature by</span>
                  <span className="dark:text-white">Plans</span>
                </th>

                <th
                  className="w-1/4 py-4 px-6 text-lg leading-6 font-medium text-gray-800 text-center dark:text-white"
                  scope="col"
                >
                  Free
                </th>
                <th
                  className="w-1/4 py-4 px-6 text-lg leading-6 font-medium text-gray-800 text-center dark:text-white"
                  scope="col"
                >
                  Pro
                </th>
                <th
                  className="w-1/4 py-4 px-6 text-lg leading-6 font-medium text-gray-800 text-center dark:text-white"
                  scope="col"
                >
                  Team
                </th>
                <th
                  className="w-1/4 py-4 px-6 text-lg leading-6 font-medium text-gray-800 text-center dark:text-white"
                  scope="col"
                >
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody className="border-t border-gray-200 divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
              <tr>
                <th
                  className="py-3 ps-6 bg-gray-50 font-bold text-gray-800 text-start dark:bg-neutral-800 dark:text-white"
                  colSpan={5}
                  scope="colgroup"
                >
                  Limit
                </th>
              </tr>

              <tr>
                <th
                  className="py-5 ps-6 pe-6 text-sm font-normal text-gray-600 text-start whitespace-nowrap dark:text-neutral-400"
                  scope="row"
                >
                  Limit document
                </th>

                <td className="py-5 px-6 text-center">
                  <span>1</span>
                </td>

                <td className="py-5 px-6 text-center">
                  <span>5</span>
                </td>

                <td className="py-5 px-6 text-center">
                  <span>Unlimited</span>
                </td>

                <td className="py-5 px-6 text-center">
                  <span>Unlimited</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UpgradeCards;
