import { createFileRoute } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import { useMutation } from "@/hooks/useMutation";
import { useState } from "react";
import { updatePasswordFn } from "@/server/settings";

export const Route = createFileRoute("/_authed/settings/security")({
  component: SecuritySection,
});

function SecuritySection() {
  const router = useRouter();
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const passwordMutation = useMutation({
    fn: updatePasswordFn,
    onSuccess: async (ctx) => {
      if (!ctx.data?.error) {
        await router.navigate({ to: "/logout" });
        return;
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    passwordMutation.mutate({
      data: {
        newPassword: form.newPassword,
      },
    });
  };

  return (
    <div className="space-y-6 max-w-md">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Sécurité
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          disabled={passwordMutation.status === "pending"}
        >
          {passwordMutation.status === "pending"
            ? "Modification..."
            : "Changer le mot de passe"}
        </button>

        {passwordMutation.data?.error && (
          <div className="text-red-500">{passwordMutation.data.message}</div>
        )}
      </form>
    </div>
  );
}
