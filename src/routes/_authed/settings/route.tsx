import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const getBillingUrl = createServerFn().handler(() => {
  return process.env.STRIPE_BILLING_URL!;
});

export const Route = createFileRoute("/_authed/settings")({
  component: SettingsLayout,
  beforeLoad: async ({ context }) => {
    const url = await getBillingUrl();
    return {
      ...context,
      billingUrl: url + "?prefilled_email=" + context.user?.email,
    };
  },
});

function SettingsLayout() {
  const tabs = [
    { id: "profile", label: "Compte", to: "/settings/profile" },
    { id: "security", label: "Mot de passe", to: "/settings/security" },
    { id: "billing", label: "Facturation", to: "/settings/billing" },
    {
      id: "danger",
      label: "Zone sensible",
      to: "/settings/danger",
      danger: true,
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <aside className="lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Paramètres
                </h2>
              </div>

              <nav className="p-3 space-y-1">
                {tabs.map((tab) => (
                  <Link
                    key={tab.id}
                    to={tab.to}
                    activeProps={{
                      className: tab.danger
                        ? "bg-red-600 text-white font-medium dark:bg-red-500 hover:bg-red-600"
                        : "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-900 dark:hover:bg-gray-100",
                    }}
                    inactiveProps={{
                      className: tab.danger
                        ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                    }}
                    className="block px-4 py-2.5 rounded-lg transition-colors"
                  >
                    {tab.label}
                  </Link>
                ))}
              </nav>
            </aside>

            <main className="flex-1 p-6 lg:p-10">
              <div className="bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6 min-h-[400px]">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}
