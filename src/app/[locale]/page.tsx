import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  ShieldCheck,
  Leaf,
  Globe,
  WashingMachine,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Testimonials } from "@/components/Testimonials";
import { WhyAngeLove } from "@/components/WhyAngeLove";

const PRODUCTS = [
  {
    key: "sofa",
    price: "€219",
    image: "/products/sofa-cream.jpg",
    amazonUrl: "https://www.amazon.de/dp/B0F43NYGZ1",
  },
  {
    key: "sessel",
    price: "€109",
    image: "/products/sessel-beige.jpg",
    amazonUrl: "https://www.amazon.de/dp/B0DCNJPB7B",
  },
  {
    key: "huepfpolster",
    price: "€109",
    image: "/products/huepfpolster-beige.png",
    amazonUrl: "https://www.amazon.de/dp/B0GS3MJC4P",
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
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
            <div className="relative">
              <Image
                src="/lifestyle/hero-new.png"
                alt="Child jumping on AngeLove modular sofa in a modern room"
                width={600}
                height={800}
                className="rounded-3xl shadow-2xl shadow-brown/10 object-cover w-full max-h-[550px]"
                priority
              />
            </div>
          </div>
        </div>
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

      {/* Products */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl text-brown">
              {tp("title")}
            </h2>
            <p className="mt-3 text-brown-muted text-lg">{tp("subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.map(({ key, price, image }) => (
              <Link
                key={key}
                href={`/products/${key}`}
                className="group bg-white rounded-2xl border border-cream/60 overflow-hidden hover:shadow-xl hover:shadow-brown/5 transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-square bg-white overflow-hidden p-6">
                  <Image
                    src={image}
                    alt={tp(`${key}.name`)}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-xl text-brown">
                    {tp(`${key}.name`)}
                  </h3>
                  <p className="mt-2 text-sm text-brown-muted leading-relaxed line-clamp-3">
                    {tp(`${key}.description`)}
                  </p>

                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-cream/60">
                    <span className="text-sm text-brown-muted">
                      {tp("startingFrom")}{" "}
                      <span className="font-semibold text-brown text-base">{price}</span>
                    </span>
                    <span className="text-sm font-semibold text-coral group-hover:text-coral-dark transition-colors flex items-center gap-1">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
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
                <ArrowRight size={18} />
              </Link>
            </div>
            <Image
              src="/lifestyle/about-new.png"
              alt="Boy jumping on AngeLove bouncing cushion in Scandinavian room"
              width={600}
              height={400}
              className="rounded-3xl shadow-lg shadow-brown/5 object-cover w-full max-h-[450px]"
            />
          </div>
        </div>
      </section>

      {/* Why AngeLove */}
      <WhyAngeLove />

      {/* Testimonials */}
      <Testimonials />
    </>
  );
}
