"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef, useSyncExternalStore } from "react";

import { site } from "@/content/site";

const TILT_SPRING = { stiffness: 150, damping: 15 } as const;
const SCROLL_SPRING = { stiffness: 100, damping: 30 } as const;
/** Inclinação máxima que o mouse provoca, em graus. */
const MAX_TILT = 10;

const HOVER_QUERY = "(hover: hover)";

function subscribeHover(onChange: () => void) {
  const query = window.matchMedia(HOVER_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getHoverSnapshot() {
  return window.matchMedia(HOVER_QUERY).matches;
}

export function BookCover3D({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  // matchMedia só existe no browser. useSyncExternalStore resolve os dois
  // lados: o snapshot do servidor é `false` (sem window) e o cliente lê o
  // valor real — sem setState dentro de efeito, e reagindo se o aparelho
  // ganhar um mouse.
  const canHover = useSyncExternalStore(
    subscribeHover,
    getHoverSnapshot,
    () => false,
  );

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Camada 1: a capa gira de perfil para a frente conforme entra na tela.
  const scrollRotateY = useSpring(
    useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-35, 0]),
    SCROLL_SPRING,
  );
  const scrollRotateX = useSpring(
    useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [10, 0]),
    SCROLL_SPRING,
  );

  // Camada 2: o tilt do mouse. Fica num elemento separado porque as duas
  // rotações escreveriam rotateX/rotateY no mesmo transform e se anulariam.
  const tiltX = useSpring(useMotionValue(0), TILT_SPRING);
  const tiltY = useSpring(useMotionValue(0), TILT_SPRING);

  // Posição do brilho, em porcentagem da capa.
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.25), transparent 55%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canHover || reduced) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    tiltY.set((px - 0.5) * 2 * MAX_TILT);
    tiltX.set((0.5 - py) * 2 * MAX_TILT);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const handlePointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <div
      ref={ref}
      style={{ perspective: 1200 }}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        style={{
          rotateY: scrollRotateY,
          rotateX: scrollRotateX,
          transformStyle: "preserve-3d",
        }}
        className="will-change-transform"
      >
        <motion.div
          style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
          className="relative aspect-[2/3] w-full overflow-hidden rounded-l-sm rounded-r-lg shadow-[30px_40px_80px_-20px_rgba(0,0,0,0.6)]"
        >
          <Image
            src={site.media.bookCover}
            alt={site.book.coverAlt}
            fill
            sizes="(min-width: 1024px) 340px, 220px"
            className="object-cover"
          />

          {/* Lombada */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 to-transparent"
          />

          {/* Brilho que segue o ponteiro */}
          <motion.div
            aria-hidden
            style={{ background: glow }}
            className="pointer-events-none absolute inset-0"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
