"use client";

import { Mouse } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { TargetAndTransition, Variants } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { site } from "@/content/site";
import { easeOut, fadeUp } from "@/lib/motion";

const SPRING = { stiffness: 100, damping: 30 } as const;

/** Quando o título começa a subir, e o intervalo entre as palavras. */
const TITLE_DELAY = 0.3;
const WORD_STAGGER = 0.06;

/** fadeUp com atraso: a transition do variant tem precedência sobre a prop. */
function withDelay(delay: number): Variants {
  const visible = fadeUp.visible as TargetAndTransition;
  return {
    hidden: fadeUp.hidden,
    visible: { ...visible, transition: { ...visible.transition, delay } },
  };
}

const toWords = (value: string) => value.split(/\s+/).filter(Boolean);

/**
 * Fatia o título em [antes, destaque, depois]. A pontuação colada no fim do
 * destaque vai junto dele, para não sobrar um ponto solto depois do sublinhado.
 */
function splitTitle(title: string, highlight: string) {
  const start = title.indexOf(highlight);
  if (start === -1) return { before: toWords(title), accent: [], after: [] };

  let rest = title.slice(start + highlight.length);
  let accent = highlight;

  const glued = rest.match(/^\S+/);
  if (glued) {
    accent += glued[0];
    rest = rest.slice(glued[0].length);
  }

  return {
    before: toWords(title.slice(0, start)),
    accent: toWords(accent),
    after: toWords(rest),
  };
}

/** Palavra que sobe de dentro de uma máscara. */
function Word({ children, index }: { children: string; index: number }) {
  return (
    <span className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 0.8,
          ease: easeOut,
          delay: TITLE_DELAY + index * WORD_STAGGER,
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Os hooks são sempre chamados na mesma ordem; com reduced motion muda só o
  // range (tudo fica parado), nunca a marcação — assim não há mismatch de SSR.
  const photoY = useSpring(
    useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 140]),
    SPRING,
  );
  const textY = useSpring(
    useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -80]),
    SPRING,
  );
  const textOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.8], reduced ? [1, 1] : [1, 0]),
    SPRING,
  );
  const wordX = useSpring(
    useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "-25%"]),
    SPRING,
  );
  const blobTurquoiseY = useSpring(
    useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 200]),
    SPRING,
  );
  const blobSandY = useSpring(
    useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -120]),
    SPRING,
  );

  const { before, accent, after } = splitTitle(
    site.hero.title,
    site.hero.titleHighlight,
  );
  const accentStart = before.length;
  const afterStart = accentStart + accent.length;
  const totalWords = afterStart + after.length;

  // O texto de apoio entra depois da última palavra do título.
  const titleEnd = TITLE_DELAY + totalWords * WORD_STAGGER;

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-[100svh] overflow-hidden bg-navy-deep text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--navy),var(--navy-deep))]"
      />
      <motion.div
        aria-hidden
        style={{ y: blobTurquoiseY }}
        className="pointer-events-none absolute -top-24 -right-20 size-[min(75vw,420px)] rounded-full bg-turquoise/30 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: blobSandY }}
        className="pointer-events-none absolute -bottom-24 -left-24 size-[min(70vw,380px)] rounded-full bg-sand/25 blur-3xl"
      />
      <motion.span
        aria-hidden
        style={{ x: wordX }}
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 font-display text-[22vw] leading-none font-extrabold text-transparent select-none [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]"
      >
        {site.hero.backdropWord}
      </motion.span>

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-6xl grid-rows-[auto_1fr] gap-8 px-5 pt-24 md:px-8 lg:grid-cols-2 lg:grid-rows-1 lg:items-center lg:gap-10 lg:pt-28">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="max-w-xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
            className="text-xs tracking-[0.2em] text-turquoise uppercase"
          >
            {site.hero.eyebrow}
          </motion.p>

          <h1
            aria-label={site.hero.title}
            className="mt-5 font-display text-4xl leading-[1.05] font-extrabold tracking-tight md:text-6xl lg:text-7xl"
          >
            <span aria-hidden>
              {before.map((word, index) => (
                <Word key={`b-${index}`} index={index}>
                  {word}
                </Word>
              ))}

              {/* O destaque quebra linha normalmente: travar a frase inteira com
                  whitespace-nowrap faria ela estourar a coluna do grid e sumir
                  atrás da foto. O sublinhado ancora só na última palavra. */}
              <span className="text-turquoise">
                {accent.map((word, index) => {
                  const isLast = index === accent.length - 1;
                  const node = (
                    <Word index={accentStart + index}>{word}</Word>
                  );

                  if (!isLast) return <span key={`a-${index}`}>{node}</span>;

                  return (
                    <span key={`a-${index}`} className="relative inline-block">
                      {node}
                      {/* Offset em `em` para o traço ficar abaixo das descidas
                          (0.22em nesta fonte) em qualquer tamanho de título. */}
                      <svg
                        aria-hidden
                        viewBox="0 0 200 10"
                        preserveAspectRatio="none"
                        className="absolute -bottom-[0.22em] left-0 h-[0.2em] w-[calc(100%-0.22em)] overflow-visible"
                      >
                        <motion.path
                          d="M2 7 C 52 1, 148 1, 198 6"
                          fill="none"
                          stroke="var(--sand)"
                          strokeWidth={3}
                          strokeLinecap="round"
                          vectorEffect="non-scaling-stroke"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.9, ease: easeOut, delay: 1 }}
                        />
                      </svg>
                    </span>
                  );
                })}
              </span>

              {after.map((word, index) => (
                <Word key={`c-${index}`} index={afterStart + index}>
                  {word}
                </Word>
              ))}
            </span>
          </h1>

          <motion.p
            variants={withDelay(titleEnd)}
            initial="hidden"
            animate="visible"
            className="mt-6 text-base text-white/70 md:text-lg"
          >
            {site.hero.subtitle}
          </motion.p>

          <motion.ul
            variants={withDelay(titleEnd + 0.15)}
            initial="hidden"
            animate="visible"
            className="mt-7 flex flex-wrap gap-2"
          >
            {site.hero.credentials.map((credential) => (
              <li
                key={credential}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80"
              >
                {credential}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          style={{ y: photoY }}
          // No mobile a foto ocupa o que sobra da dobra (a imagem é
          // object-contain, então encolhe junto) em vez de somar uma altura
          // fixa e empurrar o indicador de scroll para fora da tela.
          className="relative h-full min-h-0 w-full self-end lg:h-[85svh]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.08, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.1, ease: easeOut, delay: 0.4 }}
            className="relative h-full w-full"
          >
            <Image
              src={site.media.hero}
              alt={site.hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain object-bottom"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: easeOut, delay: 1.4 }}
        className="absolute inset-x-0 bottom-5 z-20 flex justify-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-navy-deep/40 px-3 py-1.5 text-xs text-white/60 backdrop-blur-sm">
          {site.hero.scrollHint}
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
            className="inline-flex"
          >
            <Mouse aria-hidden className="size-4" />
          </motion.span>
        </span>
      </motion.div>
    </section>
  );
}
