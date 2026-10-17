"use client";

import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";

import { site } from "@/content/site";
import { easeOut } from "@/lib/motion";

export function BackToTop() {
  return (
    <motion.button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={site.footer.backToTop}
      whileHover={{ y: -3, borderColor: "var(--turquoise)" }}
      whileFocus={{ y: -3, borderColor: "var(--turquoise)" }}
      transition={{ duration: 0.25, ease: easeOut }}
      className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise"
    >
      <ArrowUp className="size-4" />
    </motion.button>
  );
}
