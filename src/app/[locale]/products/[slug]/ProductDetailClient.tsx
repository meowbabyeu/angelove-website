"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import {
  ShieldCheck,
  Truck,
  ExternalLink,
  Check,
} from "lucide-react";
import { StockIndicator } from "@/components/StockIndicator";
import { ProductRating } from "@/components/ProductRating";

interface Props {
  product: Product & {
    name: string;
    description: string;
    features: string[];
  };
  labels: Record<string, string>;
}

export function ProductDetailClient({ product, labels }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const variant = product.variants[selectedVariant];

  function handleAddToCart() {
    addItem({
      slug: product.slug,
      color: variant.color,
      price: product.price,
      image: variant.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      <section className="py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
            {/* Image Gallery */}
            <div>
              <div className="relative aspect-square bg-white rounded-3xl overflow-hidden border border-cream/60">
                <Image
                  src={variant.image}
                  alt={`${product.name} — ${variant.color}`}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {product.badge && (
                  <span className="absolute top-4 right-4 bg-turquoise text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-4">
                {product.variants.map((v, i) => (
                  <button
                    key={v.color}
                    type="button"
                    onClick={() => setSelectedVariant(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      i === selectedVariant
                        ? "border-turquoise shadow-md"
                        : "border-cream/60 hover:border-turquoise/50"
                    }`}
                  >
                    <Image
                      src={v.image}
                      alt={v.color}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="font-heading text-3xl sm:text-4xl text-brown">
                {product.name}
              </h1>

              <p className="mt-2 text-3xl font-semibold text-brown">
                {product.priceDisplay}
              </p>

              <div className="mt-3">
                <ProductRating rating={product.rating} reviewCount={product.reviewCount} amazonUrl={product.amazonUrl} />
              </div>

              <div className="mt-3">
                <StockIndicator />
              </div>

              <p className="mt-4 text-brown-muted leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector */}
              <div className="mt-6">
                <p className="text-sm font-medium text-brown mb-2">
                  {labels.color}: <span className="text-brown-muted">{variant.color}</span>
                </p>
                <div className="flex gap-3">
                  {product.variants.map((v, i) => (
                    <button
                      key={v.color}
                      type="button"
                      onClick={() => setSelectedVariant(i)}
                      className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${
                        i === selectedVariant
                          ? "border-turquoise scale-110 shadow-md"
                          : "border-brown/10 hover:border-turquoise/50"
                      }`}
                      style={{ backgroundColor: v.colorHex }}
                      title={v.color}
                    />
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mt-6">
                <p className="text-sm font-medium text-brown mb-2">{labels.features}</p>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs bg-cream/60 text-brown-muted px-3 py-1.5 rounded-lg font-medium"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dimensions */}
              <div className="mt-4 text-sm text-brown-muted">
                <span className="font-medium text-brown">{labels.dimensions}:</span>{" "}
                {product.dimensions}
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`mt-8 w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                  added
                    ? "bg-turquoise text-white"
                    : "bg-coral hover:bg-coral-dark text-white"
                }`}
              >
                {added ? (
                  <>
                    <Check size={20} />
                    {labels.addedToCart}
                  </>
                ) : (
                  labels.addToCart
                )}
              </button>

              {/* Trust signals */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-brown-muted">
                  <Truck size={18} className="text-turquoise shrink-0" />
                  <div>
                    <span className="font-medium text-brown">{labels.shipping}</span>
                    <span className="ml-1">{labels.shippingText}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-brown-muted">
                  <ShieldCheck size={18} className="text-turquoise shrink-0" />
                  <div>
                    <span className="font-medium text-brown">{labels.certification}</span>
                    <span className="ml-1">{labels.certificationText}</span>
                  </div>
                </div>
              </div>

              {/* Amazon link */}
              <a
                href={product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-turquoise hover:text-turquoise-dark font-medium transition-colors cursor-pointer"
              >
                {labels.alsoOnAmazon}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-cream p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-heading text-lg text-brown">{product.priceDisplay}</p>
            <p className="text-xs text-brown-muted">{variant.color}</p>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className={`px-6 py-3 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              added
                ? "bg-turquoise text-white"
                : "bg-coral hover:bg-coral-dark text-white"
            }`}
          >
            {added ? <Check size={18} /> : null}
            {added ? labels.addedToCart : labels.addToCart}
          </button>
        </div>
      </div>
    </>
  );
}
