import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerClient } from "@/utils/supabase";

export const signupFn = createServerFn({ method: "POST" })
  .inputValidator(
    (d: {
      username?: string;
      email: string;
      password: string;
      redirectUrl?: string;
    }) => d
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          display_name: data.username,
        },
      },
    });
    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }

    throw redirect({
      href: data.redirectUrl || "/app",
    });
  });
