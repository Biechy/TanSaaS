import { createFileRoute } from "@tanstack/react-router";
import { fetchPlans } from "@/server/plans";
import { Plans } from "@/components/Landing";

export const Route = createFileRoute("/plans")({
  component: PlansComp,
  loader: async () => {
    const plans = await fetchPlans();
    return { plans };
  },
});

function PlansComp() {
  const { user } = Route.useRouteContext();
  const { plans } = Route.useLoaderData();
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Plans plans={plans.subscription_plans} user={user} />
    </div>
  );
}
