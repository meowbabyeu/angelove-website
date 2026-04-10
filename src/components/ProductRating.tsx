"use client";

import { Star, ExternalLink } from "lucide-react";

interface Props {
  rating: number;
  reviewCount: number;
  amazonUrl: string;
}

export function ProductRating({ rating, reviewCount, amazonUrl }: Props) {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            size={16}
            className="text-amber-400 fill-amber-400"
          />
        ))}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={16}
            className="text-brown-muted/20"
          />
        ))}
      </div>

      <span className="text-sm font-medium text-brown">{rating.toFixed(1)}</span>

      <a
        href={amazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-sm text-turquoise hover:text-turquoise-dark transition-colors cursor-pointer"
      >
        ({reviewCount} reviews on Amazon)
        <ExternalLink size={12} />
      </a>
    </div>
  );
}
