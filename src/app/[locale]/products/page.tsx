import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ShieldCheck, ExternalLink } from "lucide-react";

const PRODUCTS = [
  {
    key: "sofa",
    price: "€219",
    images: ["/products/sofa-cream.jpg", "/products/sofa-pink.jpg", "/products/sofa-brown.jpg"],
    amazonUrl: "https://www.amazon.de/dp/B0F43NYGZ1",
    badge: null,
  },
  {
    key: "sessel",
    price: "€109",
    images: ["/products/sessel-beige.jpg", "/products/sessel-pink.jpg", "/products/sessel-green.jpg"],
    amazonUrl: "https://www.amazon.de/dp/B0DCNJPB7B",
    badge: null,
  },
  {
    key: "huepfpolster",
    price: "€109",
    images: ["/products/huepfpolster-beige.png", "/products/huepfpolster-turquoise.png"],
    amazonUrl: "https://www.amazon.de/dp/B0GS3MJC4P",
    badge: "New",
  },
] as const;

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Products");

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-cream to-off-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl text-brown">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-brown-muted max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {PRODUCTS.map(({ key, price, images, amazonUrl, badge }) => (
            <div
              key={key}
              className="bg-white rounded-3xl border border-cream/60 overflow-hidden hover:shadow-xl hover:shadow-brown/5 transition-shadow duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Main Image */}
                <div className="relative aspect-square bg-white overflow-hidden p-6">
                  <Image
                    src={images[0]}
                    alt={t(`${key}.name`)}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {badge && (
                    <span className="absolute top-4 right-4 bg-turquoise text-white text-xs font-bold px-3 py-1 rounded-full">
                      {badge}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    <h2 className="font-heading text-2xl sm:text-3xl text-brown">
                      {t(`${key}.name`)}
                    </h2>
                    <p className="mt-4 text-brown-muted leading-relaxed">
                      {t(`${key}.description`)}
                    </p>

                    {/* Features */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {t(`${key}.features`)
                        .split(", ")
                        .map((feature: string) => (
                          <span
                            key={feature}
                            className="text-xs bg-cream/60 text-brown-muted px-3 py-1.5 rounded-lg font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                    </div>

                    {/* Color Variants */}
                    {images.length > 1 && (
                      <div className="mt-5 flex gap-3">
                        {images.map((img) => (
                          <div
                            key={img}
                            className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-cream/60"
                          >
                            <Image
                              src={img}
                              alt="Color variant"
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-cream/60">
                    <span className="text-2xl font-semibold text-brown">
                      {price}
                    </span>
                    <a
                      href={amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 cursor-pointer"
                    >
                      {t("viewOnAmazon")}
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* OEKO-TEX Note */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-cream/40 rounded-2xl p-6 sm:p-8 flex items-start gap-4">
            <ShieldCheck size={28} className="text-turquoise shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-brown">OEKO-TEX Standard 100</p>
              <p className="mt-1 text-sm text-brown-muted leading-relaxed">
                {locale === "de"
                  ? "Alle AngeLove-Produkte sind OEKO-TEX Standard 100 zertifiziert — der höchste Sicherheitsstandard für Textilien im Kontakt mit Babyhaut."
                  : locale === "fr"
                    ? "Tous les produits AngeLove sont certifiés OEKO-TEX Standard 100 — la norme de sécurité la plus élevée pour les textiles en contact avec la peau de bébé."
                    : "All AngeLove products are OEKO-TEX Standard 100 certified — the highest safety standard for textiles in contact with baby skin."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
