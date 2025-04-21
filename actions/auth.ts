"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Provider } from "@supabase/supabase-js";

import { ActionResponse } from "@/types/global";
import { emailAndPasswordSchema, emailSchema, signUpSchema, updatePasswordSchema } from "@/utils/auth-schema";
import constants from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";
import { logErrorMessages } from "@/utils/utils";

export async function getUserSession() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return null;
  }

  return {
    status: constants("STATUS_SUCCESS"),
    user: data.user,
  };
}

export async function signInWithOAuth(provider_name: Provider) {
  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider_name,
    options: {
      redirectTo: `${origin}/oauth?next=/dashboard`,
    },
  });

  if (error) {
    redirect(`/auth-error?message=${error.message}`);
  }

  redirect(data.url);
}

export async function sendMagicLink(formData: FormData) {
  const validatedFields = emailSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      status: constants("STATUS_ERROR"),
      message: `${logErrorMessages(
        validatedFields.error.flatten().fieldErrors as {
          string: string[];
        }
      )}`,
    };
  }

  const { email } = validatedFields.data;
  const supabase = await createClient();
  const { data: existingUser } = await supabase.rpc(constants("IS_EMAIL_EXIST_FUNCTION__NAME"), { email });
  const { error } = await supabase.auth.signInWithOtp({ email });

  if (error) {
    return {
      status: constants("STATUS_ERROR"),
      message: error.message,
    };
  }

  if (existingUser) {
    return redirect(`/magic-link-sent?email=${email}`);
  }

  return redirect(`/verify?email=${email}`);
}

export async function signInEmailAndPassword(formData: FormData) {
  const formValues = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedFields = emailAndPasswordSchema.safeParse(formValues);
  if (!validatedFields.success) {
    return {
      status: constants("STATUS_ERROR"),
      message: `${logErrorMessages(
        validatedFields.error.flatten().fieldErrors as {
          string: string[];
        }
      )}`,
    };
  }

  const { email, password } = validatedFields.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    switch (error.code) {
      case "email_not_confirmed":
        await supabase.auth.resend({
          type: "signup",
          email,
        });

        redirect(`/verify?email=${email}`);
      case "invalid_credentials":
        return {
          status: constants("STATUS_ERROR"),
          message: "The email or password you entered is incorrect. Please try again.",
        };
      default:
        return {
          status: constants("STATUS_ERROR"),
          message: "Something went wrong: " + error.message,
        };
    }
  }

  redirect("/dashboard");
}

export async function signUpEmailAndPassword(formData: FormData) {
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
      status: constants("STATUS_ERROR"),
      message: `${logErrorMessages(
        validatedFields.error.flatten().fieldErrors as {
          string: string[];
        }
      )}`,
    };
  }

  const { email, password, firstName, lastName } = validatedFields.data;
  const supabase = await createClient();

  const { data: existingUser } = await supabase.rpc(constants("IS_EMAIL_EXIST_FUNCTION__NAME"), {
    email,
  });

  if (existingUser) {
    return {
      status: constants("STATUS_ERROR"),
      message: "user already exists, Try logging in with magic link or reset password",
    };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    return { status: constants("STATUS_ERROR"), message: error.message };
  }

  return redirect(`/verify?email=${email}`);
}

export async function resendMagicLink(email: string): Promise<ActionResponse> {
  if (!email) return { status: constants("STATUS_ERROR"), message: "There is something wrong with payload" };

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({ email });

  if (error) {
    return { status: constants("STATUS_ERROR"), message: error.message };
  }
  return { status: constants("STATUS_SUCCESS"), message: "" };
}

export async function verifyOtp({ token, email }: { token: string; email: string }) {
  if (!token || !email)
    return { status: constants("STATUS_ERROR"), message: "Invalid request: missing token or email." };

  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({ token, type: "email", email });

  if (error) {
    return { status: constants("STATUS_ERROR"), message: error.message };
  }

  return { status: constants("STATUS_SUCCESS"), message: "" };
}

export async function updatePassword(formData: FormData, code?: string) {
  const formValues = {
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const validatedFields = updatePasswordSchema.safeParse(formValues);
  if (!validatedFields.success) {
    return {
      status: constants("STATUS_ERROR"),
      message: `${logErrorMessages(
        validatedFields.error.flatten().fieldErrors as {
          string: string[];
        }
      )}`,
    };
  }

  const { password: new_password } = validatedFields.data;
  const supabase = await createClient();

  if (!code) return { status: constants("STATUS_ERROR"), message: "Code session is missing" };

  const { error: exchangeCodeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeCodeError) {
    return { status: constants("STATUS_ERROR"), message: exchangeCodeError.message };
  }

  const { error } = await supabase.auth.updateUser({ password: new_password });

  if (error) {
    return { status: constants("STATUS_ERROR"), message: error.message };
  }

  redirect("/dashboard");
}

export async function isEmailExist(email: string) {
  if (!email) return { status: constants("STATUS_ERROR"), message: "There is something wrong with payload" };

  const supabase = await createClient();
  const { data: existingUser, error } = await supabase.rpc(constants("IS_EMAIL_EXIST_FUNCTION__NAME"), { email });

  if (error) {
    return {
      status: constants("STATUS_ERROR"),
      message: error.message,
    };
  }

  if (existingUser) {
    return {
      status: constants("STATUS_SUCCESS"),
      message: "user already exists, Try logging in with magic link or reset password",
    };
  }

  return {
    status: constants("STATUS_ERROR"),
    messsgae: "User does not exist",
  };
}
