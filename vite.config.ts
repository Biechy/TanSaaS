import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";

export default defineConfig(() => {
  const hosts = (process.env.ALLOWED_HOSTS ?? "")
    .split(",")
    .map((h: string) => h.trim())
    .filter(Boolean);

  return {
    server: {
      host: "0.0.0.0",
      port: 3000,
      strictPort: true,
      allowedHosts: hosts.length > 0 ? hosts : undefined,
    },
    plugins: [
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart(),
      viteReact(),
    ],
  };
});
