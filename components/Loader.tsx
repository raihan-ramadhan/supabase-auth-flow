import React from "react";

const Loader = React.forwardRef<SVGSVGElement, React.ComponentProps<"svg">>(({ className, ...props }, ref) => {
  return (
    <svg
      className={`size-5 animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      ref={ref}
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
        opacity=".5"
      />
      <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z" />
    </svg>
  );
});
Loader.displayName = "Loader";

export default Loader;
