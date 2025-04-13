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
      onClick={() => onClick(idx)}
      type="button"
      className="py-3 px-1.5 rounded-2xl border border-gray-400 flex relative justify-center text-base cursor-pointer active:bg-neutral-200 hover:bg-neutral-50 gap-1 w-full"
    >
      <span className="size-6 inline-block absolute left-5 top-1/2 -translate-1/2 ">{icon}</span>
      <span>Continue</span>
      <span>with</span>
      <span>{name}</span>
    </button>
  );
};

export default FormButton;
