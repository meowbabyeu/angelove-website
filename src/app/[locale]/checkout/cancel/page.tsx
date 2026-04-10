import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export default async function CheckoutCancelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Checkout");

  return (
    <section className="py-20 sm:py-32">
      <div className="max-w-lg mx-auto px-4 text-center">
        <h1 className="font-heading text-3xl sm:text-4xl text-brown">
          {t("cancelTitle")}
        </h1>
        <p className="mt-4 text-brown-muted text-lg leading-relaxed">
          {t("cancelMessage")}
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold px-7 py-3.5 rounded-2xl transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} />
          {t("backToProducts")}
        </Link>
      </div>
    </section>
  );
}
