import { SiteHeader } from "@/components/layout/site-header";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { About } from "@/components/sections/about";
import { Book } from "@/components/sections/book";
import { Community } from "@/components/sections/community";
import { Course } from "@/components/sections/course";
import { Hero } from "@/components/sections/hero";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />

      <main className="flex-1">
        <Hero />
        <About />
        <Course />
        <Book />
        <Community />
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
