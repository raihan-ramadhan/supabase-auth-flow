import constants from "@/utils/constants";
import { createClient } from "@/utils/supabase/client";

export async function recoverPassword({ email }: { email: string }) {
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    console.log("Error in resetPasswordForEmail");
    return { status: constants("STATUS_ERROR"), message: `${error.message}` };
  }

  return {
    status: constants("STATUS_SUCCESS"),
    message: "Successfully sent password recovery email",
  };
}

export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();
  console.log("\x1b[1m\x1b[42m\x1b[37m%s\x1b[0m", "ERRTR", error);
  localStorage.clear();
  sessionStorage.clear();
  document.cookie = "";
}
