"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { site } from "@/content/site";
import { easeOut } from "@/lib/motion";

/** Assinatura gigante que sobe quando o usuário chega ao fim da página. */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  // A subida acompanha o scroll. A opacidade vai por `whileInView`: ligada ao
  // mesmo progresso ela ficava presa no valor inicial — o elemento é baixo
  // (~11vw) e no fim da página o progresso satura, então o fade nunca rodava.
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["60%", "0%"],
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative h-[11vw] overflow-hidden select-none lg:h-[10vw]"
    >
      {/* O translate fixo joga parte dos glifos para fora: é o corte na
          borda inferior. O `y` do scroll compõe por cima, porque o Tailwind v4
          usa a propriedade `translate` e o motion escreve em `transform`. */}
      <motion.span
        style={{ y }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: easeOut }}
        className="absolute inset-x-0 bottom-0 block translate-y-[22%] text-center font-display text-[18vw] leading-none font-extrabold text-white/[0.06]"
      >
        {site.footer.brand}
      </motion.span>
    </div>
  );
}
