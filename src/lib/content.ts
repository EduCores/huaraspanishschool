export type Locale = 'en' | 'es';
export type L = { en: string; es: string };

export type Category = 'presencial' | 'online' | 'surf';
export type Unit = 'week' | 'hour' | 'month';

export type Program = {
  id: string;
  cat: Category;
  badge: L;
  bc: 'orange' | 'sand';
  tag: L;
  unit: Unit;
  title: L;
  desc: L;
  price: number;
  priceWk?: number;
  img: string;
  colors: string[];
  startDays: number;
  spots: number;
};

export type MethodItem = {
  num: string;
  icon: 'chat' | 'pot' | 'bag' | 'compass';
  title: L;
  desc: L;
};

export type EditorialCard = {
  eyebrow: L;
  title: L;
  text: L;
  img: string;
  programId: string;
};

export type Review = {
  id: string;
  author: L;
  meta: L;
  quote: string;
  source: 'Google' | 'Instagram';
};

export type CommunityPhoto = {
  src: string;
  alt: string;
  caption: L;
};

export type FaqItem = { q: L; a: L };

export type LookbookImage = { src: string; alt: string };

export type SiteContent = {
  siteName: string;
  domain: string;
  contact: {
    address: string;
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    hours: L;
    mapsUrl: string;
  };
  social: {
    instagram: string;
    facebook: string;
  };
  reviews: {
    score: number;
    count: number;
    googleUrl: string;
    writeUrl: string;
    placeId: string;
  };
  hero: {
    eyebrow: L;
    title1: L;
    title2: L;
    sub: L;
    cta1: L;
    cta2: L;
    img: string;
  };
  promo: L[];
  marquee: string[];
  programs: Program[];
  editorial: EditorialCard[];
  method: MethodItem[];
  surf: {
    eyebrow: L;
    title: L;
    desc: L;
    img: string;
    programId: string;
  };
  lookbook: {
    h: LookbookImage[];
    v: LookbookImage[];
  };
  story: {
    eyebrow: L;
    paragraphs: { en: string[]; es: string[] };
    sign: L;
    name: string;
  };
  community: {
    eyebrow: L;
    heading: L;
    photos: CommunityPhoto[];
    reviews: Review[];
    instagram: LookbookImage[];
    facebook: string[];
  };
  faq: FaqItem[];
  footer: {
    tagline: L;
    payment: L;
    methods: string[];
  };
  legal: {
    privacy: string;
    cookies: string;
    terms: string;
  };
  seo: {
    ogImage: string;
    logo: string;
  };
  analyticsId: string;
  surfTarget?: string | null;
};

const img = (name: string) => `/img/${name}`;

export const DEFAULT_CONTENT: SiteContent = {
  siteName: 'Huara Spanish School',
  domain: 'https://huaraspanishschool.com',
  contact: {
    address: 'Pasaje Vista Hermosa 0248, Pichilemu, Chile',
    phone: '+56953336046',
    phoneDisplay: '+56 9 5333 6046',
    whatsapp: '56953336046',
    hours: { en: 'Mon–Fri 10:00–13:00', es: 'De lunes a viernes de 10:00 a 13:00' },
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Pasaje%20Vista%20Hermosa%200248%2C%20Pichilemu%2C%20Chile',
  },
  social: {
    instagram: 'https://www.instagram.com/huaraspanishschool/',
    facebook: 'https://www.facebook.com/huaraspanishschool/?locale=es_LA',
  },
  reviews: {
    score: 4.8,
    count: 54,
    googleUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJAy6rOtlZYZYRRvxF42G0Ng4',
    writeUrl:
      'https://search.google.com/local/writereview?placeid=ChIJAy6rOtlZYZYRRvxF42G0Ng4',
    placeId: 'ChIJAy6rOtlZYZYRRvxF42G0Ng4',
  },
  hero: {
    eyebrow: { en: 'Pichilemu - Chile 🇨🇱', es: 'Pichilemu - Chile 🇨🇱' },
    title1: { en: 'Spanish School for', es: 'Español hecho para' },
    title2: { en: 'Movement', es: 'moverse' },
    sub: {
      en: 'Three lines for the classroom<br>Small groups max 5<br>house with terrace<br>— plus surf in Pichilemu.',
      es: 'Tres líneas para el aula<br>Grupos pequeños máx. 5<br>casa con terraza<br>— más surf en Pichilemu.',
    },
    cta1: { en: 'See the programs', es: 'Ver los programas' },
    cta2: { en: 'Our story', es: 'Nuestra historia' },
    img: img('pichilemu/hero-mar.jpg'),
  },
  promo: [
    { en: '● Spanish + Surf — Summer 2026 enroll open', es: '● Spanish + Surf — Inscripciones verano 2026 abiertas' },
    { en: '● Max 5 per group', es: '● Máximo 5 por grupo' },
    { en: '● Online via Google Meet', es: '● Online vía Google Meet' },
  ],
  marquee: ['SURF °', 'ESPAÑOL °', 'PICHILEMU °'],
  programs: [
    {
      id: 'group',
      cat: 'presencial',
      badge: { en: 'Max 5 students', es: 'Máx 5 alumnos' },
      bc: 'orange',
      tag: { en: 'A1–C1 · In-person', es: 'A1–C1 · Presencial' },
      unit: 'week',
      title: { en: 'Group Class', es: 'Clase Grupal' },
      desc: {
        en: 'Master Spanish in an intimate setting with a maximum of 5 students per class. We group you by level for a personalized pace, focusing on practical language you\'ll actually use while traveling through Latin America. 15 hours per week.',
        es: 'Aprende español en un ambiente cercano, con máximo 5 alumnos por clase. Te agrupamos por nivel para un ritmo personalizado, con foco en el español práctico que usarás al viajar por Latinoamérica. 15 horas por semana.',
      },
      price: 210,
      priceWk: 200,
      img: img('pichilemu/clase-grupal.jpg'),
      colors: ['#1c6e8c', '#c3623f', '#35594a'],
      startDays: 4,
      spots: 5,
    },
    {
      id: 'private',
      cat: 'presencial',
      badge: { en: '1-on-1', es: 'Personalizada' },
      bc: 'sand',
      tag: { en: 'All levels · In-person', es: 'Todos los niveles · Presencial' },
      unit: 'week',
      title: { en: 'Private Lessons', es: 'Clases Privadas' },
      desc: {
        en: 'Need a flexible schedule to catch the best waves? Private lessons adapt to your lifestyle, with undivided attention from our teachers and the topics that interest you most. The fastest way to gain confidence in the "Real Chile". 15 hours per week.',
        es: '¿Necesitas un horario flexible para pillar las mejores olas? Las clases privadas se adaptan a tu ritmo, con atención exclusiva de nuestros profesores y los temas que más te interesan. La forma más rápida de ganar confianza en el "Chile real". 15 horas por semana.',
      },
      price: 260,
      priceWk: 250,
      img: img('pichilemu/clase-privada.jpg'),
      colors: ['#c3623f', '#e9dcc3'],
      startDays: 4,
      spots: 3,
    },
    {
      id: 'surf-pack',
      cat: 'surf',
      badge: { en: 'Bestseller', es: 'Más vendido' },
      bc: 'orange',
      tag: { en: 'A1–B2 · Spanish + Surf', es: 'A1–B2 · Español + Surf' },
      unit: 'week',
      title: { en: 'Spanish & Surf Package', es: 'Pack Español & Surf' },
      desc: {
        en: 'Why choose between catching waves and learning a new language? Mornings mastering Spanish, afternoons conquering the Pacific with a top-rated surf school in Pichilemu. 15 hours of Spanish + 4 group surf classes per week, board & wetsuit included.',
        es: '¿Para qué elegir entre las olas y un nuevo idioma? Mañanas de español y tardes en el Pacífico con una de las mejores escuelas de surf de Pichilemu. 15 horas de español + 4 clases grupales de surf por semana, con tabla y traje incluidos.',
      },
      price: 270,
      priceWk: 260,
      img: img('pichilemu/surf.jpg'),
      colors: ['#0e4457', '#f4a261'],
      startDays: 4,
      spots: 3,
    },
    {
      id: 'private-hour',
      cat: 'presencial',
      badge: { en: 'Per hour', es: 'Por hora' },
      bc: 'sand',
      tag: { en: 'All levels · In-person', es: 'Todos los niveles · Presencial' },
      unit: 'hour',
      title: { en: 'Private Lesson — per hour', es: 'Clase Privada — por hora' },
      desc: {
        en: 'Book private lessons by the hour, whenever it fits your plans.',
        es: 'Reserva clases privadas por hora, cuando calcen con tus planes.',
      },
      price: 20,
      img: img('pichilemu/clase-sofa.jpg'),
      colors: ['#35594a', '#111'],
      startDays: 4,
      spots: 3,
    },
    {
      id: 'online-8h',
      cat: 'online',
      badge: { en: '8 h / month', es: '8 h / mes' },
      bc: 'orange',
      tag: { en: 'All levels · Online', es: 'Todos los niveles · Online' },
      unit: 'month',
      title: { en: 'Online — 8 hours per month', es: 'Online — 8 horas al mes' },
      desc: {
        en: 'Learn Spanish before you travel to Pichilemu. Practical, real-life Spanish and cultural immersion so you arrive ready to connect with Chile. 8 hours per month via video call.',
        es: 'Aprende español antes de viajar a Pichilemu. Español práctico para la vida real e inmersión cultural, para que llegues listo para conectar con Chile. 8 horas al mes por videollamada.',
      },
      price: 150,
      img: img('pichilemu/online.jpg'),
      colors: ['#111', '#888'],
      startDays: 2,
      spots: 6,
    },
    {
      id: 'online-hour',
      cat: 'online',
      badge: { en: 'Per hour', es: 'Por hora' },
      bc: 'sand',
      tag: { en: 'All levels · Online', es: 'Todos los niveles · Online' },
      unit: 'hour',
      title: { en: 'Online — per hour', es: 'Online — por hora' },
      desc: {
        en: 'Online Spanish classes by the hour. Don\'t just visit Chile — connect with Chile.',
        es: 'Clases de español online por hora. No solo visites Chile: conecta con Chile.',
      },
      price: 20,
      img: img('pichilemu/escuela-mesa.jpg'),
      colors: ['#1c6e8c', '#c3623f'],
      startDays: 2,
      spots: 6,
    },
  ],
  editorial: [
    {
      eyebrow: { en: '01 — IN-PERSON', es: '01 — PRESENCIAL' },
      title: { en: 'Immersion in Pichilemu', es: 'Inmersión en Pichilemu' },
      text: {
        en: '15h/week · Group (max 5) from $200/week · Private from $250/week',
        es: '15h/sem · Grupal (máx 5) desde $200/sem · Privada desde $250/sem',
      },
      img: img('pichilemu/grupo-tabla.jpg'),
      programId: 'group',
    },
    {
      eyebrow: { en: '02 — ONLINE', es: '02 — ONLINE' },
      title: { en: 'Learn from anywhere', es: 'Aprende desde donde sea' },
      text: {
        en: 'Learn before you travel · 8 h/month $150 · or $20/hour',
        es: 'Aprende antes de viajar · 8 h/mes $150 · o $20/hora',
      },
      img: img('pichilemu/online.jpg'),
      programId: 'online-8h',
    },
  ],
  method: [
    {
      num: '01',
      icon: 'chat',
      title: { en: "Chilean slang you'll use", es: 'Chilenismos que sí usarás' },
      desc: {
        en: 'Cachai, bacán, fome… local words and expressions from day one.',
        es: 'Cachai, bacán, fome… palabras y expresiones locales desde el día uno.',
      },
    },
    {
      num: '02',
      icon: 'pot',
      title: { en: 'Recipes & ingredients', es: 'Recetas e ingredientes' },
      desc: {
        en: 'Chilean kitchen vocabulary learned by cooking: pebre, sopaipillas, once.',
        es: 'Vocabulario de cocina chilena aprendido cocinando: pebre, sopaipillas, once.',
      },
    },
    {
      num: '03',
      icon: 'bag',
      title: { en: 'Numbers at the market', es: 'Números en la feria' },
      desc: {
        en: 'Prices, change and bargaining while shopping for real.',
        es: 'Precios, vuelto y regateo practicando compras reales.',
      },
    },
    {
      num: '04',
      icon: 'compass',
      title: { en: 'Real-life conversation', es: 'Conversación real' },
      desc: {
        en: 'Hotels, tours, restaurants and daily life: speak from day one.',
        es: 'Hotel, tours, restaurantes y vida diaria: habla desde el día uno.',
      },
    },
  ],
  surf: {
    eyebrow: { en: '● SPANISH + SURF° — BESTSELLER', es: '● SPANISH + SURF° — MÁS VENDIDO' },
    title: {
      en: 'Mornings of Spanish, afternoons of waves.',
      es: 'Mañanas de español, tardes de olas.',
    },
    desc: {
      en: '15h Spanish + 4 group surf classes per week, board & wetsuit included · $270 for 1 week, $260/week from 2 weeks. Next group starts in:',
      es: '15h de español + 4 clases grupales de surf por semana, con tabla y traje incluidos · $270 por 1 semana, $260/semana desde 2 semanas. El próximo grupo empieza en:',
    },
    img: img('pichilemu/surf.jpg'),
    programId: 'surf-pack',
  },
  lookbook: {
    h: [
      { src: img('1h.jpg'), alt: 'Huara Spanish School 1' },
      { src: img('2h.jpg'), alt: 'Huara Spanish School 2' },
      { src: img('3h.jpg'), alt: 'Huara Spanish School 3' },
      { src: img('4h.jpg'), alt: 'Huara Spanish School 4' },
      { src: img('5h.jpg'), alt: 'Huara Spanish School 5' },
      { src: img('6h.jpg'), alt: 'Huara Spanish School 6' },
      { src: img('7h.jpg'), alt: 'Huara Spanish School 7' },
      { src: img('8h.jpg'), alt: 'Huara Spanish School 8' },
      { src: img('9h.jpg'), alt: 'Huara Spanish School 9' },
      { src: img('10h.jpg'), alt: 'Huara Spanish School 10' },
    ],
    v: [
      { src: img('1v.jpg'), alt: 'Huara Spanish School 1' },
      { src: img('2v.jpg'), alt: 'Huara Spanish School 2' },
      { src: img('3v.jpg'), alt: 'Huara Spanish School 3' },
      { src: img('4v.jpg'), alt: 'Huara Spanish School 4' },
      { src: img('5v.jpg'), alt: 'Huara Spanish School 5' },
      { src: img('6v.jpg'), alt: 'Huara Spanish School 6' },
      { src: img('7v.jpg'), alt: 'Huara Spanish School 7' },
      { src: img('8v.jpg'), alt: 'Huara Spanish School 8' },
      { src: img('9v.jpg'), alt: 'Huara Spanish School 9' },
      { src: img('10v.jpg'), alt: 'Huara Spanish School 10' },
      { src: img('11v.jpg'), alt: 'Huara Spanish School 11' },
      { src: img('12v.jpg'), alt: 'Huara Spanish School 12' },
    ],
  },
  story: {
    eyebrow: { en: '● OUR STORY', es: '● NUESTRA HISTORIA' },
    paragraphs: {
      en: [
        "Twenty years ago, it all started with a passion, a passion for teaching Spanish, connecting cultures and changing lives through language. What began as one teacher's journey, became something much bigger.",
        'I´m Katterina, I´ve been teaching Spanish to people from all over the world. 13 years ago, I created Huara Spanish School, not just as a school, but as a completely different learning experience. It´s a place where tourists don´t just learn Spanish, they live it. Because here language is more than grammar and vocabulary. It´s sharing meals, exploring local traditions, laughing with new friends and feeling at home, even miles away.',
        'Every class is guided with care, dedication and heart.',
        'My goal is creating a community that lives the “Real Chile”, that enjoys visiting the local market, falls in love with our products, and shares a meal connecting with all our life history. Seeing that regardless of our place of origin, we all share something that creates a bond that will be forever in our memories.',
        'At Huara, every student is more than just a learner, you become part of something real. It´s an experience that transforms the way you see language and the way you see the world.',
      ],
      es: [
        'Hace veinte años todo empezó con una pasión: enseñar español, conectar culturas y cambiar vidas a través del idioma. Lo que comenzó como el viaje de una profesora se convirtió en algo mucho más grande.',
        'Soy Katterina y llevo años enseñando español a personas de todo el mundo. Hace 13 años creé Huara Spanish School, no solo como una escuela, sino como una experiencia de aprendizaje completamente diferente. Es un lugar donde los turistas no solo aprenden español: lo viven. Porque aquí el idioma es más que gramática y vocabulario. Es compartir comidas, explorar tradiciones locales, reír con nuevos amigos y sentirse en casa, incluso a miles de kilómetros.',
        'Cada clase está guiada con cariño, dedicación y corazón.',
        'Mi objetivo es crear una comunidad que viva el “Chile real”, que disfrute visitar la feria local, se enamore de nuestros productos y comparta una comida conectando con toda nuestra historia. Ver que, sin importar nuestro lugar de origen, todos compartimos algo que crea un vínculo que quedará para siempre en nuestra memoria.',
        'En Huara, cada estudiante es más que un alumno: te vuelves parte de algo real. Es una experiencia que transforma la forma en que ves el idioma y el mundo.',
      ],
    },
    sign: {
      en: 'Huara Spanish School, learn Spanish, live the culture, feel at Home.',
      es: 'Huara Spanish School, aprende español, vive la cultura, siéntete en casa.',
    },
    name: '— Katterina',
  },
  community: {
    eyebrow: { en: '● COMMUNITY', es: '● COMUNIDAD' },
    heading: { en: 'What our students say', es: 'Lo que dicen nuestros estudiantes' },
    photos: [
      { src: img('comunidad/feria.jpg'), alt: 'Huara students at the Pichilemu market', caption: { en: 'At the market', es: 'En la feria' } },
      { src: img('comunidad/bar.jpg'), alt: 'Huara students practicing Spanish at a bar', caption: { en: 'Spanish in real life', es: 'Español en la vida real' } },
      { src: img('comunidad/cena.jpg'), alt: 'Huara students and teachers at dinner', caption: { en: 'Part of the family', es: 'Parte de la familia' } },
    ],
    reviews: [
      {
        id: 'g1',
        author: { en: 'Huara student', es: 'Estudiante de Huara' },
        meta: { en: 'Google review · 5 stars', es: 'Reseña en Google · 5 estrellas' },
        quote:
          "I would really recommend going to Pichilemu and doing at least a week of classes here. It isn't like a normal Spanish school in a classroom, it is so much more. Katterina welcomed us into her home and we felt like we became part of the family. I had lessons with Katterina where we chatted for hours but also went over some grammar weaknesses in a more structured way. My partner was with Katterina's daughter, Sayay, and he had so much fun learning and playing games - they were constantly laughing. We went to the market, the circus and a bar throughout the week with them so we could practice our Spanish in real life situations. It was such a good way to learn Spanish but also to immerse ourselves in the culture which you can't get at a normal school. I wish we could've stayed longer!",
        source: 'Google',
      },
      {
        id: 'g2',
        author: { en: 'Huara student', es: 'Estudiante de Huara' },
        meta: { en: 'Google review · 5 stars', es: 'Reseña en Google · 5 estrellas' },
        quote:
          'The time at Huara Spanish school was really wonderful. Katarina didn’t only teach with her mind but also with her heart. It was so much fun and we did a lot of things besides simply studying like visiting a restaurant or going to the feria together. It felt like being part of a big family and we would recommend it to everyone who wants a warm atmosphere to study a new language!! She showed us local food, history and people and we learnt so much more than Spanish!',
        source: 'Google',
      },
      {
        id: 'g3',
        author: { en: 'Huara student', es: 'Estudiante de Huara' },
        meta: { en: 'Google review · 5 stars', es: 'Reseña en Google · 5 estrellas' },
        quote:
          'My boyfriend and I took classes with Katterina for 1 month and are so grateful we did. Katerina and her daughter were amazing teachers and really made us feel like more than just students. Katterina creates an environment where you feel confident practicing Spanish, meet like minded people, and see have so much fun dancing, eating and celebrating along with her and her family. I could not image a better way to learn Spanish! We will be back!!',
        source: 'Google',
      },
    ],
    instagram: [
      { src: img('pichilemu/grupo-terraza.jpg'), alt: 'Huara students on the terrace' },
      { src: img('pichilemu/estacion.jpg'), alt: 'Pichilemu old train station' },
      { src: img('pichilemu/feria-fruta.jpg'), alt: 'Pichilemu market' },
      { src: img('pichilemu/casa.jpg'), alt: 'Huara Spanish School' },
      { src: img('pichilemu/atardecer.jpg'), alt: 'Sunset in Pichilemu' },
      { src: img('pichilemu/punta-de-lobos.jpg'), alt: 'Punta de Lobos' },
    ],
    facebook: [
      'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto%3Ffbid%3D1507288571409898%26set%3Da.460912359380863%26locale%3Des_LA&show_text=true&width=340',
      'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto%3Ffbid%3D1480846414054114%26set%3Dpcb.1480846454054110%26locale%3Des_LA&show_text=true&width=340',
      'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto%3Ffbid%3D1455926969879392%26set%3Da.460912359380863%26locale%3Des_LA&show_text=true&width=340',
      'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphoto%3Ffbid%3D1439158741556215%26set%3Da.460912359380863%26locale%3Des_LA&show_text=true&width=340',
    ],
  },
  faq: [
    {
      q: { en: 'How many students per group?', es: '¿Cuántos estudiantes por grupo?' },
      a: {
        en: 'Group classes have a maximum of 5 students, grouped by level. Private lessons are 1-on-1.',
        es: 'Las clases grupales tienen un máximo de 5 estudiantes, agrupados por nivel. Las clases privadas son 1 a 1.',
      },
    },
    {
      q: { en: 'Do I need surf experience?', es: '¿Necesito experiencia en surf?' },
      a: {
        en: 'No. Pichilemu has beginner breaks + certified local instructors. Board & wetsuit included.',
        es: 'No. Pichilemu tiene olas para principiantes + instructores locales certificados. Tabla y traje incluidos.',
      },
    },
    {
      q: { en: 'Where are classes?', es: '¿Dónde son las clases?' },
      a: {
        en: 'Pasaje Vista Hermosa 0248, Pichilemu, just steps from the ocean. Fast WiFi for nomads.',
        es: 'Pasaje Vista Hermosa 0248, Pichilemu, a pasos del océano. WiFi rápido para nómadas.',
      },
    },
    {
      q: { en: 'How does booking work?', es: '¿Cómo funciona la reserva?' },
      a: {
        en: 'Add to order → send your booking via WhatsApp → we confirm availability within 24h → pay securely with a Flow or MercadoPago link. No prepayment on this site.',
        es: 'Agrega a tu pedido → envía tu reserva por WhatsApp → confirmamos disponibilidad en 24h → paga seguro con un link de Flow o MercadoPago. Sin pago anticipado en este sitio.',
      },
    },
    {
      q: { en: 'What study material do I get?', es: '¿Qué material de estudio recibo?' },
      a: {
        en: 'PDF guide (about 5 pages per class) sent by email, plus in-class practice with real Chilean situations.',
        es: 'Guía PDF (unas 5 páginas por clase) enviada por email, más práctica en clase con situaciones chilenas reales.',
      },
    },
  ],
  footer: {
    tagline: {
      en: 'Affordable immersion: language + surf + nature + Chilean food.',
      es: 'Inmersión accesible: idioma + surf + naturaleza + comida chilena.',
    },
    payment: { en: 'Secure payment', es: 'Pago seguro' },
    methods: ['Flow', 'MercadoPago'],
  },
  legal: {
    privacy: '/privacidad.html',
    cookies: '/privacidad.html#cookies',
    terms: '/terminos.html',
  },
  seo: {
    ogImage: '/img/og-huara.jpg',
    logo: '/img/logo-512.png',
  },
  analyticsId: 'G-BY6B0GKRPV',
  surfTarget: null,
};

export type SiteOverrides = Partial<Omit<SiteContent, 'seo' | 'analyticsId'>>;
