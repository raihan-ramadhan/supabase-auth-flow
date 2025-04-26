"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { recoverPassword } from "@/client/auth";
import Input from "@/components/Input";
import { emailSchema } from "@/utils/auth-schema";
import constants from "../utils/constants";
import SubmitButton from "./SubmitButton";

const RecoverPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");

  const validatedForm = emailSchema.safeParse({
    email,
  });

  const formError = validatedForm?.error?.format();

  const emailError = formError?.email?._errors[0]; // string | undefined

  const [touchedFields, setTouchedFields] = useState<Record<"email", boolean>>({
    email: false,
  });

  const recoverPasswordWithValidation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const formValues = {
      email: formData.get("email"),
    };
    const validatedFields = emailSchema.safeParse(formValues);

    if (!validatedFields.success) {
      setError("Some fields are invalid. Please review your input and try again.");
    }

    startTransition(async () => {
      try {
        const res = await recoverPassword({ email });

        if (res.status === constants("STATUS_SUCCESS")) {
          router.push(`/recovery-password-sent`);
        } else {
          setError(res.message);
        }
      } catch (error) {
        setError(`Error in recoverPassword: ${error}`);
      }
    });
  };

  return (
    <form onSubmit={recoverPasswordWithValidation} className="space-y-4">
      <Input
        id="email"
        name="email"
        type="email"
        maxLength={320}
        placeholder="Email Address"
        autoComplete="email"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value);
          setTouchedFields((prev) => ({ ...prev, email: true }));
        }}
        value={email}
        disabled={pending}
        required
      />
      {!!emailError && touchedFields.email ? (
        <div className="text-center text-red-700 text-sm">{emailError}</div>
      ) : null}

      {!!error ? <div className="text-center text-red-700 text-sm">{error}</div> : null}

      <SubmitButton isLoading={pending}>
        {pending ? <span>Resetting</span> : <span>Reset your password</span>}
      </SubmitButton>
    </form>
  );
};
export default RecoverPassword;
