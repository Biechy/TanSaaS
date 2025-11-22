export function SocialProofs() {
  return (
    <section
      className="py-16 border-t border-b bg-gray-100 dark:bg-gray-900"
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Ils nous font confiance
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
            {[
              "Company A",
              "Company B",
              "Company C",
              "Company D",
              "Company E",
              "Company F",
            ].map((company, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {company.split(" ")[0][0]}
                    {company.split(" ")[1][0]}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-600">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            { metric: "10,000+", label: "Utilisateurs actifs" },
            { metric: "99.9%", label: "Temps de disponibilité" },
            { metric: "24/7", label: "Support client" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {stat.metric}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
