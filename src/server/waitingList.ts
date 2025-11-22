import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerClient } from "@/utils/supabase";

export const waitingListFn = createServerFn({ method: "POST" })
  .inputValidator((d: { email: string }) => d)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from("waitlist")
      .insert([{ email: data.email }]);
    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  });
