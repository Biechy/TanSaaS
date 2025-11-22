import { createFileRoute, redirect } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@/hooks/useMutation";
import { loginFn } from "@/server/login";
import { signupFn } from "@/server/signup";
import { Auth } from "@/components/Auth";

export const Route = createFileRoute("/login")({
  component: LoginComp,
  beforeLoad: ({ context }) => {
    if (!!context.user) {
      throw redirect({ to: "/app" });
    }
  },
});

function LoginComp() {
  const router = useRouter();

  const loginMutation = useMutation({
    fn: loginFn,
    onSuccess: async (ctx) => {
      if (!ctx.data?.error) {
        await router.invalidate();
        router.navigate({ to: "/app" });
        return;
      }
    },
  });

  const signupMutation = useMutation({
    fn: useServerFn(signupFn),
  });

  return (
    <Auth
      actionText="Login"
      status={loginMutation.status}
      onSubmit={(e) => {
        const formData = new FormData(e.target as HTMLFormElement);

        loginMutation.mutate({
          data: {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
          },
        });
      }}
      afterSubmit={
        loginMutation.data ? (
          <>
            <div className="text-red-400">{loginMutation.data.message}</div>
          </>
        ) : null
      }
    />
  );
}
