"use client";

import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "angelove-announcement-dismissed";
const ROTATE_INTERVAL = 4000;

export function AnnouncementBar() {
  const t = useTranslations("Announcement");
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const messages = [
    t("freeShipping"),
    t("oekoTex"),
    t("shipping"),
  ] as const;

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      setDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;

    const interval = setInterval(() => {
      // Fade out
      setVisible(false);

      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 300);
    }, ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [dismissed, messages.length]);

  function handleDismiss() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setDismissed(true);
  }

  // Avoid hydration mismatch — render nothing on server
  if (!mounted || dismissed) return null;

  return (
    <div className="bg-brown text-cream/90 text-xs py-1.5 text-center relative flex items-center justify-center px-8">
      <span
        className="transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {messages[activeIndex]}
      </span>

      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-cream/60 hover:text-cream/90 transition-colors cursor-pointer"
      >
        <X size={12} />
      </button>
    </div>
  );
}
