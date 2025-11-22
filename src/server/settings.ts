import {
  getAdminSupabaseServerClient,
  getSupabaseServerClient,
} from "@/utils/supabase";
import { createServerFn } from "@tanstack/react-start";
import Stripe from "stripe";

export const updateProfileFn = createServerFn({ method: "POST" })
  .inputValidator((d: { email?: string; username?: string; id?: string }) => d)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.auth.updateUser({
      email: data.email,
      data: {
        display_name: data.username,
      },
    });

    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }

    const { error: error_ } = await supabase
      .from("users")
      .update({
        email: data.email,
        display_name: data.username,
      })
      .eq("id", data.id)
      .select();

    if (error_) {
      return {
        error: true,
        message: error_.message,
      };
    }
    return {
      error: false,
      message: "Compte mis à jour avec succès",
    };
  });

export const updatePasswordFn = createServerFn({ method: "POST" })
  .inputValidator((d: { newPassword: string }) => d)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();

    const { error } = await supabase.auth.updateUser({
      password: data.newPassword,
    });

    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }

    return {
      error: false,
      message: "Mot de passe mis à jour avec succès",
    };
  });

export const deleteAccountFn = createServerFn({ method: "POST" }).handler(
  async () => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const supabase = getSupabaseServerClient();
    const supabaseAdmin = getAdminSupabaseServerClient();

    const { data, error: _error } = await supabase.auth.getUser();
    if (!data.user?.id) {
      return { error: true, message: _error?.message };
    }

    const { data: userRow } = await supabase
      .from("user_subscriptions")
      .select("user_stripe_id")
      .eq("user_id", data.user.id)
      .single();

    if (userRow?.user_stripe_id) {
      try {
        await stripe.customers.del(userRow.user_stripe_id);
      } catch (err: any) {
        console.error("Erreur suppression Stripe:", err);
      }
    }

    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.user.id);
    if (error) {
      return { error: true, message: error.message };
    }

    return { error: false, message: "Compte supprimé" };
  }
);
