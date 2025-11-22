import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import { json, createServerFn } from "@tanstack/react-start";
import { getSupabaseServerClient } from "@/utils/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const subscriptionFn = createServerFn({ method: "POST" })
  .inputValidator(
    (d: {
      email: string;
      priceId: string;
      subscriptionId: string;
      customerId: string;
    }) => d
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();

    const { data: plan, error: planError } = await supabase
      .from("subscription_plans")
      .select("id")
      .eq("stripe_price_id", data.priceId)
      .single();

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", data.email)
      .single();

    const { error: subError } = await supabase
      .from("user_subscriptions")
      .upsert(
        {
          user_id: user?.id,
          user_stripe_id: data.customerId,
          subscription_plan_id: plan?.id,
          stripe_subscription_id: data.subscriptionId,
          status: "active",
          canceled_at: null,
        },
        { onConflict: "user_id" }
      );
    if (subError || userError || planError) {
      const err = subError ?? userError ?? planError;
      return {
        error: true,
        message: err?.message,
      };
    }
    return { success: true };
  });

export const deletedSubscriptionFn = createServerFn({ method: "POST" })
  .inputValidator((d: { subscriptionId: string }) => d)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();

    const { error: subError } = await supabase
      .from("user_subscriptions")
      .update({ status: "canceled", canceled_at: new Date().toISOString() })
      .eq("stripe_subscription_id", data.subscriptionId);
    if (subError) {
      return {
        error: true,
        message: subError?.message,
      };
    }
    return { success: true };
  });

export const Route = createFileRoute("/api/stripe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const signature = request.headers.get("stripe-signature")!;
        let event: Stripe.Event;

        try {
          event = stripe.webhooks.constructEvent(
            await request.text(),
            signature,
            endpointSecret
          );
        } catch (err) {
          console.error("Webhook signature verification failed.", err);
          return new Response("Webhook signature verification failed.", {
            status: 400,
          });
        }

        switch (event.type) {
          case "checkout.session.completed":
            const session = event.data.object as Stripe.Checkout.Session;
            const subscriptionField = session.subscription;
            let subscriptionId: string | undefined;
            if (typeof subscriptionField === "string") {
              subscriptionId = subscriptionField;
            } else if (
              subscriptionField &&
              typeof subscriptionField === "object"
            ) {
              subscriptionId = subscriptionField.id;
            }
            const userEmail = session.customer_details?.email;
            const lineItems = await stripe.checkout.sessions.listLineItems(
              session.id,
              {
                limit: 1,
              }
            );
            const priceId = lineItems.data[0].price?.id;
            const customerId = session.customer as string;

            if (!subscriptionId || !userEmail || !priceId || !customerId) {
              console.error(
                "Missing subscriptionId, userEmail, priceId or customerId, aborting."
              );
              break;
            }
            await subscriptionFn({
              data: {
                email: userEmail,
                priceId,
                subscriptionId,
                customerId,
              },
            });
            break;
          case "customer.subscription.deleted":
            const subscription = event.data.object as Stripe.Subscription;
            console.log("Subscription deleted:", subscription.id);
            await deletedSubscriptionFn({
              data: {
                subscriptionId: subscription.id,
              },
            });
            break;
          default:
            console.log(`Unhandled event type ${event.type}`);
        }
        return json({ received: true });
      },
    },
  },
});
