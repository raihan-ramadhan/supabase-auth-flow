import React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className="w-full rounded-2xl border border-gray-400 py-3 px-3 block"
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
