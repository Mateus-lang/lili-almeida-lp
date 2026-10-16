"use client";

import { GraduationCap } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Variants } from "motion/react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { useRef, type ComponentType } from "react";

import { CountUp } from "@/components/motion/count-up";
import { AboutCarousel } from "@/components/sections/about-carousel";
import { site } from "@/content/site";
import { easeOut, fadeUp, staggerContainer } from "@/lib/motion";

/** `site.ts` guarda só a string do ícone — o componente mora aqui. */
const icons: Record<string, ComponentType<{ className?: string }>> = {
  instagram: FaInstagram,
  students: GraduationCap,
};

const titleReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.9, ease: easeOut },
  },
};

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Com reduced motion o range vira constante: mesma marcação, sem parallax.
  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1.25, 1],
  );
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["-8%", "8%"],
  );

  return (
    <section
      ref={ref}
      id="sobre"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden text-white"
    >
      <motion.div
        aria-hidden
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0"
      >
        <Image
          src={site.media.aboutBg}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/10"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-32 pb-16 md:px-8 lg:flex lg:items-end lg:justify-between lg:gap-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="lg:max-w-lg"
        >
          {/* O título se revela da esquerda para a direita. Precisa ser uma
              variant: o pai tem variants e propaga o rótulo para os filhos,
              então um whileInView com objeto inline aqui seria ignorado. */}
          <motion.h2
            variants={titleReveal}
            className="font-display text-5xl font-extrabold tracking-tight"
          >
            {site.about.title}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-md text-base text-white/80"
          >
            {site.about.text}
          </motion.p>

          {/* flex-wrap é rede de segurança: em telas mais estreitas que 390px
              o segundo item desce em vez de espremer o primeiro. */}
          <motion.ul
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-4"
          >
            {site.about.stats.map((stat) => {
              const Icon = icons[stat.icon];
              const isEmpty = stat.value === 0;

              return (
                <li key={stat.label} className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10">
                    {Icon ? <Icon className="size-5 text-sand" /> : null}
                  </span>

                  <span className="flex flex-col">
                    {isEmpty ? (
                      // Sem número ainda: o texto entra menor para os dois
                      // itens caberem lado a lado já em 390px.
                      <span className="text-base font-bold">
                        {stat.emptyLabel}
                      </span>
                    ) : (
                      <CountUp
                        value={stat.value}
                        decimals={stat.decimals}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        className="text-2xl font-bold"
                      />
                    )}
                    <span className="text-sm text-white/70">{stat.label}</span>
                  </span>
                </li>
              );
            })}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80, rotate: 3 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="mt-10 lg:mt-0 lg:w-[440px] lg:shrink-0"
        >
          <AboutCarousel />
        </motion.div>
      </div>
    </section>
  );
}
