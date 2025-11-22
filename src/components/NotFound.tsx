import { Link } from "@tanstack/react-router";

export function NotFound({ children }: { children?: React.ReactNode }) {
  return (
    <section className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-800 mb-6">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Erreur 404 — Page introuvable
          </span>
        </div>

        <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Oups&nbsp;!
          <span className="block text-gray-600 dark:text-gray-400">
            Cette page n’existe pas
          </span>
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-lg mx-auto">
          {children || (
            <>
              La page que vous recherchez a peut-être été supprimée, déplacée,
              ou n’a jamais existé. Revenez en arrière ou retournez à l’accueil.
            </>
          )}
        </p>

        {/* Boutons d’action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Retour
          </button>
          <Link
            to="/"
            className="border border-gray-300 dark:border-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            Accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
