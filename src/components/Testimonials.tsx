import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  { prefix: "t1" },
  { prefix: "t2" },
  { prefix: "t3" },
] as const;

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className="text-amber-400 fill-amber-400"
        />
      ))}
    </div>
  );
}

export async function Testimonials() {
  const t = await getTranslations("Testimonials");

  return (
    <section className="bg-off-white py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl text-brown">
            {t("title")}
          </h2>
          <p className="mt-3 text-brown-muted text-base sm:text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ prefix }) => (
            <article
              key={prefix}
              className="bg-white rounded-2xl p-6 border border-cream/60 flex flex-col gap-4"
            >
              <StarRating />

              <blockquote className="text-brown text-sm sm:text-base leading-relaxed flex-1">
                &ldquo;{t(`${prefix}.quote`)}&rdquo;
              </blockquote>

              <footer className="flex flex-col gap-0.5">
                <span className="font-semibold text-brown text-sm">
                  {t(`${prefix}.author`)}
                </span>
                <span className="text-brown-muted text-xs">
                  {t(`${prefix}.location`)}
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
