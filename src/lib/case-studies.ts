import type { Locale } from '@/i18n/routing';

/**
 * Casos de éxito en formato estructurado.
 * Listados en `/casos-de-exito` y detalle en `/casos-de-exito/[slug]`.
 *
 * El sitemap recoge los slugs automáticamente. Para añadir uno nuevo
 * basta con extender este array.
 */
export interface CaseMetric {
  label: { es: string; en: string };
  value: string;
}

export interface CaseStudy {
  slug: string;
  /** Nombre comercial estable (no se traduce). */
  name: string;
  emoji: string;
  cover: string;
  breed: { es: string; en: string };
  location: string;
  size: { es: string; en: string };
  /** Tiempo en Petwelly (años o meses). */
  withPetwelly: { es: string; en: string };
  metrics: CaseMetric[];
  short: { es: string; en: string };
  challenge: { es: string[]; en: string[] };
  solution: { es: string[]; en: string[] };
  outcome: { es: string[]; en: string[] };
  quote: {
    text: { es: string; en: string };
    author: string;
    role: { es: string; en: string };
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'estrella-polar',
    name: 'Criadero Estrella Polar',
    emoji: '⭐',
    cover: '/case-studies/estrella-polar.svg',
    breed: { es: 'Pastor australiano', en: 'Australian Shepherd' },
    location: 'Madrid, España',
    size: { es: '14 perros · 6 camadas/año', en: '14 dogs · 6 litters/yr' },
    withPetwelly: { es: '14 meses', en: '14 months' },
    metrics: [
      { label: { es: 'Tiempo recuperado', en: 'Time saved' }, value: '10 h/sem' },
      { label: { es: 'Aumento de ventas', en: 'Sales increase' }, value: '+22%' },
      { label: { es: 'Satisfacción', en: 'Satisfaction' }, value: '4.9/5' },
    ],
    short: {
      es: 'De 3 hojas de Excel y 12 horas de admin a una sola pantalla y 2 horas al día.',
      en: 'From 3 spreadsheets and 12 admin hours to one screen and 2 hours a day.',
    },
    challenge: {
      es: [
        'Tres Excels distintos para perros, clientes y reservas, sin sincronizar.',
        'Contratos en Word, firmados en papel y escaneados a Drive.',
        'Recordatorios de vacuna manuales por WhatsApp personal.',
        'Imposible saber el margen real por camada.',
      ],
      en: [
        'Three separate spreadsheets for dogs, clients and reservations, never in sync.',
        'Contracts in Word, signed on paper and scanned to Drive.',
        'Manual vaccination reminders through personal WhatsApp.',
        'Impossible to compute real margin per litter.',
      ],
    },
    solution: {
      es: [
        'Importación CSV inicial de 14 perros y 230 clientes en 1 hora.',
        'Plantillas de contrato de venta, monta y garantía configuradas una vez.',
        'Notificaciones automáticas de reserva, vacuna y entrega.',
        'Reportes financieros por camada activados desde la primera camada.',
      ],
      en: [
        'Initial CSV import of 14 dogs and 230 clients in 1 hour.',
        'Sale, mating and warranty contract templates configured once.',
        'Automatic reservation, vaccine and delivery notifications.',
        'Financial reports per litter active from the first litter.',
      ],
    },
    outcome: {
      es: [
        '10 horas/semana recuperadas en tareas administrativas.',
        '+22% ventas tras conectar Stripe a la facturación automática.',
        '0 reclamaciones de cliente por falta de información.',
        'Margen por camada visible al céntimo, decisiones con datos.',
      ],
      en: [
        '10 hours/week recovered on admin work.',
        '+22% sales after wiring Stripe to automatic invoicing.',
        '0 client complaints due to missing information.',
        'Per-litter margin visible to the cent, data-driven decisions.',
      ],
    },
    quote: {
      text: {
        es: 'He recuperado mis sábados y mis clientes me ven más profesional. Era inevitable.',
        en: 'I got my Saturdays back and my clients see me as more professional. It was inevitable.',
      },
      author: 'Marta R.',
      role: { es: 'Propietaria', en: 'Owner' },
    },
  },
  {
    slug: 'bulldog-del-valle',
    name: 'Bulldog del Valle',
    emoji: '🐶',
    cover: '/case-studies/bulldog-del-valle.svg',
    breed: { es: 'Bulldog francés', en: 'French Bulldog' },
    location: 'Barcelona, España',
    size: { es: '8 perros · 4 camadas/año', en: '8 dogs · 4 litters/yr' },
    withPetwelly: { es: '9 meses', en: '9 months' },
    metrics: [
      { label: { es: 'Tiempo recuperado', en: 'Time saved' }, value: '6 h/sem' },
      { label: { es: 'Aumento de ventas', en: 'Sales increase' }, value: '+18%' },
      { label: { es: 'Satisfacción', en: 'Satisfaction' }, value: '4.8/5' },
    ],
    short: {
      es: 'Portal del cliente y galería semanal: cero llamadas pidiendo fotos.',
      en: 'Client portal and weekly gallery: zero calls asking for photos.',
    },
    challenge: {
      es: [
        '50+ llamadas y mensajes semanales de clientes pidiendo fotos del cachorro.',
        'Cesáreas programadas mal coordinadas con el equipo.',
        'Difícil documentar las pruebas BAER y oftalmología.',
      ],
      en: [
        '50+ weekly calls and messages from clients asking for puppy photos.',
        'Poorly coordinated scheduled C-sections.',
        'Hard to document BAER and ophthalmology tests.',
      ],
    },
    solution: {
      es: [
        'Galería semanal automática: subes una foto y el cliente la ve.',
        'Cuenta atrás de cesárea programada con notificación al equipo.',
        'Plantillas de protocolos por raza con BAER y palatino integrados.',
      ],
      en: [
        'Automatic weekly gallery: upload once, client sees it.',
        'Scheduled C-section countdown with team notifications.',
        'Breed protocol templates with BAER and palate checks integrated.',
      ],
    },
    outcome: {
      es: [
        '0 llamadas pidiendo fotos: el cliente entra a su portal y las ve.',
        '+18% ventas con clientes recurrentes recomendando.',
        'Trazabilidad clínica completa para inspecciones.',
      ],
      en: [
        '0 calls asking for photos: clients log into their portal.',
        '+18% sales from recurring referrals.',
        'Full clinical traceability for inspections.',
      ],
    },
    quote: {
      text: {
        es: 'Mis clientes ven a sus cachorros crecer en directo. Es el factor diferencial.',
        en: 'My clients see their puppies grow live. That is the real differentiator.',
      },
      author: 'Jorge L.',
      role: { es: 'Propietario', en: 'Owner' },
    },
  },
  {
    slug: 'cria-del-bosque',
    name: 'Cría del Bosque',
    emoji: '🌲',
    cover: '/case-studies/cria-del-bosque.svg',
    breed: { es: 'Mastín leonés', en: 'Spanish Mastiff' },
    location: 'Asturias, España',
    size: { es: '10 perros · 3 camadas/año', en: '10 dogs · 3 litters/yr' },
    withPetwelly: { es: '18 meses', en: '18 months' },
    metrics: [
      { label: { es: 'Tiempo recuperado', en: 'Time saved' }, value: '8 h/sem' },
      { label: { es: 'Aumento de ventas', en: 'Sales increase' }, value: '+15%' },
      { label: { es: 'Satisfacción', en: 'Satisfaction' }, value: '5.0/5' },
    ],
    short: {
      es: 'Whelping log y protocolos veterinarios: trazabilidad clínica completa.',
      en: 'Whelping log and vet protocols: complete clinical traceability.',
    },
    challenge: {
      es: [
        'Partos largos (12+ horas) con difícil seguimiento en papel.',
        'Curva de crecimiento dual difícil de mantener manualmente.',
        'Sin histórico de cumplimiento de tratamientos.',
      ],
      en: [
        'Long whelpings (12+ hours) hard to track on paper.',
        'Dual growth curve impossible to maintain manually.',
        'No treatment-adherence history.',
      ],
    },
    solution: {
      es: [
        'Whelping log con timestamp por cachorro y duración entre nacimientos.',
        'Curva de crecimiento dual (peso/altura) con alertas automáticas.',
        'Tracking de tratamiento con porcentaje de cumplimiento.',
      ],
      en: [
        'Whelping log with timestamp per puppy and inter-birth duration.',
        'Dual growth curve (weight/height) with automatic alerts.',
        'Treatment tracking with adherence percentage.',
      ],
    },
    outcome: {
      es: [
        '8 horas/semana recuperadas en gestión clínica.',
        'Trazabilidad para clientes que quieren ver historial.',
        'Reportes de fertilidad por hembra para decisiones de retiro.',
      ],
      en: [
        '8 hours/week recovered on clinical management.',
        'Traceability for clients asking to see history.',
        'Per-dam fertility reports informing retirement decisions.',
      ],
    },
    quote: {
      text: {
        es: 'El whelping log me salvó en mi último parto difícil. Tener el histórico ahí fue oro.',
        en: 'The whelping log saved me on a hard delivery. Having the history right there was gold.',
      },
      author: 'Lucía S.',
      role: { es: 'Propietaria', en: 'Owner' },
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function localizedCaseStudy(slug: string, locale: Locale) {
  const c = getCaseStudy(slug);
  if (!c) return undefined;
  return {
    slug: c.slug,
    name: c.name,
    emoji: c.emoji,
    cover: c.cover,
    breed: c.breed[locale],
    location: c.location,
    size: c.size[locale],
    withPetwelly: c.withPetwelly[locale],
    metrics: c.metrics.map((m) => ({ label: m.label[locale], value: m.value })),
    short: c.short[locale],
    challenge: c.challenge[locale],
    solution: c.solution[locale],
    outcome: c.outcome[locale],
    quote: {
      text: c.quote.text[locale],
      author: c.quote.author,
      role: c.quote.role[locale],
    },
  };
}
