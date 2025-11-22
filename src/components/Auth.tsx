import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function Auth({
  actionText,
  onSubmit,
  status,
  afterSubmit,
}: {
  actionText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  status: "pending" | "idle" | "success" | "error";
  afterSubmit?: React.ReactNode;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isSignup =
    actionText.toLowerCase().includes("inscription") ||
    actionText.toLowerCase().includes("sign up");
  const isLogin =
    actionText.toLowerCase().includes("connexion") ||
    actionText.toLowerCase().includes("login");

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-gray-50 dark:bg-gray-950 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
          {isSignup ? "Inscription" : "Connexion"}
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
          className="space-y-5"
        >
          {isSignup && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Nom d’utilisateur
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:outline-none transition"
                required
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Adresse e-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Mot de passe
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="w-full px-4 py-2 pr-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:outline-none transition"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                tabIndex={-1}
              >
                {showPassword ? "Masquer" : "Afficher"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              status === "pending"
                ? "bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 cursor-not-allowed"
                : "bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200"
            }`}
            disabled={status === "pending"}
          >
            {status === "pending"
              ? "Chargement..."
              : isSignup
                ? "S'inscrire"
                : "Se connecter"}
          </button>

          {afterSubmit && (
            <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
              {afterSubmit}
            </div>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          {isSignup ? (
            <>
              Déjà un compte ?{" "}
              <Link
                to="/login"
                className="text-gray-900 dark:text-gray-100 font-medium hover:underline"
              >
                Se connecter
              </Link>
            </>
          ) : (
            <>
              Pas de compte ?{" "}
              <Link
                to="/signup"
                search={{ redirect: undefined }}
                className="text-gray-900 dark:text-gray-100 font-medium hover:underline"
              >
                S’inscrire
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
