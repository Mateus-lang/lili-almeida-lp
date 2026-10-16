/**
 * Fonte única de verdade do conteúdo da landing page.
 * Nenhum componente deve ter texto, link ou caminho de imagem fixo:
 * tudo vem daqui.
 */

/** Caminhos das imagens definitivas (precisam existir em public/images). */
const images = {
  hero: "/images/hero-lili.png",
  aboutBg: "/images/sobre-bg.jpg",
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

/** TODO: trocar pela foto real — virar para false quando public/images estiver preenchida. */
const usePlaceholders = true;

type Media = {
  hero: string;
  aboutBg: string;
  carousel: readonly string[];
  bookCover: string;
  og: string;
};

/** Caminhos que os componentes devem consumir. */
const media: Media = usePlaceholders ? imagesFallback : images;

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
      "Sou Lili Almeida, comunicadora baiana. Transformei bons-dias de 15 segundos em mais de 200 milhões de visualizações — e hoje ensino você a encontrar a sua voz.",
    credentials: ["Apresentadora GNT", "TEDx", "Autora pela Planeta"],
    scrollHint: "Role para conhecer",
    imageAlt: "Lili Almeida, comunicadora e mentora de storytelling",
    /** Palavra gigante de fundo, puramente decorativa. */
    backdropWord: "HISTÓRIA",
  },

  about: {
    eyebrow: "Sobre mim",
    title: "Eu acredito que ninguém esquece\numa história bem contada",
    paragraphs: [
      "Sou Lili Almeida, baiana, comunicadora e apaixonada pelo jeito que as palavras aproximam as pessoas. Aprendi cedo que história não é enfeite: é o que faz alguém confiar em você antes de comprar, contratar ou seguir.",
      "Hoje ensino profissionais, criadores e lideranças a transformar a própria vivência em comunicação que conecta — com técnica de narrativa, mas sem perder o sotaque, a graça e a verdade de cada um.",
      "Meu trabalho é tirar da sua boca a frase decorada e devolver a sua voz. O resto é prática — e eu te acompanho nela.",
    ],
    imageAlt: "Lili Almeida em uma palestra sobre storytelling",
    signature: "Lili Almeida",
    stats: [
      // TODO: dados reais (anos de experiência, alunos, palestras…)
      { value: "", label: "" },
    ],
  },

  course: {
    eyebrow: "O curso",
    name: "", // TODO: nome real do curso
    title: "O método para contar histórias que ficam",
    description:
      "Um caminho guiado para você sair do “não sei o que falar” e chegar a uma narrativa sua, afiada e pronta para usar em qualquer palco: reunião, vídeo, palco de verdade ou um story de celular.",
    modules: [
      {
        title: "Escuta e matéria-prima",
        description:
          "Como garimpar nas suas próprias memórias as histórias que merecem ser contadas.",
      },
      {
        title: "Estrutura narrativa",
        description:
          "Começo, tensão e virada: o esqueleto que sustenta qualquer boa história.",
      },
      {
        title: "Voz e presença",
        description:
          "Ritmo, pausa e corpo — o que transforma um texto bom em uma fala inesquecível.",
      },
      {
        title: "Storytelling aplicado",
        description:
          "Adaptando a mesma história para venda, aula, entrevista e redes sociais.",
      },
    ],
    forWho: {
      title: "Para quem é",
      items: [
        "Quem precisa falar em público e trava na hora",
        "Quem vende e quer ser lembrado, não só ouvido",
        "Quem ensina, lidera ou cria conteúdo",
        "Quem tem muita história e nenhuma organização",
      ],
    },
    price: "", // TODO: preço real
    priceNote: "", // TODO: condição real (parcelamento, lote, prazo)
    cta: { label: "Quero garantir minha vaga", href: "#" }, // TODO: link real do checkout
  },

  book: {
    eyebrow: "O livro",
    name: "", // TODO: título real do livro
    title: "Para ler com caneta na mão",
    description:
      "Um livro sobre o ofício de contar: as histórias que me formaram, os erros que me ensinaram e os exercícios que eu uso até hoje antes de subir em qualquer palco.",
    topics: [
      "Histórias e bastidores de quem vive de comunicar",
      "Exercícios curtos no fim de cada capítulo",
      "Um guia para voltar sempre que faltar assunto",
    ],
    coverAlt: "Capa do livro de Lili Almeida",
    cta: { label: "Quero meu exemplar", href: "#" }, // TODO: link real de compra
  },

  community: {
    eyebrow: "A comunidade",
    title: "Contar histórias se aprende\nem roda, não sozinha",
    description:
      "Um grupo para praticar sem medo de errar: desafios de narrativa, devolutivas sinceras e gente querendo melhorar junto, toda semana.",
    benefits: [
      {
        title: "Desafios semanais",
        description: "Um exercício curto por semana para manter a prática viva.",
      },
      {
        title: "Devolutiva de verdade",
        description:
          "Você conta, a roda escuta e devolve o que funcionou e o que ainda não.",
      },
      {
        title: "Encontros ao vivo",
        description: "Conversas abertas para destravar dúvidas e treinar fala.",
      },
    ],
    galleryAlt: "Encontro da comunidade de storytelling",
    cta: { label: "Quero entrar no grupo", href: "#" }, // TODO: link real do grupo
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
