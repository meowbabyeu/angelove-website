import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ShieldCheck,
  Leaf,
  Globe,
  WashingMachine,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const PRODUCTS = [
  {
    key: "sofas",
    price: "€150",
    image: "/products/sofa.jpg",
    colors: ["#E8DCC8", "#F0C0C0", "#5BB8B0", "#8B5DAA", "#9E9E9E"],
  },
  {
    key: "halfSofas",
    price: "€80",
    image: "/products/half-sofa.jpg",
    colors: ["#E8DCC8", "#F0C0C0", "#5BB8B0", "#8B5DAA"],
  },
  {
    key: "waveLounger",
    price: "€80",
    image: "/products/wave-lounger.jpg",
    colors: ["#E8DCC8", "#F0C0C0", "#5BB8B0"],
  },
  {
    key: "huepfpolster",
    price: "€109",
    image: "/products/huepfpolster.jpg",
    colors: ["#E8DCC8", "#F0C0C0", "#5BB8B0", "#8B5DAA", "#9E9E9E", "#A7C4A0"],
  },
] as const;

const TRUST_ITEMS = [
  { key: "oekoTex", icon: ShieldCheck },
  { key: "european", icon: Globe },
  { key: "montessori", icon: Leaf },
  { key: "washable", icon: WashingMachine },
  { key: "hypoallergenic", icon: Sparkles },
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Hero");
  const tp = await getTranslations("Products");
  const tt = await getTranslations("Trust");
  const ta = await getTranslations("About");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream to-off-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <p className="text-turquoise font-semibold text-sm uppercase tracking-widest mb-4">
              {t("tagline")}
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-brown leading-tight">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg text-brown-muted leading-relaxed max-w-xl">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold px-7 py-3.5 rounded-2xl transition-colors duration-200 cursor-pointer"
              >
                {t("cta")}
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://www.amazon.de/stores/Angelove"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-cream hover:border-turquoise text-brown font-semibold px-7 py-3.5 rounded-2xl transition-colors duration-200 cursor-pointer"
              >
                {t("ctaAmazon")}
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
        {/* Decorative blob */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-turquoise/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-pink/20 rounded-full blur-3xl" />
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-y border-cream/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {TRUST_ITEMS.map(({ key, icon: Icon }) => (
              <div key={key} className="flex items-center gap-2 text-brown-muted">
                <Icon size={20} className="text-turquoise" />
                <span className="text-sm font-medium">{tt(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl text-brown">
              {tp("title")}
            </h2>
            <p className="mt-3 text-brown-muted text-lg">{tp("subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map(({ key, price, colors }) => (
              <div
                key={key}
                className="group bg-white rounded-2xl border border-cream/60 p-5 hover:shadow-lg hover:shadow-brown/5 transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className="aspect-square bg-cream/40 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  <div className="w-24 h-24 bg-cream rounded-2xl flex items-center justify-center">
                    <Leaf size={32} className="text-turquoise/40" />
                  </div>
                </div>

                <h3 className="font-heading text-lg text-brown">
                  {tp(`${key}.name`)}
                </h3>
                <p className="mt-1.5 text-sm text-brown-muted leading-relaxed line-clamp-2">
                  {tp(`${key}.description`)}
                </p>

                {/* Color dots */}
                <div className="flex gap-1.5 mt-3">
                  {colors.map((color) => (
                    <span
                      key={color}
                      className="w-4 h-4 rounded-full border border-brown/10"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-brown-muted">
                    {tp("startingFrom")}{" "}
                    <span className="font-semibold text-brown">{price}</span>
                  </span>
                  <a
                    href="https://www.amazon.de/stores/Angelove"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-turquoise hover:text-turquoise-dark transition-colors cursor-pointer flex items-center gap-1"
                  >
                    Amazon
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-coral hover:text-coral-dark font-semibold transition-colors cursor-pointer"
            >
              {tp("title")}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-cream/40 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-turquoise font-semibold text-sm uppercase tracking-widest mb-4">
              {ta("subtitle")}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-brown">
              {ta("title")}
            </h2>
            <p className="mt-6 text-brown-muted text-lg leading-relaxed">
              {ta("story")}
            </p>
            <p className="mt-4 text-brown-muted leading-relaxed">
              {ta("storyExtended")}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-coral hover:text-coral-dark font-semibold transition-colors cursor-pointer"
            >
              {/* "Learn more" is short enough to not need translation for MVP */}
              Learn more
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
