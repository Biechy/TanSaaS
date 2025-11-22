import { getSupabaseServerClient } from "@/utils/supabase";
import { createServerFn } from "@tanstack/react-start";
import { getCookies, setCookie } from "@tanstack/react-start/server";

export const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServerClient();
  const { data, error: _error } = await supabase.auth.getUser();

  if (!data.user?.email || !data.user?.id) {
    return null;
  }

  const { data: userPlan, error: planError } = await supabase
    .from("user_subscriptions")
    .select("subscription_plan_id")
    .eq("user_id", data.user.id)
    .eq("status", "active")
    .single();

  return {
    username: data.user.user_metadata.display_name,
    email: data.user.email,
    id: data.user.id,
    plan: userPlan?.subscription_plan_id || null,
  };
});

export const createCookie = createServerFn({ method: "POST" }).handler(
  async () => {
    const value = crypto.randomUUID();
    setCookie("visitor_id", value, {
      maxAge: 60 * 60 * 24 * 365 * 2, // 2 years
    });

    return value;
  }
);

export const fetchCookies = createServerFn({ method: "GET" }).handler(
  async () => {
    const cookies = Object.entries(getCookies()).map(([name, value]) => ({
      name,
      value,
    }));

    return {
      cookies,
    };
  }
);

export const trackCookie = createServerFn({
  method: "POST",
})
  .inputValidator(
    (d: { page_url: string; visitor_id: string; user_id: string | null }) => d
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("tracker").insert({
      page_url: data.page_url,
      visitor_id: data.visitor_id,
      user_id: data.user_id,
    });
    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  });
