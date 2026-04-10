import { getTranslations } from "next-intl/server";
import { Check, X } from "lucide-react";

type CellValue = "check" | "x";

interface ComparisonRow {
  labelKey: string;
  angelove: CellValue;
  cheapImports: CellValue;
  otherBrands: CellValue;
}

const ROWS: ComparisonRow[] = [
  {
    labelKey: "oekoTex",
    angelove: "check",
    cheapImports: "x",
    otherBrands: "x",
  },
  {
    labelKey: "europeanMade",
    angelove: "check",
    cheapImports: "x",
    otherBrands: "x",
  },
  {
    labelKey: "premiumCorduroy",
    angelove: "check",
    cheapImports: "x",
    otherBrands: "check",
  },
  {
    labelKey: "montessoriDesign",
    angelove: "check",
    cheapImports: "x",
    otherBrands: "x",
  },
  {
    labelKey: "washableCovers",
    angelove: "check",
    cheapImports: "x",
    otherBrands: "check",
  },
  {
    labelKey: "multiConfiguration",
    angelove: "check",
    cheapImports: "x",
    otherBrands: "x",
  },
];

function CheckIcon() {
  return (
    <span className="inline-flex items-center justify-center">
      <Check size={20} className="text-turquoise" strokeWidth={2.5} />
    </span>
  );
}

function CrossIcon() {
  return (
    <span className="inline-flex items-center justify-center">
      <X size={20} className="text-coral-dark" strokeWidth={2.5} />
    </span>
  );
}

function Cell({ value }: { value: CellValue }) {
  return value === "check" ? <CheckIcon /> : <CrossIcon />;
}

export async function WhyAngeLove() {
  const t = await getTranslations("WhyUs");

  return (
    <section className="bg-cream/40 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl text-brown">
            {t("title")}
          </h2>
          <p className="mt-3 text-brown-muted text-base sm:text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full rounded-2xl border border-cream/60 overflow-hidden text-sm sm:text-base">
            <thead>
              <tr className="bg-white">
                {/* Empty label column header */}
                <th className="text-left px-5 py-4 text-brown-muted font-semibold w-1/2 sm:w-auto" />

                {/* AngeLove — highlighted */}
                <th className="px-5 py-4 text-center bg-turquoise/5 border-x border-turquoise/30">
                  <span className="font-heading text-brown text-base sm:text-lg">
                    {t("angelove")}
                  </span>
                </th>

                {/* Cheap imports */}
                <th className="px-5 py-4 text-center">
                  <span className="font-semibold text-brown-muted text-sm sm:text-base">
                    {t("cheapImports")}
                  </span>
                </th>

                {/* Other brands */}
                <th className="px-5 py-4 text-center">
                  <span className="font-semibold text-brown-muted text-sm sm:text-base">
                    {t("otherBrands")}
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {ROWS.map(({ labelKey, angelove, cheapImports, otherBrands }, index) => (
                <tr
                  key={labelKey}
                  className={index % 2 === 0 ? "bg-white" : "bg-cream/20"}
                >
                  {/* Feature label */}
                  <td className="px-5 py-3.5 text-brown font-medium">
                    {t(labelKey)}
                  </td>

                  {/* AngeLove column — highlighted */}
                  <td className="px-5 py-3.5 text-center bg-turquoise/5 border-x border-turquoise/30">
                    <Cell value={angelove} />
                  </td>

                  {/* Cheap imports column */}
                  <td className="px-5 py-3.5 text-center">
                    <Cell value={cheapImports} />
                  </td>

                  {/* Other brands column */}
                  <td className="px-5 py-3.5 text-center">
                    <Cell value={otherBrands} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
