"use client";

import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useRef } from "react";

/**
 * Uma palavra que acende conforme o progresso passa pelo seu intervalo.
 * O `useTransform` precisa viver aqui dentro: chamado no `.map` do pai,
 * quebraria as regras dos hooks se o texto mudasse.
 */
function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

/** Texto que acende palavra a palavra conforme a página rola. */
export function ScrollRevealText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLQuoteElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <blockquote ref={ref} className={className}>
      <span className="sr-only">{text}</span>

      <span aria-hidden className="flex flex-wrap">
        <span className="mr-1 font-display text-4xl leading-none text-sand">
          “
        </span>
        {words.map((word, index) => (
          <Word
            key={`${word}-${index}`}
            progress={scrollYProgress}
            range={[index / words.length, (index + 1) / words.length]}
          >
            {word}
          </Word>
        ))}
        <span className="font-display text-4xl leading-none text-sand">”</span>
      </span>
    </blockquote>
  );
}
