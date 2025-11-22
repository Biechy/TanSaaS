export function HeroSection() {
  return (
    <section className="pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-800 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Nouveau : Version 2.0 disponible
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Votre solution
              <span className="block text-gray-600 dark:text-gray-400">
                SaaS moderne
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-lg">
              Une plateforme complète et intuitive pour gérer votre business.
              Simplifiez vos processus et automatisez vos tâches répétitives.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                Essai gratuit 14 jours
              </button>
              <button className="border border-gray-300 dark:border-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                Voir la démonstration
              </button>
            </div>

            <div className="mt-8 text-sm text-gray-500 dark:text-gray-600">
              Aucune carte de crédit requise
            </div>
          </div>

          <div className="relative">
            <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 border">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Dashboard principal
                  </span>
                  <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                    En ligne
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-2xl font-bold mb-1">2,847</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Utilisateurs actifs
                    </div>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-2xl font-bold mb-1">€12.5k</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Revenus mensuels
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Objectif mensuel
                    </span>
                    <span>68%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                    <div className="bg-gray-900 dark:bg-gray-100 h-2 rounded-full w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
