import React from "react";

import Loader from "@/components/Loader";

const SubmitButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    isLoading: boolean;
  }
>(({ className, type, isLoading, children, ...props }, ref) => {
  return (
    <button
      type="submit"
      className="bg-blue-400 text-background w-full py-3 px-1.5 rounded-2xl block cursor-pointer active:bg-blue-400/80 hover:bg-blue-400/95 font-bold disabled:opacity-50 disabled:cursor-auto flex-row justify-center"
      ref={ref}
      {...props}
    >
      <span className="flex items-center justify-center gap-x-1">
        {isLoading ? (
          <span className="flex items-center justify-center gap-x-1">
            <Loader />
          </span>
        ) : null}
        {children}
      </span>
    </button>
  );
});
SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
