"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { site } from "@/content/site";
import { easeOut } from "@/lib/motion";

/** A partir daqui o fundo do header aparece. */
const SCROLL_BACKDROP = 40;
/** Abaixo disso o header nunca se esconde (topo da página). */
const SCROLL_LOCK = 120;

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    setScrolled(latest > SCROLL_BACKDROP);
    setHidden(latest < SCROLL_LOCK ? false : latest > previous);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: easeOut }}
      className="fixed inset-x-0 top-0 z-50 h-[72px] text-white"
    >
      {/* Camada de fundo separada: só a opacidade anima, o blur não pisca. */}
      <motion.div
        aria-hidden
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.35, ease: easeOut }}
        className="absolute inset-0 border-b border-white/10 bg-navy-deep/70 backdrop-blur-md"
      />

      <div className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-between px-5 md:px-8">
        <a
          href={site.nav.homeHref}
          // z-50 mantém a marca acima do overlay do menu mobile (z-40).
          className="relative z-50 inline-flex h-11 items-center font-display text-lg font-extrabold tracking-tight"
        >
          {site.nav.brand}
          <span className="text-turquoise">.</span>
        </a>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {site.nav.items.map((item) => (
              <li key={item.href}>
                <motion.a
                  href={item.href}
                  initial="rest"
                  whileHover="active"
                  whileFocus="active"
                  animate="rest"
                  className="relative inline-flex h-11 items-center text-sm font-medium"
                >
                  {item.label}
                  <motion.span
                    aria-hidden
                    variants={{ rest: { scaleX: 0 }, active: { scaleX: 1 } }}
                    transition={{ duration: 0.35, ease: easeOut }}
                    className="absolute inset-x-0 bottom-2 h-px origin-left bg-turquoise"
                  />
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>

        <MobileMenu />
      </div>
    </motion.header>
  );
}
