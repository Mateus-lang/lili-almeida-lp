"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef } from "react";

import { site } from "@/content/site";

/** Percentual da faixa percorrido por segundo quando a página está parada. */
const BASE_SPEED = 2.5;

export function FooterMarquee() {
  const reduced = useReducedMotion() ?? false;

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });

  // Quanto a rolagem acelera a faixa. `clamp: false` deixa passar dos limites
  // num scroll muito rápido, que é justamente a graça.
  const boost = useTransform(smooth, [-2000, 0, 2000], [-4, 0, 4], {
    clamp: false,
  });
  // A inclinação, ao contrário, fica presa entre -8° e 8°.
  const skewX = useTransform(smooth, [-2000, 2000], [8, -8], { clamp: true });

  // A lista é renderizada duas vezes: andar de 0% a -50% completa um ciclo
  // exato, então o `wrap` reinicia sem salto visível.
  const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`);

  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;

    let move = ((-BASE_SPEED * delta) / 1000) * direction.current;

    // Rolar para baixo empurra a faixa para um lado; para cima, para o outro.
    const current = boost.get();
    if (current < 0) direction.current = -1;
    else if (current > 0) direction.current = 1;

    move += move * Math.abs(current);
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="overflow-hidden border-b border-white/10 py-6">
      <motion.div style={{ x, skewX }} className="flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0">
            {site.footer.marquee.map((phrase) => (
              <span
                key={phrase}
                className="flex items-center font-display text-3xl font-extrabold tracking-tight whitespace-nowrap uppercase lg:text-6xl"
              >
                {phrase}
                <span className="px-4 text-turquoise lg:px-8">✦</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
