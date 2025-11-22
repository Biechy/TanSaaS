import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/settings/billing")({
  loader: ({ context }) => {
    throw redirect({
      href: context.billingUrl,
    });
  },
});
