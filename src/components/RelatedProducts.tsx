import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { PRODUCTS } from "@/lib/products";

interface Props {
  currentSlug: string;
  locale: string;
}

export async function RelatedProducts({ currentSlug, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "ProductDetail" });
  const pt = await getTranslations({ locale, namespace: "Products" });

  const related = PRODUCTS.filter((p) => p.slug !== currentSlug);

  return (
    <section className="bg-cream/30 rounded-2xl p-6">
      <h2 className="font-heading text-xl text-brown mb-4">{t("relatedTitle")}</h2>

      <div className="space-y-3">
        {related.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="flex items-center gap-4 bg-white rounded-xl p-3 hover:shadow-md hover:shadow-brown/5 transition-shadow cursor-pointer"
          >
            <div className="relative w-20 h-20 shrink-0">
              <Image
                src={product.variants[0].image}
                alt={pt(`${product.key}.name`)}
                fill
                className="object-contain"
                sizes="80px"
              />
            </div>

            <div className="min-w-0">
              <p className="font-heading text-sm text-brown truncate">
                {pt(`${product.key}.name`)}
              </p>
              <p className="text-sm font-semibold text-brown mt-0.5">
                {product.priceDisplay}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
