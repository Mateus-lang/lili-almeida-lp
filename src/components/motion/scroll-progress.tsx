"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Barra de progresso de leitura, fixa no topo da página. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    // Evita a barra "encher" sozinha quando a página abre já rolada.
    skipInitialAnimation: true,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-turquoise"
    />
  );
}
