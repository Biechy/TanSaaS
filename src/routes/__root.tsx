/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import { DefaultCatchBoundary } from "../components/DefaultCatchBoundary";
import { NotFound } from "../components/NotFound";
import appCss from "@/styles/app.css?url";
import { seo } from "@/utils/seo";
import { RealtimePresence } from "@supabase/supabase-js";
import icon from "@/assets/icon.png";
import { useState } from "react";
import {
  fetchUser,
  fetchCookies,
  createCookie,
  trackCookie,
} from "@/server/env";

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    const user = await fetchUser();
    const cookies = await fetchCookies();
    let visitor_id = cookies?.cookies.find(
      (cookie) => cookie.name === "visitor_id"
    )?.value;

    if (!visitor_id) {
      visitor_id = await createCookie();
    }
    const message = await trackCookie({
      data: {
        visitor_id,
        page_url: location.pathname,
        user_id: user?.id ?? null,
      },
    });

    return {
      user,
    };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Template",
        description: `Template created by Biechy to create SaaS in a second.`,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { user } = Route.useRouteContext();
  const location = useRouterState({ select: (s) => s.location });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <html className="h-full">
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col min-h-screen">
        {location.pathname != "/" && (
          <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
            <div className="p-4 md:p-8">
              {/* Desktop Header */}
              <div className="flex gap-10 text-lg items-center">
                <Link to="/app" activeOptions={{ exact: true }}>
                  <img src={icon} alt="MyAPP icon" className="h-10 w-auto" />
                </Link>

                {/* Navigation Desktop */}
                <div className="hidden md:flex gap-10 items-center flex-1">
                  {!user ? (
                    <div className="ml-auto gap-4 flex items-center">
                      <Link
                        to="/login"
                        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-8 py-2 rounded-lg text-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-600"
                      >
                        Se connecter
                      </Link>
                      <Link
                        to="/signup"
                        search={{ redirect: undefined }}
                        className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 px-8 py-2 rounded-lg text-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                      >
                        S'inscrire
                      </Link>
                    </div>
                  ) : (
                    <div className="ml-auto relative">
                      <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center justify-center font-bold uppercase hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
                      >
                        {user.username?.[0] ?? "?"}
                      </button>

                      {/* Menu utilisateur */}
                      {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                          <Link
                            to="/app"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Dashboard
                          </Link>
                          <Link
                            to="/settings"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Paramètres
                          </Link>
                          <Link
                            to="/logout"
                            className="block px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Déconnexion
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/*  Hamburger - Button (Mobile) */}
                <button
                  className="md:hidden ml-auto flex flex-col gap-1 p-2"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <div
                    className={`w-6 h-0.5 bg-current transition-all duration-300 ease-in-out transform origin-center ${
                      isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                    }`}
                  />
                  <div
                    className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                      isMobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <div
                    className={`w-6 h-0.5 bg-current transition-all duration-300 ease-in-out transform origin-center ${
                      isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Menu Mobile */}
              <div
                className={`md:hidden transition-all duration-300 overflow-hidden ${
                  isMobileMenuOpen
                    ? "max-h-96 opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                {/* Auth section Mobile */}
                <div className="flex flex-col gap-4 py-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col gap-4 mt-4">
                    {user ? (
                      <>
                        <Link
                          to="/app"
                          activeProps={{
                            className: "font-bold",
                          }}
                          className="py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/settings"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Paramètres
                        </Link>
                        <Link
                          to="/logout"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 py-3 rounded-lg text-center font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-600"
                        >
                          Déconnexion
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 py-3 rounded-lg text-center font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-600"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Se connecter
                        </Link>
                        <Link
                          to="/signup"
                          search={{ redirect: undefined }}
                          className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 px-6 py-3 rounded-lg text-center font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          S'inscrire
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>
        )}
        <hr />
        <main className="flex flex-col flex-1 pt-28">{children}</main>
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t bg-gray-100 dark:bg-gray-900 text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} created with ❤️ by Biechy. All rights
          reserved.
        </footer>

        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
