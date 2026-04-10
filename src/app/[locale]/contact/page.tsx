import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, Send } from "lucide-react";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-cream to-off-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl text-brown">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-brown-muted">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Form */}
          <form
            action="mailto:contact@angelove.eu"
            method="POST"
            encType="text/plain"
            className="bg-white rounded-2xl border border-cream/60 p-6 sm:p-8"
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-brown mb-1.5"
                >
                  {t("name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-cream bg-off-white/50 text-brown placeholder:text-brown-muted/50 focus:outline-none focus:ring-2 focus:ring-turquoise/30 focus:border-turquoise transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-brown mb-1.5"
                >
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-cream bg-off-white/50 text-brown placeholder:text-brown-muted/50 focus:outline-none focus:ring-2 focus:ring-turquoise/30 focus:border-turquoise transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-brown mb-1.5"
                >
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-cream bg-off-white/50 text-brown placeholder:text-brown-muted/50 focus:outline-none focus:ring-2 focus:ring-turquoise/30 focus:border-turquoise transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                {t("send")}
                <Send size={16} />
              </button>
            </div>
          </form>

          {/* Email Direct */}
          <div className="mt-8 bg-cream/40 rounded-2xl p-6 text-center">
            <Mail size={24} className="text-turquoise mx-auto mb-3" />
            <p className="text-sm text-brown-muted mb-1">
              {t("generalQuestions")}
            </p>
            <a
              href="mailto:contact@angelove.eu"
              className="text-turquoise hover:text-turquoise-dark font-semibold transition-colors cursor-pointer"
            >
              contact@angelove.eu
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
