"use client";

import { Check, Play } from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

import { site } from "@/content/site";
import { easeOut } from "@/lib/motion";

const SPRING = { stiffness: 100, damping: 30 } as const;
const { mockup } = site.course;

/**
 * Entrada (no elemento de fora) e flutuação contínua (no de dentro) ficam
 * separadas de propósito: as duas escrevem `y`, e no mesmo elemento uma
 * sobrescreveria a outra.
 */
function Floating({
  children,
  className,
  from,
  delay,
  duration,
  still,
}: {
  children: ReactNode;
  className: string;
  from: { x?: number; y?: number };
  delay: number;
  duration: number;
  still: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: easeOut, delay }}
      className={className}
    >
      <motion.div
        animate={still ? undefined : { y: [0, -10, 0] }}
        transition={{ duration, ease: "easeInOut", repeat: Infinity }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function CourseMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const inView = useInView(ref, { amount: 0.2 });
  const parado = reduced || !inView;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-4, 4]),
    SPRING,
  );
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [40, -40]),
    SPRING,
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative h-[440px] w-full select-none lg:h-[470px]"
    >
      <motion.div
        style={{ rotate, y }}
        className="absolute inset-0 will-change-transform"
      >
        {/* Player */}
        <Floating
          className="absolute inset-x-0 top-0"
          from={{ y: 60 }}
          delay={0}
          duration={5}
          still={parado}
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-navy-deep shadow-2xl">
            <div className="absolute inset-x-0 top-0 flex items-center gap-2 p-4 md:p-5">
              <span className="rounded-full bg-turquoise/20 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-turquoise uppercase">
                {mockup.lessonTag}
              </span>
            </div>

            <div className="absolute inset-0 grid place-items-center">
              <span className="relative grid size-14 place-items-center rounded-full bg-turquoise text-navy-deep">
                <Play className="size-5 translate-x-px fill-current" />
                <motion.span
                  animate={
                    parado ? undefined : { scale: [1, 1.6], opacity: [0.6, 0] }
                  }
                  transition={{ duration: 2, ease: "easeOut", repeat: Infinity }}
                  className="absolute inset-0 rounded-full ring-2 ring-turquoise"
                />
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
              <p className="font-display text-sm font-bold text-white md:text-base">
                {mockup.lessonTitle}
              </p>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/15">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 0.62 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.2, ease: easeOut, delay: 0.5 }}
                  className="h-full w-full origin-left rounded-full bg-turquoise"
                />
              </div>
            </div>
          </div>
        </Floating>

        {/* Módulos */}
        <Floating
          className="absolute bottom-0 left-0 w-[86%] max-w-[320px] lg:-left-6"
          from={{ x: -60 }}
          delay={0.2}
          duration={6}
          still={parado}
        >
          <div className="rounded-2xl bg-white p-4 shadow-xl md:p-5">
            <p className="text-[10px] font-semibold tracking-widest text-navy/50 uppercase">
              {mockup.modulesTitle}
            </p>
            <ul className="mt-3 space-y-2.5">
              {mockup.modules.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.5,
                    ease: easeOut,
                    delay: 0.45 + index * 0.12,
                  }}
                  className="flex items-start gap-2.5 text-xs text-navy md:text-sm"
                >
                  <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-turquoise text-navy-deep">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </Floating>

        {/* Selo: ao vivo */}
        <Floating
          className="absolute top-4 right-0 max-w-[60%]"
          from={{ x: 60 }}
          delay={0.35}
          duration={7}
          still={parado}
        >
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-lg">
            <motion.span
              animate={reduced ? undefined : { opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
              className="size-2 shrink-0 rounded-full bg-red-500"
            />
            <span className="truncate text-[11px] font-semibold text-navy">
              {mockup.badgeLive}
            </span>
          </div>
        </Floating>

        {/* Selo: comunidade */}
        <Floating
          className="absolute right-0 bottom-16 max-w-[70%]"
          from={{ x: 60 }}
          delay={0.5}
          duration={6.5}
          still={parado}
        >
          <div className="flex items-center gap-2.5 rounded-full bg-white px-3 py-2 shadow-lg">
            <span className="flex -space-x-2">
              {mockup.avatars.map((initial, index) => (
                <span
                  key={initial}
                  className={`grid size-6 place-items-center rounded-full text-[10px] font-bold text-white ring-2 ring-white ${
                    ["bg-sand", "bg-turquoise", "bg-navy"][index % 3]
                  }`}
                >
                  {initial}
                </span>
              ))}
            </span>
            <span className="truncate text-[11px] font-semibold text-navy">
              {mockup.badgeCommunity}
            </span>
          </div>
        </Floating>
      </motion.div>
    </div>
  );
}
