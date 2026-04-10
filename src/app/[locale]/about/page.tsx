import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ShieldCheck, Leaf, Globe, Puzzle } from "lucide-react";

const VALUES = [
  { key: "safety", icon: ShieldCheck },
  { key: "montessori", icon: Leaf },
  { key: "european", icon: Globe },
  { key: "versatile", icon: Puzzle },
] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-cream to-off-white py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-turquoise font-semibold text-sm uppercase tracking-widest mb-4">
            {t("subtitle")}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl text-brown">
            {t("title")}
          </h1>
        </div>
      </section>

      {/* Story with Image */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-brown-muted text-lg leading-relaxed">
                {t("story")}
              </p>
              <p className="text-brown-muted leading-relaxed mt-4">
                {t("storyExtended")}
              </p>
            </div>
            <Image
              src="/lifestyle/lifestyle-1.png"
              alt="AngeLove furniture in a Scandinavian children's room"
              width={600}
              height={400}
              className="rounded-3xl shadow-lg shadow-brown/5 object-cover w-full"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream/40 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {VALUES.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-cream/60"
              >
                <div className="w-12 h-12 bg-turquoise/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={24} className="text-turquoise" />
                </div>
                <h3 className="font-heading text-xl text-brown">
                  {t(`values.${key}.title`)}
                </h3>
                <p className="mt-2 text-brown-muted leading-relaxed">
                  {t(`values.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Material */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <Image
              src="/lifestyle/lifestyle-2.png"
              alt="AngeLove corduroy furniture detail"
              width={600}
              height={400}
              className="rounded-3xl shadow-lg shadow-brown/5 object-cover w-full order-2 lg:order-1"
            />
            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-3xl text-brown mb-6">
                {t("materialTitle")}
              </h2>
              <p className="text-brown-muted text-lg leading-relaxed">
                {t("materialText")}
              </p>
              {/* Color swatches */}
              <div className="flex items-center gap-4 mt-8">
                {[
                  { color: "#E8DCC8", name: "Beige" },
                  { color: "#D4A5A5", name: "Rosa" },
                  { color: "#5BB8B0", name: "Türkis" },
                  { color: "#8B7355", name: "Braun" },
                  { color: "#9E9E9E", name: "Grau" },
                ].map(({ color, name }) => (
                  <div key={color} className="flex flex-col items-center gap-2">
                    <span
                      className="w-12 h-12 rounded-2xl border border-brown/10"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs text-brown-muted">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
