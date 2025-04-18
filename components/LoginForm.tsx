"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";

import FormButton from "./FormButton";
import { Input } from "./Input";
import Separator from "./Separator";

export const providers: {
  provider_name: string;
  icon: React.ReactNode;
  idx: 0 | 1;
}[] = [
  {
    idx: 0,
    provider_name: "Magic Link",
    icon: (
      <svg className="size-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.99999 1C8.99999 0.447715 8.55228 0 7.99999 0C7.44771 0 6.99999 0.447715 6.99999 1V1.5C6.99999 2.05228 7.44771 2.5 7.99999 2.5C8.55228 2.5 8.99999 2.05228 8.99999 1.5V1ZM3.7071 2.29289C3.31657 1.90237 2.68341 1.90237 2.29288 2.29289C1.90236 2.68342 1.90236 3.31658 2.29288 3.70711L3.29288 4.70711C3.68341 5.09763 4.31657 5.09763 4.7071 4.70711C5.09762 4.31658 5.09762 3.68342 4.7071 3.29289L3.7071 2.29289ZM13.7071 3.70711C14.0976 3.31658 14.0976 2.68342 13.7071 2.29289C13.3166 1.90237 12.6834 1.90237 12.2929 2.29289L11.2929 3.29289C10.9024 3.68342 10.9024 4.31658 11.2929 4.70711C11.6834 5.09763 12.3166 5.09763 12.7071 4.70711L13.7071 3.70711ZM1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9H1.5C2.05228 9 2.5 8.55228 2.5 8C2.5 7.44772 2.05228 7 1.5 7H1ZM15 7C14.4477 7 14 7.44772 14 8C14 8.55228 14.4477 9 15 9H15.5C16.0523 9 16.5 8.55228 16.5 8C16.5 7.44772 16.0523 7 15.5 7H15ZM4.70711 12.7071C5.09763 12.3166 5.09763 11.6834 4.70711 11.2929C4.31658 10.9024 3.68342 10.9024 3.29289 11.2929L2.29289 12.2929C1.90237 12.6834 1.90237 13.3166 2.29289 13.7071C2.68342 14.0976 3.31658 14.0976 3.70711 13.7071L4.70711 12.7071ZM9 15C9 14.4477 8.55228 14 8 14C7.44772 14 7 14.4477 7 15V15.5C7 16.0523 7.44772 16.5 8 16.5C8.55228 16.5 9 16.0523 9 15.5V15ZM9.41421 4.99998C8.63316 4.21894 7.36683 4.21894 6.58579 4.99998L5 6.58577C4.21895 7.36682 4.21895 8.63315 5 9.4142L7.29289 11.7071L18.5858 23C19.3668 23.781 20.6332 23.781 21.4142 23L23 21.4142C23.781 20.6331 23.781 19.3668 23 18.5858L11.7071 7.29288L9.41421 4.99998ZM6.41421 7.99998L8 6.4142L9.58579 7.99998L8 9.58577L6.41421 7.99998ZM9.41421 11L11 9.4142L21.5858 20L20 21.5858L9.41421 11Z"
          fill="#000000"
        />
      </svg>
    ),
  },

  {
    idx: 1,
    provider_name: "Email And Password",
    icon: (
      <svg className="size-full" xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24">
        <path d="M22,5V9L12,13,2,9V5A1,1,0,0,1,3,4H21A1,1,0,0,1,22,5ZM2,11.154V19a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V11.154l-10,4Z" />
      </svg>
    ),
  },
];

const LoginForm = () => {
  const [index, setIndex] = useState<0 | 1>(0);

  const setProvider = useCallback(
    (idx: 0 | 1) => {
      setIndex(idx);
    },
    [setIndex]
  );

  const CurrentProvider = useMemo(() => {
    return providers
      .filter((provider) => provider.idx !== index)
      .map((provider) => (
        <FormButton
          key={provider.idx}
          idx={provider.idx}
          onClick={setProvider}
          icon={provider.icon}
          name={provider.provider_name}
        />
      ));
  }, [index, setProvider]);

  return (
    <div className="flex flex-col gap-3">
      {CurrentProvider}
      <Separator />
      <form action="" className="flex flex-col gap-y-2">
        <span data-testid="form-title">{providers[index].provider_name}</span>
        <Input type="text" placeholder="Email" />
        {index === 1 ? (
          <>
            <Input type="text" placeholder="Password" />
            <div className="flex flex-col">
              <Link href={"/forgot-password"} className="text-sm text-blue-400 underline w-fit">
                Forgot Password?
              </Link>
              <span className="text-sm">
                Don't have an account?{" "}
                <Link href={"/register"} className="text-blue-400 underline">
                  Sign Up
                </Link>
              </span>
            </div>
          </>
        ) : null}
        <button
          data-testid="submit-button"
          type="submit"
          className="bg-blue-400 text-background w-full py-3 px-1.5 rounded-2xl block cursor-pointer active:bg-blue-400/80 hover:bg-blue-400/95 font-bold outline-none focus-visible:ring-2 focus-visible:ring-border"
        >
          {index === 0 ? "Send Link" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
