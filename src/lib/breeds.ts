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
        hero: 'Petwellly para criaderos de Bulldog Francés: gestión sanitaria, partos por cesárea programada y trazabilidad genética desde una sola pantalla.',
        whyMatters:
          'El Bulldog Francés exige protocolos muy específicos: revisión cardio-respiratoria, control térmico, partos casi siempre por cesárea y vigilancia neonatal exhaustiva. Petwellly te permite registrar cada control en su ficha y mantener la trazabilidad clínica completa.',
        protocols: [
          'Vacunación reforzada las primeras 12 semanas',
          'Control térmico semanal en gestación',
          'Cesárea programada con recordatorio en el calendario',
          'Pesaje neonatal cada 12h las primeras 72h',
          'Test de paladar y narinas pre-entrega',
        ],
        geneticTests: ['DM', 'Panel genético completo'],
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
        hero: 'Petwellly for French Bulldog kennels: health management, scheduled C-sections and genetic traceability in one screen.',
        whyMatters:
          'French Bulldogs require very specific protocols: cardio-respiratory check-ups, thermal control, almost-always C-section deliveries and exhaustive neonatal watch. Petwellly lets you log every check in their record and keep full clinical traceability.',
        protocols: [
          'Reinforced vaccination during the first 12 weeks',
          'Weekly thermal control during pregnancy',
          'Scheduled C-section with calendar reminder',
          'Neonatal weighing every 12h for the first 72h',
          'Palate and nostril check pre-delivery',
        ],
        geneticTests: ['DM', 'Full genetic panel'],
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
        hero: 'Petwellly para criaderos de Pastor Alemán: control de displasias, pedigrees largos y selección reproductora informada.',
        whyMatters:
          'En el Pastor Alemán la genética articular y el pedigree son determinantes. Petwellly te permite documentar el panel genético en cada perro y visualizar el árbol del pedigree para evitar cruces de riesgo.',
        protocols: [
          'Test de displasia oficial a los 12–18 meses',
          'Calendario de vacunación reforzado en cachorros',
          'Plan de socialización temprana (semanas 4–10)',
          'Control de peso mensual hasta los 18 meses',
        ],
        geneticTests: ['DM', 'MDR1', 'HD (displasia de cadera)', 'ED (displasia de codo)', 'Panel genético completo'],
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
        hero: 'Petwellly for German Shepherd kennels: dysplasia control, deep pedigrees and informed breeding selection.',
        whyMatters:
          'For German Shepherds, joint genetics and pedigree drive everything. Petwellly lets you document the genetic panel per dog and visualize the pedigree tree to avoid risky crosses.',
        protocols: [
          'Official dysplasia test at 12–18 months',
          'Reinforced vaccination calendar for puppies',
          'Early socialization plan (weeks 4–10)',
          'Monthly weight control up to 18 months',
        ],
        geneticTests: ['DM', 'MDR1', 'HD (hip dysplasia)', 'ED (elbow dysplasia)', 'Full genetic panel'],
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
        hero: 'Petwellly para criaderos de Mastín: protocolos de crecimiento lento, dosis ajustadas por peso y seguimiento de partos largos.',
        whyMatters:
          'El Mastín crece despacio y pesa mucho: las dosis veterinarias varían cada semana y los partos pueden durar 12+ horas. Petwellly te permite registrar cada hito clínico y mantener el histórico de peso.',
        protocols: [
          'Curva de crecimiento (peso) hasta los 24 meses',
          'Dosificación ajustada al peso actual del animal',
          'Registro del parto con horas y observaciones',
          'Pesaje neonatal cada 24h durante 14 días',
        ],
        geneticTests: ['DM', 'HD (displasia de cadera)', 'Panel genético completo'],
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
        hero: 'Petwellly for Mastiff kennels: slow-growth protocols, weight-tuned dosing and tracking of long deliveries.',
        whyMatters:
          'Mastiffs grow slowly and weigh a lot: vet doses change weekly and deliveries can last 12+ hours. Petwellly lets you log every clinical milestone and keep the full weight history.',
        protocols: [
          'Weight growth curve up to 24 months',
          'Dosing tuned to the dog\'s current weight',
          'Whelping log with timestamps and observations',
          'Neonatal weighing every 24h for 14 days',
        ],
        geneticTests: ['DM', 'HD (hip dysplasia)', 'Full genetic panel'],
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
        hero: 'Petwellly para criaderos de Border Collie: panel genético, trazabilidad de líneas de trabajo y reservas con perfil del cachorro.',
        whyMatters:
          'El Border Collie es perro de trabajo y deporte: los compradores buscan líneas concretas y perfiles temperamentales. Petwellly te ayuda a documentar tests, líneas y comportamiento desde el día 1.',
        protocols: [
          'Test genético al destete',
          'Plan de socialización y enriquecimiento por semana',
          'Test de temperamento (pre-entrega)',
        ],
        geneticTests: ['MDR1', 'DM', 'Panel genético completo'],
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
        hero: 'Petwellly for Border Collie kennels: genetic panel, working-line traceability and reservations with puppy profile.',
        whyMatters:
          'Border Collies are working and sport dogs: buyers ask for specific lines and temperament profiles. Petwellly helps you document tests, lines and behavior from day one.',
        protocols: [
          'Genetic test at weaning',
          'Weekly socialization and enrichment plan',
          'Temperament test (pre-delivery)',
        ],
        geneticTests: ['MDR1', 'DM', 'Full genetic panel'],
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
        hero: 'Petwellly para criaderos de Golden Retriever: panel genético, control de displasias y portal del cliente con galería semanal.',
        whyMatters:
          'El Golden tiene una base genética que requiere tests amplios y compradores que esperan profesionalidad y seguimiento. Petwellly te da las dos cosas: trazabilidad clínica y portal del cliente con galería.',
        protocols: [
          'Test oficial de displasia y oftalmológico anual',
          'Panel genético al destete',
          'Galería del cachorro para el cliente',
        ],
        geneticTests: ['PRA', 'DM', 'HD (displasia de cadera)', 'ED (displasia de codo)', 'Panel genético completo'],
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
        hero: 'Petwellly for Golden Retriever kennels: genetic panel, dysplasia control and client portal with weekly gallery.',
        whyMatters:
          'Goldens have a genetic baseline that requires wide testing, and buyers expect professionalism and follow-up. Petwellly gives you both: clinical traceability and a client portal with gallery.',
        protocols: [
          'Annual official dysplasia and ophthalmological test',
          'Genetic panel at weaning',
          'Puppy gallery for the client',
        ],
        geneticTests: ['PRA', 'DM', 'HD (hip dysplasia)', 'ED (elbow dysplasia)', 'Full genetic panel'],
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
        hero: 'Petwellly para criaderos de Chihuahua: dosis ultra-precisas, control de hipoglucemia neonatal y planificación de partos cuidadosos.',
        whyMatters:
          'El Chihuahua exige precisión: las dosis veterinarias se mueven en miligramos y los neonatos pueden hipoglucemiar en horas. Petwellly te permite registrar dosis al peso real del animal y mantener el histórico de pesajes.',
        protocols: [
          'Pesaje neonatal cada 6h los primeros 3 días',
          'Registro del peso para detectar tendencia preocupante',
          'Cesárea programada en hembras pequeñas',
        ],
        geneticTests: ['Panel genético completo'],
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
        hero: 'Petwellly for Chihuahua kennels: ultra-precise dosing, neonatal hypoglycemia control and careful whelping planning.',
        whyMatters:
          'Chihuahuas demand precision: vet doses run in milligrams and neonates can go hypoglycemic in hours. Petwellly lets you log dosing to actual weight and keep the full weighing history.',
        protocols: [
          'Neonatal weighing every 6h for the first 3 days',
          'Weight log to spot worrying trends',
          'Scheduled C-section for small dams',
        ],
        geneticTests: ['Full genetic panel'],
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
