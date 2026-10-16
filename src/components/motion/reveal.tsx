"use client";

import { motion } from "motion/react";
import type { TargetAndTransition, Variants } from "motion/react";
import { useMemo, type ReactNode } from "react";

import { fadeUp } from "@/lib/motion";

/** Tags suportadas pelo Reveal (todas existem em `motion.*`). */
type RevealTag =
  | "div"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "ul"
  | "li"
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3";

type RevealProps = {
  /** Elemento renderizado. Padrão: "div". */
  as?: RevealTag;
  /** Atraso da entrada, em segundos. */
  delay?: number;
  className?: string;
  children?: ReactNode;
};

/**
 * Revela o conteúdo quando ele entra na viewport, uma única vez.
 * Anima só opacity e y (transform).
 */
export function Reveal({
  as = "div",
  delay = 0,
  className,
  children,
}: RevealProps) {
  // O `delay` entra dentro do variant: a transition do variant tem precedência
  // sobre a prop `transition`, então passá-lo por fora seria ignorado.
  const variants = useMemo<Variants>(() => {
    if (!delay) return fadeUp;

    const visible = fadeUp.visible as TargetAndTransition;
    return {
      hidden: fadeUp.hidden,
      visible: { ...visible, transition: { ...visible.transition, delay } },
    };
  }, [delay]);

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </Component>
  );
}
