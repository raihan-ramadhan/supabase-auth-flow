"use client";

import { useActionState, useState } from "react";

import Input from "@/components/Input";
import { updatePasswordSchema } from "@/utils/auth-schema";
import { updatePassword } from "../actions/auth";
import EyeToggle from "./EyeToggle";
import SubmitButton from "./SubmitButton";

const UpdatePassword = ({ code }: { code?: string }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const validatedForm = updatePasswordSchema.safeParse({
    password,
    confirmPassword,
  });

  const formError = validatedForm?.error?.format();

  const passwordError = formError?.password?._errors[0]; // string | undefined
  const confirmPasswordError = formError?.confirmPassword?._errors[0]; // string | undefined

  const [touchedFields, setTouchedFields] = useState<Record<"password" | "confirmPassword", boolean>>({
    confirmPassword: false,
    password: false,
  });

  const updatePasswordWithValidation = async (prevState: any, formData: FormData) => {
    const formValues = {
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };
    const validatedFields = updatePasswordSchema.safeParse(formValues);

    if (!validatedFields.success) {
      return {
        status: "error",
        message: "Some fields are invalid. Please review your input and try again.",
      };
    }

    return await updatePassword(formData, code);
  };

  const [state, formAction, pending] = useActionState(updatePasswordWithValidation, {
    message: "",
    status: "",
  });

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div className="relative w-full">
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          maxLength={64}
          placeholder="New Password (8 or more characters)"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
            setTouchedFields((prev) => ({ ...prev, password: true }));
          }}
          value={password}
          disabled={pending}
          required
          className="pr-10"
        />

        <EyeToggle
          onClick={togglePasswordVisibility}
          show={showPassword}
          className="absolute top-1/2 -translate-y-1/2 right-3"
        />
      </div>
      {passwordError && touchedFields.password ? <span className="text-sm text-red-700">{passwordError}</span> : null}
      <div className="relative w-full">
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          maxLength={64}
          placeholder="Confirm Password"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(event.target.value);
            setTouchedFields((prev) => ({ ...prev, confirmPassword: true }));
          }}
          value={confirmPassword}
          disabled={pending}
          required
          className="pr-10"
        />

        <EyeToggle
          onClick={toggleConfirmPasswordVisibility}
          show={showConfirmPassword}
          className="absolute top-1/2 -translate-y-1/2 right-3"
        />
      </div>
      {confirmPasswordError && touchedFields.confirmPassword ? (
        <span className="text-sm text-red-700">Confirmation password must match the password.</span>
      ) : null}

      {state.status === "error" ? <div className="text-center text-red-700 text-sm">{state.message}</div> : null}
      <SubmitButton isLoading={pending}>
        {pending ? <span>Updating</span> : <span>Update your password</span>}
      </SubmitButton>
    </form>
  );
};
export default UpdatePassword;
