"use client";

import { useTranslations } from "next-intl";

const FREE_SHIPPING_THRESHOLD = 29900; // €299 in cents

interface FreeShippingBarProps {
  totalPrice: number; // in cents
}

export function FreeShippingBar({ totalPrice }: FreeShippingBarProps) {
  const t = useTranslations("Cart");

  const earned = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const progress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="bg-cream/40 rounded-xl p-3 space-y-2">
      <p className="text-xs text-brown-muted text-center">
        {earned
          ? t("freeShippingEarned")
          : t("freeShippingProgress", {
              amount: (remaining / 100).toFixed(2),
            })}
      </p>

      <div className="w-full h-2 rounded-full bg-cream overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            earned ? "bg-green-400" : "bg-turquoise"
          }`}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
