import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@/lib/products";
import { ProductDetailClient } from "./ProductDetailClient";

export function generateStaticParams() {
  return PRODUCTS.flatMap((p) =>
    ["en", "de", "fr"].map((locale) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const t = await getTranslations({ locale, namespace: "Products" });
  return {
    title: `${t(`${product.key}.name`)} — AngeLove`,
    description: t(`${product.key}.description`),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const t = await getTranslations("Products");
  const tt = await getTranslations("ProductDetail");

  const productData = {
    ...product,
    name: t(`${product.key}.name`),
    description: t(`${product.key}.description`),
    features: t(`${product.key}.features`).split(", "),
  };

  const labels = {
    addToCart: tt("addToCart"),
    addedToCart: tt("addedToCart"),
    color: tt("color"),
    dimensions: tt("dimensions"),
    features: tt("features"),
    shipping: tt("shipping"),
    shippingText: tt("shippingText"),
    alsoOnAmazon: tt("alsoOnAmazon"),
    certification: tt("certification"),
    certificationText: tt("certificationText"),
  };

  return <ProductDetailClient product={productData} labels={labels} />;
}
