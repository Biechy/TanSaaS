import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation } from "@/hooks/useMutation";
import { useServerFn } from "@tanstack/react-start";
import { waitingListFn } from "@/server/waitingList";

export function Conversion({ waitingList }: { waitingList: boolean }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const serverFn = useServerFn(waitingListFn);
  const waitingListMutation = useMutation({
    fn: async (data: { email: string }) => {
      return await serverFn({ data });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email) {
      setMessage("Veuillez entrer un email.");
      return;
    }

    const result = await waitingListMutation.mutate({ email });

    if (result?.error) {
      setMessage("Oups, un bug... Veuillez réessayer plus tard !");
    } else {
      setMessage("Merci ! Vous êtes bien inscrit sur la liste d’attente 🎉");
      setEmail("");
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="conversion">
      {waitingList ? (
        <div className="max-w-4xl mx-auto text-center">
          <div className="border border-gray-200 dark:border-gray-800 rounded-3xl p-12 bg-gray-100 dark:bg-gray-900">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Rejoignez la liste d'attente
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Soyez parmi les premiers à découvrir notre plateforme.
            </p>

            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@exemple.com"
                className="flex-1 px-4 py-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={waitingListMutation.status === "pending"}
                className="relative bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span
                  className={
                    waitingListMutation.status === "pending" ? "invisible" : ""
                  }
                >
                  Rejoindre
                </span>
                {waitingListMutation.status === "pending" && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    ...
                  </span>
                )}
              </button>
            </form>

            {message && (
              <p className="text-sm mt-4 text-gray-600 dark:text-gray-400">
                {message}
              </p>
            )}

            <p className="text-sm text-gray-500 dark:text-gray-600 mt-6">
              Accès anticipé • Aucun spam • Se désinscrire à tout moment
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto text-center">
          <div className="border border-gray-200 dark:border-gray-800 rounded-3xl p-12 bg-gray-50 dark:bg-gray-900">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Créez votre compte dès maintenant
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Rejoignez la plateforme et commencez dès aujourd’hui.
            </p>

            <Link
              to="/signup"
              search={{ redirect: undefined }}
              className="inline-block bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              S'inscrire maintenant
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
