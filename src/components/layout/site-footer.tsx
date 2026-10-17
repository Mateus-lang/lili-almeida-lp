import { Globe } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import type { ComponentType } from "react";

import { BackToTop } from "@/components/layout/back-to-top";
import { FooterMarquee } from "@/components/layout/footer-marquee";
import { FooterWordmark } from "@/components/layout/footer-wordmark";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/content/site";

const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  Instagram: FaInstagram,
  Site: Globe,
};

const columnTitle =
  "text-xs font-semibold tracking-widest text-sand uppercase";

/**
 * Sublinhado animado igual ao do menu, mas em CSS puro: assim o rodapé
 * continua Server Component, sem precisar de uma ilha client só para o hover.
 */
function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      className="group relative inline-flex items-center gap-2 py-1 text-white/70 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
    >
      {children}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-turquoise transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </a>
  );
}

export function SiteFooter() {
  const { footer, nav } = site;
  const showContact = footer.contact.email !== "";

  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <FooterMarquee />

      <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8">
        {/* Sem e-mail, o bloco de contato não existe — o grid acompanha para
            não deixar uma coluna vazia no desktop. */}
        <div
          className={`grid gap-10 ${showContact ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
        >
          <Reveal>
            <p className="font-display text-xl font-extrabold tracking-tight">
              {footer.brand}
              <span className="text-turquoise">.</span>
            </p>
            <p className="mt-4 max-w-xs text-sm text-white/60">
              {footer.about}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className={columnTitle}>{footer.navTitle}</p>
            <ul className="mt-4 flex flex-col gap-1">
              {nav.items.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <p className={columnTitle}>{footer.socialTitle}</p>
            <ul className="mt-4 flex flex-col gap-1">
              {footer.social.map((entry) => {
                const Icon = socialIcons[entry.label];

                return (
                  <li key={entry.href}>
                    <FooterLink href={entry.href} external>
                      {Icon ? (
                        <Icon className="size-4 text-sand" />
                      ) : null}
                      {entry.handle}
                    </FooterLink>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {showContact ? (
            <Reveal delay={0.3}>
              <p className={columnTitle}>{footer.contact.title}</p>
              <p className="mt-4 text-sm text-white/60">
                {footer.contact.label}
              </p>
              <FooterLink href={`mailto:${footer.contact.email}`}>
                {footer.contact.email}
              </FooterLink>
            </Reveal>
          ) : null}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-white/50">
            <p>{footer.copyright}</p>
            <p className="mt-1">{footer.credit}</p>
          </div>

          <BackToTop />
        </div>
      </div>

      <FooterWordmark />
    </footer>
  );
}
