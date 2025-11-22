import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/app")({
  beforeLoad: ({ context }) => {
    if (!context?.user?.plan) {
      throw redirect({ to: "/plans" });
    }
  },
});
