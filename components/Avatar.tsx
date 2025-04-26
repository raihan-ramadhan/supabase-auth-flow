import React from "react";
import Image from "next/image";

const Avatar = React.forwardRef<
  HTMLImageElement,
  { className?: string; avatarUrl?: string; displayName: string; title?: string }
>(({ className, displayName, avatarUrl, title, ...props }, ref) => {
  return !!avatarUrl && avatarUrl?.length > 0 ? (
    <Image
      ref={ref}
      width={28}
      height={28}
      className={`size-[28px] overflow-hidden bg-white rounded-full shrink-0 ${className || ""}`}
      src={avatarUrl}
      alt={displayName}
      title={title ?? displayName}
      {...props}
    />
  ) : (
    <div className="size-7 bg-blue-500 rounded-full flex justify-center items-center">
      {displayName[0].toUpperCase()}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;
