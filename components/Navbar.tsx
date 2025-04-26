import React from "react";
import Link from "next/link";

import { getUserProfiles } from "../actions/user_profiles";
import Avatar from "./Avatar";
import LogoutButton from "./LogoutButton";

const Navbar = async () => {
  const { data } = await getUserProfiles();
  return (
    <nav className="fixed top-0 inset-x-0 w-full bg-neutral-200 dark:bg-neutral-800 h-[50px] flex justify-between items-center px-5">
      <ul>
        {data ? (
          <li>
            <Link href={"/dashboard"} className="cursor-pointer">
              Dashboard
            </Link>
          </li>
        ) : (
          <li>{null}</li>
        )}
      </ul>
      <ul className="flex gap-4">
        {data ? (
          <>
            <li>
              <Link href={"/upgrade"} className="cursor-pointer">
                Upgrade
              </Link>
            </li>
            <li>
              <Avatar displayName={data.display_name ?? data.email} avatarUrl={data.avatar_url ?? undefined} />
            </li>
            <li>
              <span>{data.display_name ?? data.email}</span>
            </li>
            <li>
              <LogoutButton />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={"/sign-in"}>Sign In</Link>
            </li>
            <li>
              <Link href={"/sign-up"}>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
