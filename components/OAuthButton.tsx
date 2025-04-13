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
      className="py-3 px-1.5 rounded-2xl border border-gray-400 flex relative justify-center text-base cursor-pointer active:bg-neutral-200 hover:bg-neutral-50 gap-1 w-full"
    >
      <span className="size-6 inline-block absolute left-5 top-1/2 -translate-1/2 ">
        {icon}
      </span>
      <span>Continue</span>
      <span>with</span>
      <span>{name}</span>
    </button>
  );
};

export default OAuthButton;
