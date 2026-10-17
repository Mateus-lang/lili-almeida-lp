"use client";

import { Bell, Sparkles, Sun } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { FaWhatsapp } from "react-icons/fa";
import { useRef, type ComponentType } from "react";

import { PhoneChat } from "@/components/sections/phone-chat";
import { CtaButton } from "@/components/ui/cta-button";
import { site } from "@/content/site";
import { easeOut, fadeUp, staggerContainer } from "@/lib/motion";

/** `site.ts` guarda só a string do ícone — o componente mora aqui. */
const icons: Record<string, ComponentType<{ className?: string }>> = {
  Sun,
  Bell,
  Sparkles,
};

const iconIn: Variants = {
  hidden: { rotate: -20, scale: 0.5 },
  visible: {
    rotate: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const { community } = site;
const [titleBefore, titleAfter] = community.title.split(
  community.titleHighlight,
);

export function Community() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const inView = useInView(ref, { amount: 0.2 });
  const animar = inView && !reduced;

  return (
    <section
      ref={ref}
      id="grupo"
      className="relative overflow-hidden bg-sand-soft py-24 text-navy lg:py-32"
    >
      {/* Anel decorativo atrás do celular. */}
      <motion.div
        aria-hidden
        animate={animar ? { rotate: 360 } : undefined}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        className="pointer-events-none absolute top-1/2 left-1/2 size-[90vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sand/50 lg:left-[72%]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 md:px-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold tracking-widest text-navy uppercase"
          >
            {community.eyebrow}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-display text-4xl leading-tight font-extrabold tracking-tight lg:text-5xl"
          >
            {titleBefore}
            <span className="text-turquoise">{community.titleHighlight}</span>
            {titleAfter}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base text-navy/70 md:text-lg"
          >
            {community.subtitle}
          </motion.p>

          <motion.ul variants={staggerContainer} className="mt-8 space-y-4">
            {community.benefits.map((benefit) => {
              const Icon = icons[benefit.icon];

              return (
                <motion.li
                  key={benefit.text}
                  variants={fadeUp}
                  className="flex items-center gap-3"
                >
                  <motion.span
                    variants={iconIn}
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-turquoise shadow-sm"
                  >
                    {Icon ? <Icon className="size-5" /> : null}
                  </motion.span>
                  <span className="text-base text-navy/80">{benefit.text}</span>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-10">
            <CtaButton
              href={site.links.whatsapp}
              external
              icon={<FaWhatsapp className="size-5" />}
            >
              {community.cta.label}
            </CtaButton>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-4 text-sm text-navy/70">
            {community.microcopy}
          </motion.p>
        </motion.div>

        <PhoneChat className="mt-14 lg:mt-0" />
      </div>
    </section>
  );
}
