"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { verifyOtp } from "../actions/auth";
import constants from "../utils/constants";
import OtpInput from "./OtpInput";
import SubmitButton from "./SubmitButton";

const OtpInputContainer = ({ token, email }: { token?: string; email: string }) => {
  const [otp, setOtp] = useState(token ? token : "");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center gap-4 items-center">
      <div className="mx-auto text-xl font-semibold">Enter OTP</div>
      <p className="text-lg font-semibold text-center max-w-sm">Enter the code sent to your email.</p>
      <OtpInput token={token} onChange={setOtp} />
      {error ? (
        <div>
          <span className="text-sm text-red-700"> {error}</span>
        </div>
      ) : null}
      <SubmitButton
        disabled={pending || otp.length < 6}
        isLoading={pending}
        onClick={() => {
          setError("");
          startTransition(async () => {
            try {
              const { message, status } = await verifyOtp({ token: otp, email });
              if (status === constants("STATUS_SUCCESS")) {
                router.push("/dashboard");
              } else {
                setError(message);
              }
            } catch (error) {
              console.error("Error verifying OTP:", error);
              setError("Something went wrong when verifyOtp");
            }
          });
        }}
      >
        {pending ? "Verifying..." : "Verify"}
      </SubmitButton>
    </div>
  );
};

export default OtpInputContainer;
