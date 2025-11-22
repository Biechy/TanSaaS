import { createFileRoute, useSearch, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@/hooks/useMutation";
import { Auth } from "@/components/Auth";
import { signupFn } from "@/server/signup";

export const Route = createFileRoute("/signup")({
  component: SignupComp,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect:
        typeof search.redirect === "string" ? search.redirect : undefined,
    };
  },
  beforeLoad: ({ context }) => {
    if (!!context.user) {
      throw redirect({ to: "/app" });
    }
  },
});

function SignupComp() {
  const signupMutation = useMutation({
    fn: useServerFn(signupFn),
  });

  const { redirect } = useSearch({ from: "/signup" });

  return (
    <Auth
      actionText="Sign Up"
      status={signupMutation.status}
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const redirectUrl = redirect
          ? `${redirect}?prefilled_email=${encodeURIComponent(email)}`
          : undefined;

        signupMutation.mutate({
          data: {
            username,
            email,
            password,
            redirectUrl,
          },
        });
      }}
      afterSubmit={
        signupMutation.data?.error ? (
          <>
            <div className="text-red-400">{signupMutation.data.message}</div>
          </>
        ) : null
      }
    />
  );
}
