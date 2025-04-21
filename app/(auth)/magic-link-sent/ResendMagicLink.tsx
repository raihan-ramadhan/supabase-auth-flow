"use client";

import { useActionState, useEffect, useState } from "react";

import { resendMagicLink } from "@/actions/auth";
import constants from "@/utils/constants";

export default function ResendMagicLinkButton({ email }: { email: string }) {
  const initialCount = 60;
  const [timeLeft, setTimeLeft] = useState<number>(initialCount);
  const btnId = "sendLink";
  const initialState = {
    message: "",
    status: "",
  };

  const [state, formAction, pending] = useActionState(resendMagicLink.bind(null, email), initialState);

  useEffect(() => {
    if (pending) {
      setTimeLeft(initialCount); //start countdown again
    } else {
      if (state.status === constants("STATUS_SUCCESS")) {
        alert(`${constants("STATUS_SUCCESS")} Magic link sudah dikirim lagi ke email kamu.`);
      } else if (state.status === constants("STATUS_ERROR")) {
        alert(`ERROR`);
      }
    }

    state.status = "";
    state.message = "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending]);

  useEffect(() => {
    if (timeLeft === 0) return;
    // Stop when the countdown hits 0

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000); // Update every second

    // Cleanup function to clear the timer if the component unmounts
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <form action={formAction}>
      <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 flex-wrap mx-auto w-fit">
        Didn&apos;t receive an email?
        <button
          type="submit"
          id={btnId}
          disabled={timeLeft !== 0 || pending}
          className={`transition-all duration-200 underline font-medium ${
            timeLeft === 0 && !pending
              ? "text-blue-600 hover:text-blue-500 cursor-pointer"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          {pending ? "Sending..." : timeLeft === 0 ? "Resend Magic Link" : `Wait ${timeLeft}s`}
        </button>
      </div>

      {/* Optional feedback */}
      {state.status === constants("STATUS_SUCCESS") && (
        <p className="text-green-500 text-sm mt-1">✅ Magic link sent!</p>
      )}
      {state.status === constants("STATUS_ERROR") && (
        <p className="text-red-500 text-sm mt-1">❌ {state.message || "Failed to send magic link"}</p>
      )}
    </form>
  );
}
