import { createFileRoute, Link } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import { useMutation } from "@/hooks/useMutation";
import { useState } from "react";
import { updateProfileFn } from "@/server/settings";

export const Route = createFileRoute("/_authed/settings/profile")({
  component: ProfileSection,
});

function ProfileSection() {
  const { user, billingUrl } = Route.useRouteContext();
  const router = useRouter();
  const profileMutation = useMutation({
    fn: updateProfileFn,
    onSuccess: async (ctx) => {
      if (!ctx.data?.error) {
        await router.invalidate();
        return;
      }
    },
  });

  const [form, setForm] = useState({
    username: user?.username,
    email: user?.email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    profileMutation.mutate({
      data: {
        username: form.username,
        email: form.email,
        id: user?.id,
      },
    });
  };
  console.log(billingUrl);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Profil
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Nom complet
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
          />
        </div>

        <button
          type="submit"
          className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          disabled={profileMutation.status === "pending"}
        >
          {profileMutation.status === "pending"
            ? "Mise à jour..."
            : "Mettre à jour"}
        </button>

        {profileMutation.data?.error && (
          <div className="text-red-500">{profileMutation.data.message}</div>
        )}
      </form>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Plan actuel
        </h2>

        {user?.plan ? (
          <div className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              Oui + {user?.plan.name}
            </span>
            <a
              href={billingUrl}
              target="_blank"
              className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Gérer
            </a>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700 bg-red-50 dark:bg-red-900/30">
            <span className="text-red-700 dark:text-red-300 font-medium">
              Aucun plan actif
            </span>
            <Link
              to="/plans"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors"
            >
              Choisir un plan
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
