import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerClient } from "@/utils/supabase";

export const fetchPlans = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = getSupabaseServerClient();
    const { data: subscription_plans, error } = await supabase
      .from("subscription_plans")
      .select("*");
    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }
    return {
      subscription_plans,
    };
  }
);
