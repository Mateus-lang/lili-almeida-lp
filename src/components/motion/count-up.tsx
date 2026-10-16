"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

type CountUpProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Duração da contagem, em segundos. */
  duration?: number;
  className?: string;
};

/**
 * Conta de zero até `value` quando entra na viewport — uma única vez.
 * O leitor de tela recebe o número pronto; só o visual é animado.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion() ?? false;

  const count = useMotionValue(0);
  const text = useTransform(count, (latest) => {
    const formatted = latest.toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (!inView) return;

    if (reduced) {
      count.set(value);
      return;
    }

    const controls = animate(count, value, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, reduced, count, value, duration]);

  const finalText = `${prefix}${value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{finalText}</span>
      <motion.span aria-hidden>{text}</motion.span>
    </span>
  );
}
