"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  en: "EN",
  de: "DE",
  fr: "FR",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function handleSwitch(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span className="text-brown-muted/40 mx-0.5">|</span>}
          <button
            type="button"
            onClick={() => handleSwitch(loc)}
            className={`px-1.5 py-0.5 rounded-md font-medium transition-colors duration-200 cursor-pointer ${
              locale === loc
                ? "text-turquoise bg-turquoise/10"
                : "text-brown-muted hover:text-brown"
            }`}
          >
            {localeLabels[loc]}
          </button>
        </span>
      ))}
    </div>
  );
}
