"use client";

import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { site } from "@/content/site";
import { easeOut } from "@/lib/motion";

export function AboutCarousel({ className }: { className?: string }) {
  // useState com inicializador lazy: instância estável entre renders, sem ler
  // ref durante o render (o lint do projeto barra esse padrão).
  const [autoplay] = useState(() =>
    Autoplay({
      delay: 2800,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;

    const sync = () => {
      setSnaps(api.scrollSnapList());
      setSelected(api.selectedScrollSnap());
    };

    sync();
    api.on("select", sync);
    api.on("reInit", sync);

    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  return (
    <div className={className}>
      <Carousel
        // setApi é lido num efeito com [api, setApi]: o setter do useState tem
        // identidade estável, então o efeito não re-roda a cada render.
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        plugins={[autoplay]}
      >
        <CarouselContent>
          {site.about.carousel.map((slide) => (
            <CarouselItem
              key={slide.src + slide.alt}
              className="basis-[46%] lg:basis-1/2"
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 1024px) 220px, 46vw"
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* O default do shadcn põe as setas fora da caixa (-left-12/-right-12)
            e com fundo creme: aqui elas vêm para dentro e ficam translúcidas. */}
        <CarouselPrevious className="hidden border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white lg:inline-flex lg:left-2" />
        <CarouselNext className="hidden border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white lg:inline-flex lg:right-2" />
      </Carousel>

      <div className="mt-4 flex items-center justify-center gap-1">
        {snaps.map((_, index) => {
          const isActive = index === selected;

          return (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={`Ir para o slide ${index + 1}`}
              aria-current={isActive}
              // Alvo de toque de 44px com o traço desenhado dentro.
              className="grid h-11 w-8 place-items-center"
            >
              <motion.span
                layout
                transition={{ duration: 0.35, ease: easeOut }}
                className={`block h-1 rounded-full ${
                  isActive ? "w-6 bg-turquoise" : "w-1.5 bg-white/35"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
