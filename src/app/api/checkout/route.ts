import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductBySlug } from "@/lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2026-03-25.dahlia",
});

export async function POST(req: NextRequest) {
  try {
    const { items, locale } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const lineItems = items.map(
      (item: { slug: string; color: string; quantity: number; price: number }) => {
        const product = getProductBySlug(item.slug);
        const name = product
          ? `AngeLove ${item.slug.charAt(0).toUpperCase() + item.slug.slice(1)} — ${item.color}`
          : `AngeLove — ${item.color}`;

        return {
          price_data: {
            currency: "eur",
            product_data: {
              name,
              images: product
                ? [
                    `${process.env.NEXT_PUBLIC_URL || "https://website-beta-red.vercel.app"}${product.variants.find((v) => v.color === item.color)?.image || product.variants[0].image}`,
                  ]
                : [],
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        };
      }
    );

    const origin = req.headers.get("origin") || "https://website-beta-red.vercel.app";
    const localePrefix = locale || "en";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 999, currency: "eur" },
            display_name: "DHL Standard",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["DE", "FR", "AT", "IT", "ES"],
      },
      success_url: `${origin}/${localePrefix}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${localePrefix}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
