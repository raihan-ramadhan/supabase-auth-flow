import React from "react";

type OAuthButtonProps = {
  name: string;
  icon: React.ReactNode;
};

const OAuthButton = (props: OAuthButtonProps) => {
  const { name, icon } = props;

  return (
    <button
      type="button"
      className="py-3 px-1.5 rounded-2xl border border-border flex relative justify-center text-base cursor-pointer active:bg-neutral-200 dark:active:bg-neutral-700 dark:hover:bg-neutral-900 hover:bg-neutral-50 gap-1 w-full outline-none focus-visible:ring-2 focus-visible:ring-border"
    >
      <span className="size-6 inline-block absolute left-5 top-1/2 -translate-1/2 dark:drop-shadow dark:drop-shadow-neutral-500 ">
        {icon}
      </span>
      <span>Continue</span>
      <span>with</span>
      <span>{name}</span>
    </button>
  );
};

export default OAuthButton;
