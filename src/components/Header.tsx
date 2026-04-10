"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { CartButton } from "./CartButton";

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("products") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/brand/logo.png"
              alt="AngeLove"
              width={180}
              height={50}
              className="h-10 sm:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 cursor-pointer hover:text-turquoise ${
                  pathname === link.href
                    ? "text-turquoise"
                    : "text-brown-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <CartButton />
            <button
              type="button"
              className="md:hidden p-2 rounded-xl text-brown-muted hover:text-brown hover:bg-cream/50 transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-cream pt-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-base font-medium px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  pathname === link.href
                    ? "text-turquoise bg-cream/50"
                    : "text-brown-muted hover:text-brown hover:bg-cream/30"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
