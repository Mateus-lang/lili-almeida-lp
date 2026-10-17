"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { site } from "@/content/site";
import { easeOut } from "@/lib/motion";

const { chat } = site.community;

/** Quanto tempo o "digitando" fica no ar, e a pausa entre mensagens. */
const TYPING_MS = 900;
const PAUSE_MS = 500;

function TypingBubble() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25, ease: easeOut }}
      className="w-fit rounded-2xl rounded-tl-sm bg-white px-3 py-2.5 shadow-sm"
    >
      <span className="flex gap-1">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 0.9,
              ease: "easeInOut",
              repeat: Infinity,
              delay: dot * 0.15,
            }}
            className="block size-1.5 rounded-full bg-navy/35"
          />
        ))}
      </span>
    </motion.div>
  );
}

export function PhoneChat({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: true, amount: 0.5 });

  // Estado inicial = o que o servidor renderiza, então não há divergência
  // de hidratação quando a página recarrega no meio da sequência.
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);
  const [reacted, setReacted] = useState(false);

  // Com movimento reduzido a conversa já aparece pronta. É valor derivado,
  // não estado sincronizado — evita setState dentro do efeito.
  const showAll = reduced && inView;
  const visibleCount = showAll ? chat.messages.length : visible;
  const showReaction = showAll || reacted;

  useEffect(() => {
    if (!inView || reduced) return;

    // Todos os ids ficam guardados: o cleanup limpa a fila inteira, o que
    // evita setState depois de desmontar se a página recarregar no meio.
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;

    chat.messages.forEach((_, index) => {
      timers.push(setTimeout(() => setTyping(true), elapsed));
      elapsed += TYPING_MS;

      timers.push(
        setTimeout(() => {
          setTyping(false);
          setVisible(index + 1);
        }, elapsed),
      );
      elapsed += PAUSE_MS;
    });

    timers.push(setTimeout(() => setReacted(true), elapsed + 300));

    return () => timers.forEach(clearTimeout);
  }, [inView, reduced]);

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      <motion.div
        initial={{ opacity: 0, y: 80, rotate: 6 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: easeOut }}
      >
        {/* Flutuação num elemento próprio: no mesmo `y` da entrada, uma
            sobrescreveria a outra. */}
        <motion.div
          animate={reduced ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          className="mx-auto w-[280px] lg:w-[320px]"
        >
          <div className="relative aspect-[9/19] rounded-[2.75rem] bg-navy-deep p-3 shadow-2xl">
            <div className="relative h-full overflow-hidden rounded-[2.25rem] bg-cream">
              {/* Notch */}
              <div className="absolute top-2 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />

              <div className="flex items-center gap-3 bg-navy px-4 pt-9 pb-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-turquoise/15 text-sm font-bold text-turquoise">
                  {chat.avatarInitials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-white">
                    {chat.groupName}
                  </span>
                  <span className="block truncate text-[11px] text-white/55">
                    {chat.groupMeta}
                  </span>
                </span>
              </div>

              <div className="flex flex-col items-start gap-2 p-3">
                {chat.messages.slice(0, visibleCount).map((message, index) => {
                  const isLast = index === chat.messages.length - 1;

                  return (
                    <motion.div
                      key={message}
                      layout
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease: easeOut }}
                      className="relative w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 shadow-sm"
                    >
                      <p className="text-sm text-navy">{message}</p>
                      <span className="mt-1 block text-right text-[10px] text-navy/40">
                        {`07:0${index}`}
                      </span>

                      {isLast && showReaction ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.15, 1] }}
                          transition={{ duration: 0.5, ease: easeOut }}
                          className="absolute -right-2 -bottom-3 rounded-full bg-white px-2 py-0.5 text-[11px] shadow"
                        >
                          {chat.reaction}
                        </motion.span>
                      ) : null}
                    </motion.div>
                  );
                })}

                <AnimatePresence mode="popLayout">
                  {typing ? <TypingBubble key="typing" /> : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
