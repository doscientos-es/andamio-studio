import type { TechnicalDocument } from '../domain/document'

export const sampleDocuments: TechnicalDocument[] = [
  {
    id: 'rehabilitacion-fachada',
    reference: 'ET-026-014',
    title: 'Rehabilitación de fachada norte',
    location: 'Carrer del Progrés, 18 · Terrassa',
    client: 'Comunidad de propietarios',
    scaffoldType: 'Andamio multidireccional',
    intendedUse: 'Acceso y trabajos de fachada',
    height: '18,40 m',
    length: '32,00 m',
    status: 'En revisión',
    updatedAt: '2026-09-24',
    pageCount: 2,
    sourceCount: 3,
    summary:
      'Memoria descriptiva y procedimiento de trabajo con comprobaciones técnicas pendientes.',
    blocks: [
      {
        id: 'facade-heading',
        type: 'heading',
        text: 'Objeto y alcance',
      },
      {
        id: 'facade-intro',
        type: 'paragraph',
        text: 'Este borrador organiza la información disponible para la intervención de rehabilitación de la fachada norte, en Carrer del Progrés, 18, Terrassa.',
      },
      {
        id: 'facade-scope',
        type: 'paragraph',
        text: 'Se contempla un andamio multidireccional para el acceso y los trabajos de fachada. La descripción deberá contrastarse con los planos y con la memoria de cálculo aprobada para esta obra.',
      },
      {
        id: 'facade-checks-heading',
        type: 'heading',
        text: 'Aspectos pendientes de contraste',
      },
      {
        id: 'facade-check-loads',
        type: 'bullet',
        text: 'Confirmar cargas, apoyos y configuración con la memoria de cálculo.',
      },
      {
        id: 'facade-check-sequence',
        type: 'bullet',
        text: 'Completar la secuencia particular de montaje y desmontaje.',
      },
    ],
  },
  {
    id: 'cubierta-nave',
    reference: 'ET-026-009',
    title: 'Mantenimiento de cubierta de nave',
    location: 'Polígono industrial, Terrassa',
    client: 'Propiedad de la nave',
    scaffoldType: 'Torre móvil de acceso',
    intendedUse: 'Acceso temporal a cubierta',
    height: '9,20 m',
    length: '12,00 m',
    status: 'Borrador',
    updatedAt: '2026-09-18',
    pageCount: 2,
    sourceCount: 2,
    summary: 'Ficha de intervención y procedimiento de acceso temporal a cubierta.',
    blocks: [
      {
        id: 'roof-heading',
        type: 'heading',
        text: 'Objeto y alcance',
      },
      {
        id: 'roof-intro',
        type: 'paragraph',
        text: 'La intervención contempla el acceso temporal a la cubierta mediante una torre móvil.',
      },
      {
        id: 'roof-scope',
        type: 'paragraph',
        text: 'Confirmar las condiciones de apoyo y estabilidad de la torre móvil antes del acceso.',
      },
      {
        id: 'roof-checks-heading',
        type: 'heading',
        text: 'Comprobaciones antes de emitir',
      },
      {
        id: 'roof-check-plan',
        type: 'bullet',
        text: 'Vincular el plano de implantación revisado.',
      },
      {
        id: 'roof-check-procedure',
        type: 'bullet',
        text: 'Incorporar el procedimiento específico de montaje.',
      },
    ],
  },
  {
    id: 'estructura-deposito',
    reference: 'ET-026-003',
    title: 'Acceso para inspección de depósito',
    location: 'Instalación industrial, Terrassa',
    client: 'Titular industrial',
    scaffoldType: 'Estructura multidireccional',
    intendedUse: 'Inspección y mantenimiento',
    height: '14,00 m',
    length: '8,50 m',
    status: 'Borrador',
    updatedAt: '2026-09-04',
    pageCount: 2,
    sourceCount: 4,
    summary: 'Memoria para trabajos de inspección y mantenimiento en estructura industrial.',
    blocks: [
      {
        id: 'tank-heading',
        type: 'heading',
        text: 'Objeto y alcance',
      },
      {
        id: 'tank-intro',
        type: 'paragraph',
        text: 'La actuación comprende trabajos de inspección y mantenimiento en un depósito industrial, con acceso mediante estructura multidireccional.',
      },
      {
        id: 'tank-scope',
        type: 'paragraph',
        text: 'Definir los niveles de trabajo, puntos de apoyo y medidas de protección colectiva conforme a los planos de la intervención.',
      },
      {
        id: 'tank-checks-heading',
        type: 'heading',
        text: 'Apartados incluidos',
      },
      {
        id: 'tank-check-plan',
        type: 'bullet',
        text: 'Ficha descriptiva de la intervención.',
      },
      {
        id: 'tank-check-sources',
        type: 'bullet',
        text: 'Referencias a planos y documentación técnica del expediente.',
      },
    ],
  },
]
