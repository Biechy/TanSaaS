import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useMutation } from "@/hooks/useMutation";
import { deleteAccountFn } from "@/server/settings";

export const Route = createFileRoute("/_authed/settings/danger")({
  component: DangerZoneSection,
});

function DangerZoneSection() {
  const router = useRouter();
  const { user, billingUrl } = Route.useRouteContext();

  const deleteAccountMutation = useMutation({
    fn: deleteAccountFn,
    onSuccess: async (ctx) => {
      if (!ctx.data?.error) {
        alert("Compte supprimé. À bientôt !");
        router.navigate({ to: "/logout" });
      }
    },
  });

  const handleDeleteAccount = () => {
    if (confirm("Cette action est irréversible. Supprimer votre compte ?")) {
      deleteAccountMutation.mutate({});
    }
  };

  return (
    <div className="space-y-8 max-w-md">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Zone sensible
      </h1>
      {user?.plan && (
        <section className="space-y-4 p-4 border border-red-600 rounded-lg bg-red-50 dark:bg-red-900/20">
          <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">
            Résiliation du plan
          </h2>
          <p className="text-red-700 dark:text-red-300">
            Résilier votre plan mettra fin à vos abonnements et services
            payants.
          </p>
          <a
            className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors"
            href={billingUrl}
            target="_blank"
          >
            Résilier
          </a>
        </section>
      )}
      <section className="space-y-4 p-4 border border-red-600 rounded-lg bg-red-50 dark:bg-red-900/20">
        <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">
          Supprimer le compte
        </h2>
        <p className="text-red-700 dark:text-red-300">
          Cette action est irréversible et supprimera toutes vos données.
        </p>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors"
          onClick={handleDeleteAccount}
          disabled={deleteAccountMutation.status === "pending"}
        >
          {deleteAccountMutation.status === "pending"
            ? "Suppression..."
            : "Supprimer le compte"}
        </button>
      </section>
    </div>
  );
}
