"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";

import { isEmailExist, signUpEmailAndPassword } from "@/actions/auth";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import Separator from "@/components/Separator";
import { signUpSchema } from "@/utils/auth-schema";
import constants from "@/utils/constants";
import { createClient } from "@/utils/supabase/client";
import { logErrorMessages } from "../utils/utils";
import EyeToggle from "./EyeToggle";
import SubmitButton from "./SubmitButton";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
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

  const validatedForm = signUpSchema.safeParse({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  const formError = validatedForm?.error?.format();

  const emailError = formError?.email?._errors[0]; // string | undefined
  const passwordError = formError?.password?._errors[0]; // string | undefined
  const firstNameError = formError?.firstName?._errors[0]; // string | undefined
  const lastNameError = formError?.lastName?._errors[0]; // string | undefined
  const confirmPasswordError = formError?.confirmPassword?._errors[0]; // string | undefined

  const [emailChecking, setEmailChecking] = useState(false);
  const [emailIsUsed, setEmailIsUsed] = useState(false);

  const [touchedFields, setTouchedFields] = useState<
    Record<"email" | "password" | "firstName" | "lastName" | "confirmPassword", boolean>
  >({
    email: false,
    password: false,
    firstName: false,
    lastName: false,
    confirmPassword: false,
  });

  const signUpWithValidation = async (prevState: any, formData: FormData) => {
    state.status = "";
    state.message = "";
    const formValues = {
      email: formData.get("email"),
      password: formData.get("password"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const validatedFields = signUpSchema.safeParse(formValues);

    if (!validatedFields.success) {
      return {
        status: "error",
        message: "Some fields are invalid. Please review your input and try again.",
      };
    }

    return await signUpEmailAndPassword(formData);
  };

  const [state, formAction, pending] = useActionState(signUpWithValidation, { message: "", status: "" });

  const isNotAllowedToSubmit =
    !!emailError ||
    !!passwordError ||
    !!firstNameError ||
    !!lastNameError ||
    !!confirmPasswordError ||
    emailIsUsed ||
    emailChecking ||
    pending;

  useEffect(() => {
    if (pending) {
      setError("");
    } else if (state.status === constants("STATUS_ERROR")) {
      console.log("ERROR", state.message);
      setError(`${state.message}`);
    }

    state.status = "";
    state.message = "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending]);

  const fetchEmailCheck = async () => {
    const { status } = await isEmailExist(email);

    if (status === constants("STATUS_SUCCESS")) {
      setEmailIsUsed(true);
    }
    if (status === constants("STATUS_ERROR") && emailIsUsed) {
      setEmailIsUsed(false);
    }
    setEmailChecking(false);
  };

  // debounce with 1s delay after pause type
  useEffect(() => {
    if (emailError) {
      return setEmailIsUsed(false);
    } else {
      setEmailChecking(true);
      const delay = setTimeout(() => {
        fetchEmailCheck();
      }, 1000);

      return () => {
        clearTimeout(delay);
      };
    }
  }, [email]);

  return (
    <div className="flex flex-col gap-2">
      <Separator />
      <form action={formAction} className="flex flex-col gap-y-2">
        <span data-testid="form-title" className="text-center">
          Register
        </span>
        <div className="flex gap-2">
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            autoComplete="given-name"
            maxLength={100}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFirstName(event.target.value);
              setTouchedFields((prev) => ({ ...prev, firstName: true }));
            }}
            value={firstName}
            disabled={pending}
            required
          />
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            autoComplete="family-name"
            maxLength={100}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setLastName(event.target.value);
              setTouchedFields((prev) => ({ ...prev, lastName: true }));
            }}
            value={lastName}
            disabled={pending}
          />
        </div>
        {firstNameError && touchedFields.firstName ? (
          <span className="text-sm text-red-700">{firstNameError}</span>
        ) : null}
        {lastNameError && touchedFields.lastName ? <span className="text-sm text-red-700">{lastNameError}</span> : null}
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
        {!touchedFields.email || !emailError ? null : <span className="text-sm text-red-700">{emailError}</span>}
        {!touchedFields.email || emailError ? null : emailChecking ? (
          <span className="inline-flex items-center gap-1">
            <Loader />
            <span className="text-sm">Validating your email..</span>
          </span>
        ) : emailIsUsed ? (
          <span className="text-sm">
            <span className="text-red-700">This email is already in use. </span>
            <Link href={"/sign-in"} className="text-blue-400 underline">
              Want to log in?
            </Link>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-sm">
            <svg className="size-5 fill-green-400 p-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
              <path d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01zm204.336-636.352L415.935 626.944l-135.28-135.28c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248l158.384 158.4c12.496 12.48 32.752 12.48 45.264 0c1.44-1.44 2.673-3.009 3.793-4.64l318.784-320.753c12.48-12.496 12.48-32.752 0-45.263c-12.512-12.496-32.768-12.496-45.28 0z"></path>
            </svg>
            <span className="text-green-400">Your email is valid.</span>
          </span>
        )}

        <div className="relative w-full">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            maxLength={64}
            placeholder="Password (8 or more characters)"
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
            autoComplete="new-password"
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
        <div className="flex flex-col">
          <Link href={"/forgot-password"} className="text-sm text-blue-400 underline w-fit">
            Forgot Password?
          </Link>
          <span className="text-sm">
            Already have an account?{" "}
            <Link href={"/sign-in"} className="text-blue-400 underline">
              Login
            </Link>
          </span>
        </div>

        {error ? <span className="text-red-700 text-sm">{error}</span> : null}

        <SubmitButton data-testid="submit-button" disabled={isNotAllowedToSubmit} isLoading={pending}>
          {pending ? <span>Registering</span> : <span>Register Now</span>}
        </SubmitButton>
      </form>
    </div>
  );
};

export default RegisterForm;
