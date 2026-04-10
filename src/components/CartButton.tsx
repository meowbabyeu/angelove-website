"use client";

import { useCart } from "@/lib/cart";
import { ShoppingBag } from "lucide-react";

export function CartButton() {
  const { openCart, totalItems } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative p-2 rounded-xl text-brown-muted hover:text-brown hover:bg-cream/50 transition-colors cursor-pointer"
      aria-label="Shopping cart"
    >
      <ShoppingBag size={22} />
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-coral text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
}
