"use client";

import React, { useTransition } from "react";
import { Provider } from "@supabase/supabase-js";

import { signInWithOAuth } from "@/actions/auth";
import Loader from "./Loader";

type OAuthButtonProps = {
  name: string;
  icon: React.ReactNode;
  provider_name: Provider;
};

const OAuthButton = (props: OAuthButtonProps) => {
  const [pending, startTransition] = useTransition();

  const { name, icon, provider_name } = props;

  const handleOnClick = async () => {
    startTransition(async () => {
      try {
        await signInWithOAuth(provider_name);
      } catch (error) {
        console.log("Error signing provider:", error);
      }
    });
  };

  return (
    <button
      type="button"
      className="py-3 px-1.5 rounded-2xl border border-border flex relative justify-center text-base cursor-pointer active:bg-neutral-200 dark:active:bg-neutral-700 dark:hover:bg-neutral-900 hover:bg-neutral-50 gap-1 w-full outline-none focus-visible:ring-2 focus-visible:ring-border"
      onClick={handleOnClick}
    >
      <span
        data-testid="icon-container"
        className="size-6 inline-block absolute left-3 top-1/2 -translate-y-1/2 dark:drop-shadow dark:drop-shadow-neutral-500"
      >
        {icon}
      </span>
      <span>Continue</span>
      <span>with</span>
      <span>{name}</span>
      {pending ? <Loader className="absolute right-3 top-1/2 -translate-y-1/2" /> : null}
    </button>
  );
};

export default OAuthButton;
