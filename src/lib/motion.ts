import type { Variants } from "motion/react";

/**
 * Curva de easing padrão da página (ease-out suave).
 * O tipo `BezierDefinition` do motion é `readonly`, então `as const` serve direto.
 */
export const easeOut = [0.22, 1, 0.36, 1] as const;

/** Entrada padrão: sobe 32px e aparece. Só opacity e transform. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

/** Pai que escalona a entrada dos filhos. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};
