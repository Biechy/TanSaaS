import { useState } from "react";
import icon from "@/assets/icon.png";
import { Link } from "@tanstack/react-router";

export function Navigation({
  waitingList,
  user,
}: {
  waitingList: boolean;
  user: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    requestAnimationFrame(() => setIsMenuOpen(false));
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* icon */}
          <div className="flex items-center space-x-3">
            <img src={icon} alt="Icon" className="h-10 w-auto" />
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            <Link
              to="."
              hash="testimonials"
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              hashScrollIntoView={true}
              resetScroll={false}
            >
              Témoignages
            </Link>
            <Link
              to="."
              hash="features"
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Fonctionnalités
            </Link>
            <Link
              to="."
              hash="pricing"
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Tarification
            </Link>
          </div>

          {/* Actions desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {waitingList ? (
              <Link
                to="."
                hash="conversion"
                className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Rejoindre
              </Link>
            ) : user ? (
              <>
                <Link
                  to="/logout"
                  className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  Se déconnecter
                </Link>
                <Link
                  to="/app"
                  className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  Se connecter
                </Link>
                <Link
                  to="/signup"
                  search={{ redirect: undefined }}
                  className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Burger menu */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span
                className={`block h-0.5 w-6 bg-gray-900 dark:bg-gray-100 transition-transform ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-gray-900 dark:bg-gray-100 transition-opacity ${isMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-gray-900 dark:bg-gray-100 transition-transform ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-t bg-gray-50 dark:bg-gray-950 transition-all duration-200 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-2 space-y-2">
          <Link
            to="."
            hash="testimonials"
            onClick={closeMenu}
            className="block py-2 hover:text-gray-600 dark:hover:text-gray-300"
          >
            Témoignages
          </Link>
          <Link
            to="."
            hash="features"
            onClick={closeMenu}
            className="block py-2 hover:text-gray-600 dark:hover:text-gray-300"
          >
            Fonctionnalités
          </Link>
          <Link
            to="."
            hash="pricing"
            onClick={closeMenu}
            className="block py-2 hover:text-gray-600 dark:hover:text-gray-300"
          >
            Tarification
          </Link>

          {/* Menu dynamique selon waitingList / user */}
          {waitingList ? (
            <Link
              to="."
              hash="conversion"
              onClick={closeMenu}
              className="w-full block mt-2 bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 px-4 py-2 rounded-lg text-center"
            >
              Rejoindre
            </Link>
          ) : user ? (
            <>
              <Link
                to="/logout"
                className="w-full block mt-2 py-2 text-center border border-gray-600 dark:border-gray-600 rounded-lg hover:text-gray-600 dark:hover:text-gray-300"
              >
                Se déconnecter
              </Link>
              <Link
                to="/app"
                onClick={closeMenu}
                className="w-full block mt-2 bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 px-4 py-2 rounded-lg text-center"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="w-full block mt-2 py-2 text-center border border-gray-600 dark:border-gray-600 rounded-lg hover:text-gray-600 dark:hover:text-gray-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={closeMenu}
                search={{ redirect: undefined }}
                className="w-full block mt-2 bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 px-4 py-2 rounded-lg text-center"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
