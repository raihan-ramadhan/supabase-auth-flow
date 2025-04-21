"use client";

import React from "react";
import { useRouter } from "next/navigation";

const BackButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<"span">>(
  ({ className, children, ...props }, ref) => {
    const router = useRouter();

    return (
      <span
        className={`bg-transparent cursor-pointer inline-block ${className}`}
        ref={ref}
        onClick={() => router.back()}
        {...props}
      >
        {children}
      </span>
    );
  }
);
BackButton.displayName = "BackButton";

export default BackButton;
