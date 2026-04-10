import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Heart } from "lucide-react";

export function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  return (
    <footer className="bg-brown text-cream/80 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="font-heading text-2xl text-white">angelove</span>
            <p className="mt-3 text-sm leading-relaxed">{t("tagline")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-turquoise transition-colors cursor-pointer"
                >
                  {nav("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm hover:text-turquoise transition-colors cursor-pointer"
                >
                  {nav("products")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:text-turquoise transition-colors cursor-pointer"
                >
                  {nav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm hover:text-turquoise transition-colors cursor-pointer"
                >
                  {nav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t("legal")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm">{t("privacy")}</span>
              </li>
              <li>
                <span className="text-sm">{t("imprint")}</span>
              </li>
              <li>
                <span className="text-sm">{t("terms")}</span>
              </li>
            </ul>
          </div>

          {/* Amazon */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Shop
            </h3>
            <a
              href="https://www.amazon.de/stores/Angelove"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-turquoise hover:text-turquoise-dark transition-colors cursor-pointer"
            >
              Amazon.de Store
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream/50">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
          <p className="text-xs text-cream/50 flex items-center gap-1">
            Made with <Heart size={12} className="text-coral" /> in Europe
          </p>
        </div>
      </div>
    </footer>
  );
}
