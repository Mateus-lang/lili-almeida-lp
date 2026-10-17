"use client";

import { cn } from "cn";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "light";
  external?: boolean;
  /** Substitui a seta padrão. Herda a mesma animação de hover. */
  icon?: ReactNode;
  className?: string;
};

const variants = {
  primary: "bg-turquoise text-navy-deep",
  light: "bg-white text-navy",
} as const;

/**
 * Botão de ação da página — usado no curso, no livro e no WhatsApp.
 * O brilho e a seta reagem ao hover do botão: o gesto do pai propaga o rótulo
 * da variante para os filhos, então eles só precisam declarar `variants`.
 */
export function CtaButton({
  href,
  children,
  variant = "primary",
  external = false,
  icon,
  className,
}: CtaButtonProps) {
  return (
    <motion.a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "relative inline-flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-full px-8 font-semibold",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise",
        "sm:w-auto",
        variants[variant],
        className,
      )}
      variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
    >
      <motion.span
        aria-hidden
        variants={{ rest: { x: "-120%" }, hover: { x: "220%" } }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />

      <span className="relative">{children}</span>

      <motion.span
        aria-hidden
        variants={{ rest: { x: 0 }, hover: { x: 4 } }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative inline-flex"
      >
        {icon ?? <ArrowUpRight className="size-5" />}
      </motion.span>
    </motion.a>
  );
}
