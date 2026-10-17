"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";

import { CourseMockup } from "@/components/sections/course-mockup";
import { CtaButton } from "@/components/ui/cta-button";
import { site } from "@/content/site";
import { easeOut, fadeUp, staggerContainer } from "@/lib/motion";

/** Cada linha do título sobe de dentro da própria máscara. */
const lineReveal: Variants = {
  hidden: { y: "100%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: easeOut } },
};

const { course } = site;

export function Course() {
  return (
    <section
      id="curso"
      className="relative overflow-hidden bg-cream py-24 text-navy lg:py-32"
    >
      {/* Detalhe de fundo, atrás do mockup. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-[20%] size-[80vw] max-w-[620px] -translate-y-1/2 rounded-full bg-sand-soft blur-3xl"
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
            className="inline-flex rounded-full bg-turquoise-soft px-3 py-1.5 text-xs font-semibold tracking-widest text-navy uppercase"
          >
            {course.eyebrow}
          </motion.p>

          <motion.h2
            variants={staggerContainer}
            aria-label={course.title}
            className="mt-6 font-display text-4xl leading-tight font-extrabold tracking-tight lg:text-6xl"
          >
            {course.titleLines.map((line) => {
              const [before, after] = line.split(course.titleHighlight);
              const hasHighlight = after !== undefined;

              return (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <motion.span variants={lineReveal} className="block">
                    {hasHighlight ? (
                      <>
                        {before}
                        <span className="text-turquoise">
                          {course.titleHighlight}
                        </span>
                        {after}
                      </>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              );
            })}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base text-navy/70 md:text-lg"
          >
            {course.subtitle}
          </motion.p>

          <motion.ul variants={staggerContainer} className="mt-8 space-y-3.5">
            {course.bullets.map((bullet) => (
              <motion.li
                key={bullet}
                variants={fadeUp}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-turquoise text-navy-deep">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span className="text-base text-navy/80">{bullet}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-10">
            <CtaButton href={site.links.courseCheckout} external>
              {course.cta.label}
            </CtaButton>
          </motion.div>
        </motion.div>

        <div className="mt-14 lg:mt-0">
          <CourseMockup />
        </div>
      </div>
    </section>
  );
}
