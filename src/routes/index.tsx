import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import {
  HeroSection,
  Navigation,
  SocialProofs,
  Features,
  Plans,
  Conversion,
} from "@/components/Landing";
import { fetchPlans } from "@/server/plans";

const getWaitingList = createServerFn().handler(() => {
  return process.env.WAITLIST! === "true";
});

export const Route = createFileRoute("/")({
  component: LandingPage,
  loader: async () => {
    const waitingList = await getWaitingList();
    const plans = await fetchPlans();
    return { waitingList, plans };
  },
});

function LandingPage() {
  const { user } = Route.useRouteContext();
  const { waitingList, plans } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-200">
      <Navigation waitingList={waitingList} user={!!user} />
      <HeroSection />
      <SocialProofs />
      <Features />
      <Plans plans={plans.subscription_plans} user={user} />
      {!user && <Conversion waitingList={waitingList} />}
    </div>
  );
}
