export interface ProductVariant {
  color: string;
  colorHex: string;
  image: string;
}

export interface Product {
  slug: string;
  key: string;
  price: number; // cents
  priceDisplay: string;
  variants: ProductVariant[];
  amazonUrl: string;
  badge: string | null;
  dimensions: string;
  rating: number;
  reviewCount: number;
}

export const PRODUCTS: Product[] = [
  {
    slug: "sofa",
    key: "sofa",
    price: 21900,
    priceDisplay: "€219",
    variants: [
      { color: "Cream", colorHex: "#E8DCC8", image: "/products/sofa-cream.jpg" },
      { color: "Rosa", colorHex: "#D4A5A5", image: "/products/sofa-pink.jpg" },
      { color: "Braun", colorHex: "#8B7355", image: "/products/sofa-brown.jpg" },
    ],
    amazonUrl: "https://www.amazon.de/dp/B0F43NYGZ1",
    badge: null,
    dimensions: "120 × 80 × 40 cm",
    rating: 4.7,
    reviewCount: 29,
  },
  {
    slug: "sessel",
    key: "sessel",
    price: 10900,
    priceDisplay: "€109",
    variants: [
      { color: "Beige", colorHex: "#C4A882", image: "/products/sessel-beige.jpg" },
      { color: "Rosa", colorHex: "#D4A5A5", image: "/products/sessel-pink.jpg" },
      { color: "Grün", colorHex: "#7A8B6F", image: "/products/sessel-green.jpg" },
    ],
    amazonUrl: "https://www.amazon.de/dp/B0DCNJPB7B",
    badge: null,
    dimensions: "80 × 60 × 40 cm",
    rating: 4.6,
    reviewCount: 54,
  },
  {
    slug: "huepfpolster",
    key: "huepfpolster",
    price: 10900,
    priceDisplay: "€109",
    variants: [
      { color: "Beige", colorHex: "#E8DCC8", image: "/products/huepfpolster-beige.png" },
      { color: "Türkis", colorHex: "#5BB8B0", image: "/products/huepfpolster-turquoise.png" },
    ],
    amazonUrl: "https://www.amazon.de/dp/B0GS3MJC4P",
    badge: "New",
    dimensions: "78 × 60 × 24 cm",
    rating: 0,
    reviewCount: 0,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
