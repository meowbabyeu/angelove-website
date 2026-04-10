"use client";

import { useCart } from "@/lib/cart";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLocale } from "next-intl";
import { FreeShippingBar } from "./FreeShippingBar";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCart();
  const t = useTranslations("Cart");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, locale }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  }

  const shipping = 999; // €9.99 in cents
  const hasItems = items.length > 0;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-cream">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-brown" />
            <h2 className="font-heading text-lg text-brown">{t("title")}</h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-2 rounded-xl text-brown-muted hover:text-brown hover:bg-cream/50 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {!hasItems ? (
            <div className="flex flex-col items-center justify-center h-full text-brown-muted">
              <ShoppingBag size={48} className="mb-4 opacity-30" />
              <p>{t("empty")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.slug}-${item.color}`}
                  className="flex gap-4 bg-cream/20 rounded-xl p-3"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white shrink-0">
                    <Image
                      src={item.image}
                      alt={item.slug}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-sm text-brown capitalize truncate">
                      {item.slug}
                    </p>
                    <p className="text-xs text-brown-muted">{item.color}</p>
                    <p className="font-semibold text-brown text-sm mt-1">
                      €{(item.price / 100).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      type="button"
                      onClick={() => removeItem(item.slug, item.color)}
                      className="p-1 text-brown-muted hover:text-coral transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="flex items-center gap-2 bg-white rounded-lg px-1">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.slug, item.color, item.quantity - 1)
                        }
                        className="p-1 text-brown-muted hover:text-brown cursor-pointer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium text-brown w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.slug, item.color, item.quantity + 1)
                        }
                        className="p-1 text-brown-muted hover:text-brown cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {hasItems && (
          <div className="border-t border-cream p-5 space-y-3">
            <FreeShippingBar totalPrice={totalPrice} />
            <div className="flex justify-between text-sm text-brown-muted">
              <span>{t("subtotal")}</span>
              <span>€{(totalPrice / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-brown-muted">
              <span>{t("shipping")}</span>
              <span>€{(shipping / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-brown pt-2 border-t border-cream">
              <span>{t("total")}</span>
              <span>€{((totalPrice + shipping) / 100).toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-coral hover:bg-coral-dark disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? t("processing") : t("checkout")}
            </button>
            <p className="text-xs text-center text-brown-muted">
              {t("shippingNote")}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
