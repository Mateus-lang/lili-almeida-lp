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

  /*
    O `scale` aqui não é efeito: é a folga que o deslocamento em `y` precisa,
    senão translação abriria faixa vazia na borda. Por isso os dois andam
    juntos — 6% de sobra (3% por lado) cobrem um `y` de ±2,5%.
    Valores maiores (era 1.25/±8%) renderizavam a foto a ~1920 CSS px dentro
    de 1400, cortando 20% da altura: cabeça cortada e imagem ampliada.
  */
  const bgScale = reduced ? 1 : 1.06;
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["-2.5%", "2.5%"],
  );
  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [-60, 120],
  );
  const glowYSoft = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [80, -80],
  );

  return (
    <section
      ref={ref}
      id="sobre"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden text-white"
    >
      {/* Fundo de marca: é o que aparece atrás do texto no mobile. */}
      <div aria-hidden className="absolute inset-0 bg-navy-deep" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(130%_70%_at_80%_-10%,var(--navy),transparent_65%),radial-gradient(100%_60%_at_0%_110%,color-mix(in_oklab,var(--sand)_22%,transparent),transparent_70%)]"
      />
      {/* Fio turquesa no topo: separa a dobra da hero. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-turquoise/60 to-transparent"
      />

      {/* Brilhos que respiram devagar — vida sem custar legibilidade. */}
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
        className="pointer-events-none absolute top-[6%] -right-[28%] size-[92vw] max-w-[520px] rounded-full bg-turquoise/25 blur-3xl lg:top-auto lg:-bottom-[10%]"
      />
      <motion.div
        aria-hidden
        style={{ y: glowYSoft }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{
          duration: 14,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 1.5,
        }}
        className="pointer-events-none absolute bottom-[22%] -left-[30%] size-[82vw] max-w-[460px] rounded-full bg-sand/20 blur-3xl"
      />

      {/*
        A foto de fundo é 16:9 (1920x1081) e só entra no lg, onde o container
        também é landscape. Num retrato de 100svh o object-cover teria de
        ampliá-la — mostrava 26% da largura esticando 499px de origem para
        390 CSS px, daí o serrilhado — e no mobile o conteúdo ocupa a dobra
        inteira, sem espaço para uma faixa. Lá o fundo é o degradê de marca.
        O `sizes` de 1px evita que o celular baixe uma imagem que não vê.
      */}
      <div aria-hidden className="absolute inset-0 hidden lg:block">
        <motion.div
          style={{ scale: bgScale, y: bgY }}
          className="absolute inset-0"
        >
          <Image
            src={site.media.aboutBg}
            alt=""
            fill
            // O corte é horizontal: para cobrir a ALTURA o Next precisa servir
            // uma variante mais larga que a viewport (altura × 16/9), senão
            // entrega 570x320 e o browser amplia. O 1px no mobile evita baixar
            // uma imagem que está em display:none.
            sizes="(min-width: 1024px) 130vw, 1px"
            className="object-cover object-center"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/10" />
      </div>

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
