"use client";
import { signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Moon, ShoppingCart, Sun, X } from "lucide-react";
import { useState } from "react";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { useQuery } from "@tanstack/react-query";
import type { CartRes } from "@/interfaces/cart/cart.interface";

const links = [
  { key: "home", href: "/" },
  { key: "shop", href: "/Shop" },
  { key: "categories", href: "/categories" },

] as const;

export default function Navbar() {

  const { data, status } = useSession()


  const { data: cartData } = useQuery<CartRes>({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) throw new Error("Could not load cart");
      return response.json();
    },
    enabled: status === "authenticated",
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { language, theme, setLanguage, setTheme, t } = usePreferences();
  const nextTheme = theme === "light" ? "dark" : "light";
  const cartItemCount = cartData?.payload?.numOfCartItems ?? 0

  function handleLogout() {
    // Implementation for logout functionality
    signOut({ callbackUrl: "/", redirect: true });
    () => setAccountMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 text-foreground shadow-sm backdrop-blur transition-colors duration-300">
      <nav
        aria-label={t("mainNavigation")}
        className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-4 px-4 py-3 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          aria-label="freshCart"
          className="text-2xl font-bold tracking-tight text-primary"
          onClick={() => setMenuOpen(false)}
        >
          fresh<span className="text-emerald-500">Cart</span>
        </Link>

        <div className="relative me-auto md:me-0 md:order-3">
          <button
            type="button"
            aria-expanded={accountMenuOpen}
            aria-haspopup="menu"
            onClick={() => setAccountMenuOpen((open) => !open)}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Account
            <ChevronDown aria-hidden="true" size={16} />
          </button>
          {accountMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-2 min-w-36 rounded-lg border border-border bg-background p-1 text-foreground shadow-lg"
            >
              {status === "authenticated" ? <>

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="block w-full rounded-md px-3 py-2 text-start text-sm hover:bg-accent"
                >
                  Logout
                </button>
              </> : <>
                <Link
                  href="/login"
                  role="menuitem"
                  onClick={() => setAccountMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  role="menuitem"
                  onClick={() => setAccountMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  Register
                </Link>
              </>}


            </div>
          )}
        </div>


        <div className="flex items-center gap-1 md:order-4 md:gap-2">
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            aria-label={language === "en" ? t("switchToArabic") : t("switchToEnglish")}
            className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {language === "en" ? "عربي" : "English"}
          </button>
          <button
            type="button"
            onClick={() => setTheme(nextTheme)}
            aria-label={theme === "light" ? t("switchToDark") : t("switchToLight")}
            className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -35, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 35, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                {theme === "light" ? (
                  <Moon aria-hidden="true" size={19} />
                ) : (
                  <Sun aria-hidden="true" size={19} />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:hidden"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation-links"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>

        <div
          id="primary-navigation-links"
          className={`${menuOpen ? "flex" : "hidden"} order-3 mt-3 w-full flex-col gap-1 border-t border-border pt-3 md:order-none md:ms-auto md:mt-0 md:flex md:w-auto md:flex-row md:items-center md:gap-2 md:border-0 md:pt-0`}
        >
          {links.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:px-3"
            >
              {t(key)}
            </Link>
          ))}

          {status === "authenticated" && (<Link
            href="/cart"
            role="menuitem"
            onClick={() => setAccountMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            <div className="flex gap-2">
              <span>Cart</span>
              <span className="relative inline-flex" aria-label={`${t("cart")}: ${cartItemCount}`}>
                <ShoppingCart aria-hidden="true" size={19} />
                {cartItemCount > 0 && (
                  <span className="absolute -end-2 -top-2 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full border-2 border-background bg-primary px-1 text-[10px] font-bold leading-none text-primary-foreground shadow-sm">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </span>
            </div>

          </Link>
          )}
        </div>


        {status === "authenticated" && <p className="text-green-600 font-bold">Welcome, {data.user.name}!</p>}

      </nav>
    </header>
  );
}
