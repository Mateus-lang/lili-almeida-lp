"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { site } from "@/content/site";
import { easeOut } from "@/lib/motion";

const DESKTOP_QUERY = "(min-width: 1024px)";

const overlay = {
  hidden: { clipPath: "circle(0% at 100% 0%)" },
  visible: {
    clipPath: "circle(150% at 100% 0%)",
    transition: { duration: 0.6, ease: easeOut },
  },
  exit: {
    clipPath: "circle(0% at 100% 0%)",
    transition: { duration: 0.6, ease: easeOut },
  },
};

const list = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);

  /**
   * Fechar sem navegar (Esc, breakpoint) devolve o foco ao botão — senão ele
   * cai no <body>. No clique em link não: o usuário quer ir para a seção,
   * e roubar o foco de volta para o menu atrapalharia a navegação.
   */
  const fechar = useCallback(() => {
    setOpen(false);
    botao.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") fechar();
    };

    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) fechar();
    };

    // Guarda o valor anterior em vez de assumir "" ao restaurar.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, fechar]);

  return (
    <div className="lg:hidden">
      <button
        ref={botao}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? site.nav.closeLabel : site.nav.menuLabel}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="relative z-50 grid size-11 place-items-center text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
      >
        <span className="sr-only">
          {open ? site.nav.closeLabel : site.nav.menuLabel}
        </span>
        <span aria-hidden className="relative block h-4 w-6">
          <motion.span
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="absolute inset-x-0 top-0 block h-0.5 origin-center rounded-full bg-current"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="absolute inset-x-0 bottom-0 block h-0.5 origin-center rounded-full bg-current"
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-navy-deep text-white"
          >
            <motion.nav
              variants={list}
              initial="hidden"
              animate="visible"
              className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-5 md:px-8"
            >
              <ul className="flex flex-col gap-2">
                {site.nav.items.map((entry) => (
                  <motion.li key={entry.href} variants={item}>
                    <a
                      href={entry.href}
                      onClick={() => setOpen(false)}
                      className="inline-flex min-h-11 items-center font-display text-4xl font-bold tracking-tight"
                    >
                      {entry.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div variants={item} className="mt-10">
                <div aria-hidden className="h-px w-full bg-sand/40" />
                <a
                  href={site.links.instagram}
                  className="mt-6 inline-flex min-h-11 items-center text-sm text-sand"
                >
                  {site.nav.handle}
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
