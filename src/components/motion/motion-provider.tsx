"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Configuração global de animação.
 * `reducedMotion="user"` respeita o "reduzir movimento" do sistema:
 * desliga transform/layout e mantém só opacidade e cor.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
