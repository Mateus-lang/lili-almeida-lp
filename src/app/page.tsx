import { SiteHeader } from "@/components/layout/site-header";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { site } from "@/content/site";

/**
 * Dobras ainda em placeholder: curso, livro e grupo.
 * Cada uma virará um componente em src/components/sections/.
 */

const sections = [
  { id: "curso", tone: "navy" },
  { id: "livro", tone: "cream" },
  { id: "grupo", tone: "navy" },
] as const;

const tones = {
  cream: "bg-cream text-navy",
  sand: "bg-sand-soft text-navy",
  navy: "bg-navy-deep text-cream",
} as const;

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />

      <main className="flex-1">
        <Hero />
        <About />

        {sections.map(({ id, tone }) => {
          const label = site.nav.items.find((item) => item.href === `#${id}`)
            ?.label;

          return (
            <section
              key={id}
              id={id}
              className={`grid min-h-screen place-items-center ${tones[tone]}`}
            >
              <div className="mx-auto w-full max-w-6xl px-5 text-center md:px-8">
                <p className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">
                  {label}
                </p>
              </div>
            </section>
          );
        })}
      </main>

      <footer className="bg-navy text-cream">
        <div className="mx-auto w-full max-w-6xl px-5 py-12 text-center md:px-8">
          <p className="font-display text-xl font-bold">{site.footer.brand}</p>
          <p className="mt-2 text-sm text-cream/70">{site.footer.tagline}</p>
          <p className="mt-6 text-xs text-cream/50">{site.footer.legal}</p>
        </div>
      </footer>
    </>
  );
}
