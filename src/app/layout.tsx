import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { MotionProvider } from "@/components/motion/motion-provider";
import { site } from "@/content/site";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  // Obrigatório: sem metadataBase, o caminho relativo da imagem de OG
  // quebra a build no Next 16.
  metadataBase: new URL(site.links.siteUrl),
  title: "Lili Almeida | Storytelling",
  description:
    "Mentoria de comunicação e storytelling para quem quer contar a própria história com verdade, presença e estratégia.",
  openGraph: {
    title: "Lili Almeida | Storytelling",
    description:
      "Mentoria de comunicação e storytelling para quem quer contar a própria história com verdade, presença e estratégia.",
    url: "/",
    siteName: "Lili Almeida",
    locale: "pt_BR",
    type: "website",
    images: [{ url: site.media.og, width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      // Mantém o scroll instantâneo em navegação de rota, preservando o
      // scroll-behavior: smooth das âncoras (Next 16 não faz mais isso sozinho).
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
