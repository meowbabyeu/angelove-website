import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ShieldCheck,
  Leaf,
  ExternalLink,
} from "lucide-react";

const PRODUCTS = [
  {
    key: "sofas",
    price: "€150 – €250",
    image: "/products/sofa.jpg",
    colors: ["#E8DCC8", "#F0C0C0", "#5BB8B0", "#8B5DAA", "#9E9E9E"],
    badge: "Bestseller",
  },
  {
    key: "halfSofas",
    price: "€80 – €120",
    image: "/products/half-sofa.jpg",
    colors: ["#E8DCC8", "#F0C0C0", "#5BB8B0", "#8B5DAA"],
    badge: null,
  },
  {
    key: "waveLounger",
    price: "€80 – €100",
    image: "/products/wave-lounger.jpg",
    colors: ["#E8DCC8", "#F0C0C0", "#5BB8B0"],
    badge: null,
  },
  {
    key: "sofaPremium",
    price: "€150 – €200",
    image: "/products/sofa-premium.jpg",
    colors: ["#E8DCC8", "#F0C0C0", "#5BB8B0", "#8B5DAA"],
    badge: "Premium",
  },
  {
    key: "huepfpolster",
    price: "€109",
    image: "/products/huepfpolster.jpg",
    colors: ["#E8DCC8", "#F0C0C0", "#5BB8B0", "#8B5DAA", "#9E9E9E", "#A7C4A0"],
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

      {/* Product Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map(({ key, price, colors, badge }) => (
              <div
                key={key}
                className="group bg-white rounded-2xl border border-cream/60 overflow-hidden hover:shadow-xl hover:shadow-brown/5 transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className="relative aspect-[4/3] bg-cream/30 flex items-center justify-center">
                  <div className="w-28 h-28 bg-cream rounded-2xl flex items-center justify-center">
                    <Leaf size={40} className="text-turquoise/30" />
                  </div>
                  {badge && (
                    <span className="absolute top-4 right-4 bg-turquoise text-white text-xs font-bold px-3 py-1 rounded-full">
                      {badge}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h2 className="font-heading text-xl text-brown">
                    {t(`${key}.name`)}
                  </h2>
                  <p className="mt-2 text-sm text-brown-muted leading-relaxed">
                    {t(`${key}.description`)}
                  </p>

                  {/* Features */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {t(`${key}.features`)
                      .split(", ")
                      .map((feature: string) => (
                        <span
                          key={feature}
                          className="text-xs bg-cream/60 text-brown-muted px-2.5 py-1 rounded-lg"
                        >
                          {feature}
                        </span>
                      ))}
                  </div>

                  {/* Colors */}
                  <div className="flex gap-2 mt-4">
                    {colors.map((color) => (
                      <span
                        key={color}
                        className="w-5 h-5 rounded-full border border-brown/10"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-5 flex items-center justify-between pt-4 border-t border-cream/60">
                    <span className="font-semibold text-brown">{price}</span>
                    <a
                      href="https://www.amazon.de/stores/Angelove"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-coral hover:bg-coral-dark text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-200 cursor-pointer"
                    >
                      {t("viewOnAmazon")}
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* OEKO-TEX Note */}
          <div className="mt-12 bg-cream/40 rounded-2xl p-6 sm:p-8 flex items-start gap-4">
            <ShieldCheck size={28} className="text-turquoise shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-brown">OEKO-TEX Standard 100</p>
              <p className="mt-1 text-sm text-brown-muted leading-relaxed">
                {locale === "de"
                  ? "Alle Angelove-Produkte sind OEKO-TEX Standard 100 zertifiziert — der höchste Sicherheitsstandard für Textilien im Kontakt mit Babyhaut."
                  : locale === "fr"
                    ? "Tous les produits Angelove sont certifiés OEKO-TEX Standard 100 — la norme de sécurité la plus élevée pour les textiles en contact avec la peau de bébé."
                    : "All Angelove products are OEKO-TEX Standard 100 certified — the highest safety standard for textiles in contact with baby skin."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
