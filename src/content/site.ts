/**
 * Fonte única de verdade do conteúdo da landing page.
 * Nenhum componente deve ter texto, link ou caminho de imagem fixo:
 * tudo vem daqui.
 */

/** Caminhos das imagens definitivas (precisam existir em public/images). */
const images = {
  hero: "/images/hero-lili.png",
  aboutBg: "/images/sobre-bg.png",
  carousel: [
    "/images/carousel-1.jpg",
    "/images/carousel-2.jpg",
    "/images/carousel-3.jpg",
    "/images/carousel-4.jpg",
    "/images/carousel-5.jpg",
  ],
  bookCover: "/images/livro-capa.png",
  og: "/images/og.jpg",
} as const;

/**
 * Placeholders nas mesmas proporções das imagens definitivas, para a build
 * não quebrar enquanto as fotos reais não chegam.
 * TODO: trocar pelas fotos reais (colocar em public/images) e virar
 * `usePlaceholders` para false.
 */
const imagesFallback = {
  hero: "https://placehold.co/1200x1500/png", // 4:5 retrato
  aboutBg: "https://placehold.co/1920x1080/png", // 16:9
  carousel: [
    "https://placehold.co/800x1000/png",
    "https://placehold.co/800x1000/png",
    "https://placehold.co/800x1000/png",
    "https://placehold.co/800x1000/png",
    "https://placehold.co/800x1000/png",
  ],
  bookCover: "https://placehold.co/800x1200/png", // 2:3 capa
  og: "https://placehold.co/1200x630/png", // 1.91:1 Open Graph
} as const;

/**
 * Chaves cujo arquivo real já está em public/images.
 * Vire para `true` ao subir cada arquivo — quem estiver em `false` continua
 * servindo o placeholder, sem 404.
 */
const hasRealFile = {
  hero: true,
  aboutBg: true, // TODO: sobre-bg.jpg
  carousel: true, // TODO: carousel-1.jpg … carousel-5.jpg (tudo ou nada)
  bookCover: false, // TODO: livro-capa.png
  og: false, // TODO: og.jpg
};

type Media = {
  hero: string;
  aboutBg: string;
  carousel: readonly string[];
  bookCover: string;
  og: string;
};

/** Caminhos que os componentes devem consumir. */
const media: Media = {
  hero: hasRealFile.hero ? images.hero : imagesFallback.hero,
  aboutBg: hasRealFile.aboutBg ? images.aboutBg : imagesFallback.aboutBg,
  carousel: hasRealFile.carousel ? images.carousel : imagesFallback.carousel,
  bookCover: hasRealFile.bookCover
    ? images.bookCover
    : imagesFallback.bookCover,
  og: hasRealFile.og ? images.og : imagesFallback.og,
};

export const site = {
  links: {
    siteUrl: "https://lilialmeida.com.br", // TODO: domínio real
    instagram: "#", // TODO: link real
    youtube: "#", // TODO: link real
    tiktok: "#", // TODO: link real
    linkedin: "#", // TODO: link real
    whatsapp: "#", // TODO: link real
    email: "", // TODO: e-mail real de contato
    courseCheckout: "#", // TODO: link real do checkout do curso
    bookPurchase: "#", // TODO: link real de compra do livro
    communityInvite: "#", // TODO: link real de entrada no grupo
  },

  nav: {
    /** O ponto turquesa do fim é decoração do componente, não faz parte do nome. */
    brand: "Lili Almeida",
    homeHref: "#inicio",
    items: [
      { label: "Sobre", href: "#sobre" },
      { label: "Curso", href: "#curso" },
      { label: "Livro", href: "#livro" },
      { label: "Comunidade", href: "#grupo" },
    ],
    menuLabel: "Abrir menu",
    closeLabel: "Fechar menu",
    handle: "@lilialmeida",
  },

  hero: {
    eyebrow: "Storytelling · Comunicação · Palavra que alimenta",
    title: "Conte a sua história de um jeito que ninguém esquece.",
    /** Precisa ser um trecho exato de `title`: é ele que recebe o destaque e o sublinhado. */
    titleHighlight: "ninguém esquece",
    subtitle:
      "Sou Lili Almeida, comunicadora baiana. Transformei bons-dias de 15 segundos em mais de 200 milhões de visualizações, e hoje ensino você a encontrar a sua voz.",
    credentials: ["Apresentadora GNT", "TEDx", "Autora pela Planeta"],
    scrollHint: "Role para conhecer",
    imageAlt: "Lili Almeida, comunicadora e mentora de storytelling",
    /** Palavra gigante de fundo, puramente decorativa. */
    backdropWord: "HISTÓRIA",
  },

  about: {
    title: "Sobre mim",
    text: "Sou comunicadora, escritora e cozinheira baiana. Aprendi com minha avó que palavra é alimento — e é isso que levo para a TV, para os palcos e para as redes. Do Mestre do Sabor ao GNT e ao TEDx, sigo espalhando fé, gentileza e esperança para quem cruza o meu caminho.",
    stats: [
      {
        icon: "instagram",
        value: 1.3,
        decimals: 1,
        prefix: "",
        suffix: " mi",
        label: "seguidores",
        emptyLabel: "",
      },
      {
        // TODO: [NÚMERO DE ALUNAS] — enquanto for 0, a dobra mostra
        // "Turma fundadora" no lugar do número.
        icon: "students",
        value: 0,
        decimals: 0,
        prefix: "+",
        suffix: "",
        label: "alunas",
        emptyLabel: "Turma fundadora",
      },
    ],
    carousel: [
      { src: media.carousel[0], alt: "Lili Almeida em palestra" },
      { src: media.carousel[1], alt: "Lili Almeida gravando para a TV" },
      { src: media.carousel[2], alt: "Lili Almeida no palco do TEDx" },
      { src: media.carousel[3], alt: "Lili Almeida cozinhando" },
      {
        src: media.carousel[4],
        alt: "Lili Almeida com a plateia depois de um encontro",
      },
    ],
  },

  course: {
    eyebrow: "Turma fundadora",
    title: "A história que só você pode contar",
    /**
     * Quebra manual: CSS não conta para o JS onde a linha quebrou, e a
     * revelação é linha a linha. `title` segue inteiro no aria-label.
     */
    titleLines: ["A história que", "só você", "pode contar"],
    titleHighlight: "você",
    subtitle:
      "Sua comunicação define o lugar que você ocupa. Aqui eu te ensino a transformar as suas vivências em histórias que conectam, emocionam e fazem quem te escuta lembrar de você.",
    // TODO: confirmar os bullets com a Lili
    bullets: [
      "Descubra a história-assinatura que só você tem",
      "Estruture narrativas com começo, meio e virada",
      "Fale com verdade nas redes, no palco e no trabalho",
      "Ganhe segurança para usar a sua própria voz",
    ],
    /** O href vem de links.courseCheckout. */
    cta: { label: "Quero entrar na turma" },
    mockup: {
      lessonTag: "Aula 1",
      lessonTitle: "Sua história-assinatura",
      modulesTitle: "Módulos",
      modules: [
        "Raízes: de onde vem a sua voz",
        "Estrutura: começo, meio e virada",
        "Palco: contar ao vivo e nas redes",
      ],
      badgeLive: "Ao vivo com a Lili",
      badgeCommunity: "Comunidade de alunas",
      avatars: ["L", "M", "J"],
    },
  },

  book: {
    eyebrow: "Meu primeiro livro",
    title: "A gente merece ser feliz agora",
    lead: "101 reflexões para lembrar quem você é, num mundo que vive tentando te fazer esquecer.",
    body: "Minhas mensagens de bom-dia viraram livro. Em cada página, o olhar de quem observa a vida se mistura a ditados, músicas, trechos de grandes obras e frases de personagens da história — um convite para você acender a sua luz e iluminar também o caminho de quem cruza o seu.",
    quote:
      "Quer um conselho? Como vão julgar você de qualquer jeito, siga seu coração e faça o que te faz feliz.",
    tagline: "A palavra alimenta.",
    chips: ["101 reflexões", "Selo Academia", "Editora Planeta"],
    /** Número gigante do fundo, puramente decorativo. */
    backdropNumber: "101",
    coverAlt:
      "Capa do livro A gente merece ser feliz agora, de Lili Almeida",
    /** O href vem de links.bookPurchase. */
    cta: { label: "Quero meu exemplar" },
  },

  community: {
    eyebrow: "Comunidade gratuita",
    title: "Comece o dia com uma palavra que alimenta.",
    /** Precisa ser um trecho exato de `title`: é ele que sai em turquesa. */
    titleHighlight: "palavra que alimenta",
    subtitle:
      "Entre no grupo da Lili no WhatsApp e receba, direto no seu celular, mensagens de fé, gentileza e coragem — e fique sabendo antes de todo mundo das novas turmas, lançamentos e encontros.",
    benefits: [
      { icon: "Sun", text: "Bons-dias para começar o dia com o coração leve" },
      { icon: "Bell", text: "Avisos de turmas e lançamentos em primeira mão" },
      { icon: "Sparkles", text: "Bastidores e conteúdos que não vão para o feed" },
    ],
    /** O href vem de links.whatsapp. */
    cta: { label: "Quero entrar no grupo" },
    microcopy: "É gratuito e você sai quando quiser.",
    chat: {
      groupName: "Bom dia com a Lili",
      groupMeta: "Lili Almeida, você e mais pessoas",
      avatarInitials: "LA",
      messages: [
        "Bom dia, minha gente! ☀️",
        "Hoje eu só quero te lembrar de uma coisa…",
        "A gente merece ser feliz agora. Não depois. Agora. 💛",
      ],
      reaction: "💛 128",
    },
  },

  footer: {
    brand: "Lili Almeida",
    tagline: "Comunicação e storytelling para quem tem algo a dizer.",
    navTitle: "Navegue",
    socialTitle: "Onde me encontrar",
    contactTitle: "Contato",
    social: [
      { label: "Instagram", href: "#" }, // TODO: link real
      { label: "YouTube", href: "#" }, // TODO: link real
      { label: "TikTok", href: "#" }, // TODO: link real
    ],
    // Ano fixo de propósito: new Date() em módulo importado por client component
    // causa divergência de hidratação na virada do ano.
    legal: "© 2026 Lili Almeida. Todos os direitos reservados.",
    credits: "", // TODO: crédito de fotos/design, se houver
  },

  images,
  imagesFallback,
  media,
} as const;

export type Site = typeof site;
