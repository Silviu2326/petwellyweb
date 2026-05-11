import type { Locale } from '@/i18n/routing';

/**
 * Catálogo de razas para las páginas «Soluciones por raza».
 *
 * Cada raza tiene texto SEO long-tail diferenciado:
 *   - protocolos sanitarios típicos
 *   - pruebas genéticas relevantes
 *   - dolencias frecuentes que vigilar
 *   - tiempo medio de gestación / camada / destete
 *
 * El slug es estable entre idiomas; el contenido (nombre, párrafos)
 * se selecciona por locale en runtime.
 *
 * Para añadir más razas: añade una entrada al array y crea (opcional)
 * el contenido específico. Sitemap.ts las recoge automáticamente.
 */

export interface BreedContent {
  name: string;
  hero: string;
  whyMatters: string;
  protocols: string[];
  geneticTests: string[];
  watchOut: string[];
  litterFacts: { label: string; value: string }[];
}

export interface Breed {
  slug: string;
  /** Para SEO: keyword principal. */
  keyword: { es: string; en: string };
  emoji: string;
  content: { es: BreedContent; en: BreedContent };
}

export const breeds: Breed[] = [
  {
    slug: 'bulldog-frances',
    keyword: { es: 'criadero bulldog francés', en: 'french bulldog kennel' },
    emoji: '🐶',
    content: {
      es: {
        name: 'Bulldog Francés',
        hero: 'Petwelly para criaderos de Bulldog Francés: gestión sanitaria, partos por cesárea programada y trazabilidad genética desde una sola pantalla.',
        whyMatters:
          'El Bulldog Francés exige protocolos muy específicos: revisión cardio-respiratoria, control térmico, partos casi siempre por cesárea y vigilancia neonatal exhaustiva. Petwelly trae esos protocolos preconfigurados.',
        protocols: [
          'Vacunación reforzada las primeras 12 semanas',
          'Control térmico semanal en gestación',
          'Cesárea programada con cuenta atrás automática',
          'Pesaje neonatal cada 12h las primeras 72h',
          'Test de paladar y narinas pre-entrega',
        ],
        geneticTests: ['HUU', 'JHC', 'CMR1', 'DM (SOD1)', 'BAER (audición)'],
        watchOut: [
          'BOAS (síndrome braquicefálico): registro y revisión cada 6 meses',
          'Displasia de codo y hombro',
          'Dermatitis de pliegue: protocolo de higiene semanal',
        ],
        litterFacts: [
          { label: 'Gestación media', value: '63 días' },
          { label: 'Camada típica', value: '3–5 cachorros' },
          { label: 'Destete', value: '8 semanas' },
          { label: 'Cesárea', value: '~85% de los casos' },
        ],
      },
      en: {
        name: 'French Bulldog',
        hero: 'Petwelly for French Bulldog kennels: health management, scheduled C-sections and genetic traceability in one screen.',
        whyMatters:
          'French Bulldogs require very specific protocols: cardio-respiratory check-ups, thermal control, almost-always C-section deliveries and exhaustive neonatal watch. Petwelly ships those protocols pre-configured.',
        protocols: [
          'Reinforced vaccination during the first 12 weeks',
          'Weekly thermal control during pregnancy',
          'Scheduled C-section with automatic countdown',
          'Neonatal weighing every 12h for the first 72h',
          'Palate and nostril check pre-delivery',
        ],
        geneticTests: ['HUU', 'JHC', 'CMR1', 'DM (SOD1)', 'BAER (hearing)'],
        watchOut: [
          'BOAS (brachycephalic syndrome): logged and reviewed every 6 months',
          'Elbow and shoulder dysplasia',
          'Skin-fold dermatitis: weekly hygiene protocol',
        ],
        litterFacts: [
          { label: 'Avg pregnancy', value: '63 days' },
          { label: 'Typical litter', value: '3–5 puppies' },
          { label: 'Weaning', value: '8 weeks' },
          { label: 'C-section', value: '~85% of cases' },
        ],
      },
    },
  },
  {
    slug: 'pastor-aleman',
    keyword: { es: 'criadero pastor alemán', en: 'german shepherd kennel' },
    emoji: '🐕‍🦺',
    content: {
      es: {
        name: 'Pastor Alemán',
        hero: 'Petwelly para criaderos de Pastor Alemán: control de displasias, pedigrees largos y selección reproductora informada.',
        whyMatters:
          'En el Pastor Alemán la genética articular y el pedigree son determinantes. Petwelly trae el árbol con código de color por displasia y panel genético completo, evitando cruces de riesgo.',
        protocols: [
          'Test de displasia oficial a los 12–18 meses',
          'Calendario de vacunación reforzado en cachorros',
          'Plan de socialización temprana (semanas 4–10)',
          'Control de peso mensual hasta los 18 meses',
        ],
        geneticTests: ['DM', 'MDR1', 'EPI', 'Hemofilia A'],
        watchOut: [
          'Displasia de cadera y codo',
          'Mielopatía degenerativa',
          'Dilatación-vólvulo gástrico',
        ],
        litterFacts: [
          { label: 'Gestación media', value: '63 días' },
          { label: 'Camada típica', value: '6–9 cachorros' },
          { label: 'Destete', value: '8–9 semanas' },
        ],
      },
      en: {
        name: 'German Shepherd',
        hero: 'Petwelly for German Shepherd kennels: dysplasia control, deep pedigrees and informed breeding selection.',
        whyMatters:
          'For German Shepherds, joint genetics and pedigree drive everything. Petwelly ships color-coded pedigree trees by dysplasia and a full genetic panel that prevents risky crosses.',
        protocols: [
          'Official dysplasia test at 12–18 months',
          'Reinforced vaccination calendar for puppies',
          'Early socialization plan (weeks 4–10)',
          'Monthly weight control up to 18 months',
        ],
        geneticTests: ['DM', 'MDR1', 'EPI', 'Hemophilia A'],
        watchOut: [
          'Hip and elbow dysplasia',
          'Degenerative myelopathy',
          'Gastric dilatation-volvulus',
        ],
        litterFacts: [
          { label: 'Avg pregnancy', value: '63 days' },
          { label: 'Typical litter', value: '6–9 puppies' },
          { label: 'Weaning', value: '8–9 weeks' },
        ],
      },
    },
  },
  {
    slug: 'mastin',
    keyword: { es: 'criadero mastín', en: 'mastiff kennel' },
    emoji: '🐕',
    content: {
      es: {
        name: 'Mastín',
        hero: 'Petwelly para criaderos de Mastín: protocolos de crecimiento lento, dosis ajustadas por peso y trazabilidad de partos largos.',
        whyMatters:
          'El Mastín crece despacio y pesa mucho: las dosis veterinarias varían cada semana y los partos pueden durar 12+ horas. Petwelly registra cada hito y avisa cuando algo se sale del rango esperado.',
        protocols: [
          'Curva de crecimiento dual (peso/altura) hasta los 24 meses',
          'Dosificación ajustada al peso actual del animal',
          'Whelping log con duración entre cachorros',
          'Pesaje neonatal cada 24h durante 14 días',
        ],
        geneticTests: ['DM', 'CMR1', 'Hipotiroidismo'],
        watchOut: [
          'Displasia de cadera y codo',
          'Cardiomiopatía dilatada',
          'Dilatación-vólvulo gástrico',
        ],
        litterFacts: [
          { label: 'Gestación media', value: '63–65 días' },
          { label: 'Camada típica', value: '6–10 cachorros' },
          { label: 'Destete', value: '9–10 semanas' },
        ],
      },
      en: {
        name: 'Mastiff',
        hero: 'Petwelly for Mastiff kennels: slow-growth protocols, weight-tuned dosing and long-whelping traceability.',
        whyMatters:
          'Mastiffs grow slowly and weigh a lot: vet doses change weekly and deliveries can last 12+ hours. Petwelly logs every milestone and alerts when something falls out of range.',
        protocols: [
          'Dual growth curve (weight/height) up to 24 months',
          'Dosing tuned to the dog\'s current weight',
          'Whelping log with inter-puppy duration',
          'Neonatal weighing every 24h for 14 days',
        ],
        geneticTests: ['DM', 'CMR1', 'Hypothyroidism'],
        watchOut: [
          'Hip and elbow dysplasia',
          'Dilated cardiomyopathy',
          'Gastric dilatation-volvulus',
        ],
        litterFacts: [
          { label: 'Avg pregnancy', value: '63–65 days' },
          { label: 'Typical litter', value: '6–10 puppies' },
          { label: 'Weaning', value: '9–10 weeks' },
        ],
      },
    },
  },
  {
    slug: 'border-collie',
    keyword: { es: 'criadero border collie', en: 'border collie kennel' },
    emoji: '🐕',
    content: {
      es: {
        name: 'Border Collie',
        hero: 'Petwelly para criaderos de Border Collie: panel genético completo, trazabilidad de líneas de trabajo y reservas con perfil del cachorro.',
        whyMatters:
          'El Border Collie es perro de trabajo y deporte: los compradores buscan líneas concretas y perfiles temperamentales. Petwelly te ayuda a documentar test, líneas y comportamiento desde el día 1.',
        protocols: [
          'Test genético al destete (CEA, TNS, MDR1)',
          'Plan de socialización y enriquecimiento por semana',
          'Test de temperamento (pre-entrega)',
        ],
        geneticTests: ['CEA', 'TNS', 'MDR1', 'CL', 'IGS'],
        watchOut: [
          'Anomalía del ojo del Collie (CEA)',
          'Neutropenia cíclica del trabajador (TNS)',
          'Sensibilidad a fármacos por MDR1',
        ],
        litterFacts: [
          { label: 'Gestación media', value: '63 días' },
          { label: 'Camada típica', value: '5–8 cachorros' },
          { label: 'Destete', value: '8 semanas' },
        ],
      },
      en: {
        name: 'Border Collie',
        hero: 'Petwelly for Border Collie kennels: full genetic panel, working-line traceability and reservations with puppy profile.',
        whyMatters:
          'Border Collies are working and sport dogs: buyers ask for specific lines and temperament profiles. Petwelly helps you document tests, lines and behavior from day one.',
        protocols: [
          'Genetic test at weaning (CEA, TNS, MDR1)',
          'Weekly socialization and enrichment plan',
          'Temperament test (pre-delivery)',
        ],
        geneticTests: ['CEA', 'TNS', 'MDR1', 'CL', 'IGS'],
        watchOut: [
          'Collie Eye Anomaly (CEA)',
          'Trapped Neutrophil Syndrome (TNS)',
          'MDR1 drug sensitivity',
        ],
        litterFacts: [
          { label: 'Avg pregnancy', value: '63 days' },
          { label: 'Typical litter', value: '5–8 puppies' },
          { label: 'Weaning', value: '8 weeks' },
        ],
      },
    },
  },
  {
    slug: 'golden-retriever',
    keyword: { es: 'criadero golden retriever', en: 'golden retriever kennel' },
    emoji: '🦮',
    content: {
      es: {
        name: 'Golden Retriever',
        hero: 'Petwelly para criaderos de Golden Retriever: panel genético amplio, control de displasias y portal del cliente con galería semanal.',
        whyMatters:
          'El Golden tiene una base genética que requiere tests amplios y compradores que esperan profesionalidad y seguimiento. Petwelly te da las dos cosas: trazabilidad clínica y galería semanal automática.',
        protocols: [
          'Test oficial de displasia y oftalmológico anual',
          'Panel genético al destete',
          'Galería semanal automática para el cliente',
        ],
        geneticTests: ['ICT-A', 'PRA-prcd', 'PRA1/PRA2', 'NCL', 'DM'],
        watchOut: [
          'Displasia de cadera y codo',
          'Cardiopatía SAS',
          'Predisposición oncológica',
        ],
        litterFacts: [
          { label: 'Gestación media', value: '63 días' },
          { label: 'Camada típica', value: '6–10 cachorros' },
          { label: 'Destete', value: '8 semanas' },
        ],
      },
      en: {
        name: 'Golden Retriever',
        hero: 'Petwelly for Golden Retriever kennels: broad genetic panel, dysplasia control and client portal with weekly gallery.',
        whyMatters:
          'Goldens have a genetic baseline that requires wide testing, and buyers expect professionalism and follow-up. Petwelly gives you both: clinical traceability and an automatic weekly gallery.',
        protocols: [
          'Annual official dysplasia and ophthalmological test',
          'Genetic panel at weaning',
          'Automatic weekly gallery for the client',
        ],
        geneticTests: ['ICT-A', 'PRA-prcd', 'PRA1/PRA2', 'NCL', 'DM'],
        watchOut: [
          'Hip and elbow dysplasia',
          'SAS cardiopathy',
          'Oncological predisposition',
        ],
        litterFacts: [
          { label: 'Avg pregnancy', value: '63 days' },
          { label: 'Typical litter', value: '6–10 puppies' },
          { label: 'Weaning', value: '8 weeks' },
        ],
      },
    },
  },
  {
    slug: 'chihuahua',
    keyword: { es: 'criadero chihuahua', en: 'chihuahua kennel' },
    emoji: '🐶',
    content: {
      es: {
        name: 'Chihuahua',
        hero: 'Petwelly para criaderos de Chihuahua: dosis ultra-precisas, control de hipoglucemia neonatal y planificación de partos cuidadosos.',
        whyMatters:
          'El Chihuahua exige precisión: las dosis veterinarias se mueven en miligramos y los neonatos pueden hipoglucemiar en horas. Petwelly redondea cada dosis al peso real y avisa de pesos preocupantes.',
        protocols: [
          'Pesaje neonatal cada 6h los primeros 3 días',
          'Alerta de hipoglucemia con peso mínimo por hora',
          'Cesárea programada en hembras pequeñas',
        ],
        geneticTests: ['Luxación rotuliana (rx)', 'Ductus arterioso persistente'],
        watchOut: [
          'Hidrocefalia',
          'Luxación rotuliana',
          'Hipoglucemia neonatal',
        ],
        litterFacts: [
          { label: 'Gestación media', value: '60–63 días' },
          { label: 'Camada típica', value: '1–4 cachorros' },
          { label: 'Destete', value: '8–10 semanas' },
        ],
      },
      en: {
        name: 'Chihuahua',
        hero: 'Petwelly for Chihuahua kennels: ultra-precise dosing, neonatal hypoglycemia control and careful whelping planning.',
        whyMatters:
          'Chihuahuas demand precision: vet doses run in milligrams and neonates can go hypoglycemic in hours. Petwelly rounds every dose to actual weight and flags worrying weights.',
        protocols: [
          'Neonatal weighing every 6h for the first 3 days',
          'Hypoglycemia alert with hourly minimum weight',
          'Scheduled C-section for small dams',
        ],
        geneticTests: ['Patellar luxation (x-ray)', 'Patent ductus arteriosus'],
        watchOut: [
          'Hydrocephalus',
          'Patellar luxation',
          'Neonatal hypoglycemia',
        ],
        litterFacts: [
          { label: 'Avg pregnancy', value: '60–63 days' },
          { label: 'Typical litter', value: '1–4 puppies' },
          { label: 'Weaning', value: '8–10 weeks' },
        ],
      },
    },
  },
];

export function getBreed(slug: string) {
  return breeds.find((b) => b.slug === slug);
}

export function getBreedContent(slug: string, locale: Locale): BreedContent | undefined {
  return getBreed(slug)?.content[locale];
}
