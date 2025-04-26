"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import { signOut } from "@/client/auth";
import Loader from "./Loader";

const LogoutButton = () => {
  const [pending, startTransition] = useTransition();

  const router = useRouter();

  const handleLogout = async () => {
    startTransition(async () => {
      try {
        await signOut();

        router.refresh();
      } catch (error) {
        console.log("Error signing out:", error);
      }
    });
  };

  return (
    <button className="cursor-pointer flex items-center gap-1" onClick={handleLogout}>
      {pending ? <Loader /> : null}
      Log out
    </button>
  );
};

export default LogoutButton;
