export function Plans({
  plans,
  user,
}: {
  plans: any[] | undefined;
  user: {
    username: any;
    email: string;
    id: string;
    plan: any;
  } | null;
}) {
  return (
    <section
      id="pricing"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Tarification simple
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Choisissez le plan qui vous convient
          </p>
        </div>

        <div
          className={`grid gap-8 max-w-5xl mx-auto ${
            plans && plans.length === 1
              ? "md:grid-cols-1"
              : plans && plans.length === 2
                ? "md:grid-cols-2"
                : plans && plans.length === 4
                  ? "md:grid-cols-4"
                  : "md:grid-cols-3"
          }`}
        >
          {plans?.map((plan) => {
            const href = user?.plan
              ? process.env.STRIPE_BILLING_URL
              : user
                ? `${plan.stripe_price_url}?prefilled_email=${encodeURIComponent(
                    user.email
                  )}`
                : `/signup?redirect=${encodeURIComponent(plan.stripe_price_url)}`;

            const isPopular =
              plan.name?.toLowerCase().includes("pro") ||
              plan.name?.toLowerCase().includes("professional");

            return (
              <div
                key={plan.id}
                className={`relative p-8 rounded-2xl border transition-all ${
                  isPopular
                    ? "bg-gray-50 dark:bg-gray-950 border-gray-900 dark:border-gray-100 scale-105"
                    : "bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 px-4 py-1 rounded-full text-sm font-medium">
                    Recommandé
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {plan.description}
                  </p>
                  <div className="text-5xl font-bold mb-2">
                    {plan.price_amount / 100}€
                    <span className="text-lg text-gray-600 dark:text-gray-400 font-normal">
                      /{plan.billing_interval ?? "mois"}
                    </span>
                  </div>
                </div>

                {Array.isArray(plan.features) && (
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-center">
                        <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <a
                  href={href}
                  className={`block text-center w-full py-4 rounded-lg font-medium transition-colors ${
                    isPopular
                      ? "bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200"
                      : "border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  Choisir ce plan
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
