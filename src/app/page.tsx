import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { About } from "@/components/sections/about";
import { Book } from "@/components/sections/book";
import { Community } from "@/components/sections/community";
import { Course } from "@/components/sections/course";
import { Hero } from "@/components/sections/hero";

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

      <SiteFooter />
    </>
  );
}
