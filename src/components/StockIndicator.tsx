"use client";

import { useTranslations } from "next-intl";

export function StockIndicator() {
  const t = useTranslations("ProductDetail");

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
        <span className="text-sm text-brown-muted">{t("inStock")}</span>
      </div>
      <span className="text-brown-muted/40 text-sm">·</span>
      <span className="text-sm text-brown-muted">{t("deliveryTime")}</span>
    </div>
  );
}
