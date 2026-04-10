import { getTranslations, setRequestLocale } from "next-intl/server";
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

      {/* Story */}
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-brown-muted text-lg leading-relaxed">
              {t("story")}
            </p>
            <p className="text-brown-muted leading-relaxed mt-4">
              {t("storyExtended")}
            </p>
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl text-brown mb-6">
            {locale === "de"
              ? "Unser Signature-Material: Cord"
              : locale === "fr"
                ? "Notre matériau signature : le velours côtelé"
                : "Our Signature Material: Corduroy"}
          </h2>
          <p className="text-brown-muted text-lg leading-relaxed">
            {locale === "de"
              ? "Jedes Angelove-Produkt ist mit Premium-Cord-Stoff bezogen — weich, langlebig und stilvoll. Unsere sorgfältig ausgewählten Pastellfarben fügen sich harmonisch in moderne Wohnräume ein und schaffen eine warme, einladende Atmosphäre für Ihr Kind."
              : locale === "fr"
                ? "Chaque produit Angelove est recouvert de velours côtelé premium — doux, durable et élégant. Nos couleurs pastel soigneusement sélectionnées s'intègrent harmonieusement dans les intérieurs modernes et créent une atmosphère chaleureuse pour votre enfant."
                : "Every Angelove product is upholstered in premium corduroy fabric — soft, durable, and stylish. Our carefully selected pastel colours blend harmoniously into modern living spaces, creating a warm and inviting atmosphere for your child."}
          </p>
          {/* Color swatches */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {[
              { color: "#E8DCC8", name: "Beige" },
              { color: "#F0C0C0", name: "Rosa" },
              { color: "#5BB8B0", name: "Türkis" },
              { color: "#8B5DAA", name: "Violett" },
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
      </section>
    </>
  );
}
