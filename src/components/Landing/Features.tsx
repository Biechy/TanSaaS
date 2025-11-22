export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Fonctionnalités principales
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour faire croître votre business
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              title: "Analytics avancées",
              description:
                "Suivez vos métriques importantes avec des tableaux de bord personnalisables et des rapports automatisés.",
            },
            {
              title: "Intégrations",
              description:
                "Connectez-vous facilement à vos outils existants grâce à notre API robuste et nos intégrations natives.",
            },
            {
              title: "Sécurité",
              description:
                "Protection des données de niveau entreprise avec chiffrement end-to-end et conformité aux standards.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
