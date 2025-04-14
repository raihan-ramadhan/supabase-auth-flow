import React from "react";

type FormButtonProps = {
  name: string;
  icon: React.ReactNode;
  onClick: (idx: 0 | 1) => void;
  idx: 0 | 1;
};

const FormButton = (props: FormButtonProps) => {
  const { name, icon, onClick, idx } = props;

  return (
    <button
      data-testid="form-button"
      onClick={() => onClick(idx)}
      type="button"
      className="py-3 px-1.5 rounded-2xl border border-border flex relative justify-center text-base cursor-pointer active:bg-neutral-200 hover:bg-neutral-50 gap-1 w-full dark:active:bg-neutral-700 dark:hover:bg-neutral-900 outline-none focus-visible:ring-2 focus-visible:ring-border"
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
    </button>
  );
};

export default FormButton;
