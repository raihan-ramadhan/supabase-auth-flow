"use client";

import { useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { changeSubscriptionTier } from "../actions/user_profiles";
import { toast } from "../hooks/use-toast";
import { tier_type } from "../types/user_profiles";
import constants from "../utils/constants";
import SubmitButton from "./SubmitButton";
import { TierCardProps } from "./UpgradeCards";

export function TierCard({
  price,
  desc,
  items,
  tier,
  active = false,
  isLoggedIn,
  currentTier,
}: TierCardProps & { isLoggedIn: boolean; currentTier: tier_type | null }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const subscribe = () => {
    startTransition(async () => {
      try {
        const { message, status } = await changeSubscriptionTier(tier);

        if (status === constants("STATUS_ERROR")) {
          throw new Error(message);
        }
        toast({
          title: "Success",
          description: "Will be redirect to dashboard in 3s",
        });

        router.refresh();
        timeoutRef.current = setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } catch (error) {
        let errorMessage;

        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage || "Something went wrong.",
        });
      }
    });
  };

  useEffect(() => {
    // Cleanup on unmount or route change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        className={`flex flex-col border text-center rounded-xl p-8 ${active ? "border-2 border-blue-500 " : "border-gray-200 dark:border-neutral-800"}`}
      >
        {active ? (
          <p className="mb-3">
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs uppercase font-semibold bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-white">
              Most popular
            </span>
          </p>
        ) : null}

        <h4 className="font-medium text-lg text-gray-800 dark:text-neutral-200">
          {tier[0].toUpperCase()}
          {tier.substring(1)}
        </h4>
        <span className="mt-7 font-bold text-5xl text-gray-800 dark:text-neutral-200">{price}</span>
        <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">{desc}</p>

        <ul className="mt-7 space-y-2.5 text-sm">
          {items.map((item, i) => (
            <li key={i} className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-blue-600 dark:text-blue-500"
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
              <span className="text-gray-800 dark:text-neutral-400">{item}</span>
            </li>
          ))}
        </ul>
        {isLoggedIn ? (
          <form action={subscribe}>
            <SubmitButton isLoading={pending} className="mt-5">
              {currentTier === tier ? <span>You're on this plan</span> : <span>Subscribe</span>}
            </SubmitButton>
          </form>
        ) : (
          <Link
            href={"/sign-up"}
            className="bg-blue-400 text-background w-full py-3 px-1.5 rounded-2xl block cursor-pointer active:bg-blue-400/80 hover:bg-blue-400/95 font-bold disabled:opacity-50 disabled:cursor-auto flex-row justify-center "
          >
            Sign up
          </Link>
        )}
      </div>
    </>
  );
}
