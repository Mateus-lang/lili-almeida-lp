"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Variants } from "motion/react";
import { useRef } from "react";

import { ScrollRevealText } from "@/components/motion/scroll-reveal-text";
import { BookCover3D } from "@/components/sections/book-cover-3d";
import { CtaButton } from "@/components/ui/cta-button";
import { site } from "@/content/site";
import { easeOut, fadeUp, staggerContainer } from "@/lib/motion";

const chipIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const reveal = {
  variants: staggerContainer,
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, amount: 0.3 },
};

const { book } = site;

export function Book() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const numberY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["15%", "-15%"],
  );

  return (
    <section
      ref={ref}
      id="livro"
      className="relative overflow-hidden bg-navy py-24 text-white lg:py-32"
    >
      <motion.span
        aria-hidden
        style={{ y: numberY }}
        className="pointer-events-none absolute top-1/2 -right-6 -translate-y-1/2 font-display text-[40vw] leading-none font-extrabold text-white/[0.04] select-none will-change-transform lg:text-[22rem]"
      >
        {book.backdropNumber}
      </motion.span>

      {/*
        No mobile a capa entra entre o título e o lead, então o texto vai em
        dois blocos ordenados por flex. No lg eles voltam para a coluna da
        direita por posicionamento explícito no grid — evita `display:contents`,
        que tiraria a caixa do elemento e impediria o whileInView de disparar.
      */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col px-5 md:px-8 lg:grid lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-20">
        <BookCover3D className="order-2 mx-auto my-10 w-[220px] lg:order-none lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:my-0 lg:w-[340px]" />

        <motion.div
          {...reveal}
          className="order-1 lg:col-start-2 lg:row-start-1"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold tracking-widest text-turquoise uppercase"
          >
            {book.eyebrow}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-4xl leading-tight font-extrabold tracking-tight lg:text-6xl"
          >
            {book.title}
          </motion.h2>
        </motion.div>

        <motion.div
          {...reveal}
          className="order-3 lg:col-start-2 lg:row-start-2"
        >
          <motion.p variants={fadeUp} className="text-lg text-white/85">
            {book.lead}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 text-base text-white/65">
            {book.body}
          </motion.p>

          <motion.div variants={fadeUp}>
            <ScrollRevealText
              text={book.quote}
              className="mt-8 font-display text-2xl leading-snug lg:text-3xl"
            />
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            className="mt-8 flex flex-wrap gap-2"
          >
            {book.chips.map((chip) => (
              <motion.li
                key={chip}
                variants={chipIn}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/80"
              >
                {chip}
              </motion.li>
            ))}
          </motion.ul>

          <motion.p variants={fadeUp} className="mt-8 text-sand italic">
            {book.tagline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-5">
            <CtaButton href={site.links.bookPurchase} external>
              {book.cta.label}
            </CtaButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
