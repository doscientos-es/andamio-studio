import type { DocumentBlock } from '../domain/document'
import type { NewDocumentDraft } from './new-document-draft'

export const documentGenerationStages = [
  'Revisando los datos del proyecto',
  'Organizando la estructura técnica',
  'Redactando el cuerpo del documento',
  'Integrando fotografías y anexos',
  'Preparando la vista previa',
] as const

const stageDurations = [1500, 1900, 4100, 1800, 800]

export async function generateDocumentContent(
  draft: NewDocumentDraft,
  onStageChange: (stage: number) => void,
): Promise<DocumentBlock[]> {
  for (let stage = 0; stage < documentGenerationStages.length; stage += 1) {
    onStageChange(stage)
    const photoDelay = stage === 3 ? Math.min(draft.photos.length * 500, 2500) : 0
    await wait((stageDurations[stage] ?? 1000) + photoDelay)
  }

  return createDocumentBody(draft)
}

function createDocumentBody(draft: NewDocumentDraft): DocumentBlock[] {
  const projectDetails = [
    `Obra: ${draft.workName.trim()}`,
    `Titular: ${draft.client.trim()}`,
    `Emplazamiento: ${draft.location.trim()}`,
  ]
  const configuration = [
    `Estructura: ${draft.scaffoldType.trim()}`,
    `Uso previsto: ${draft.intendedUse.trim()}`,
    draft.height.trim() ? `Altura indicada: ${draft.height.trim()}` : null,
    draft.length.trim() ? `Longitud indicada: ${draft.length.trim()}` : null,
  ].filter((item): item is string => item !== null)
  const observations = draft.observations.trim()

  return [
    heading('Objeto y alcance'),
    paragraph(
      `Este documento recoge la información aportada para la intervención «${draft.workName.trim()}» y organiza su descripción técnica para revisión.`,
    ),
    paragraph(draft.description.trim()),
    heading('Identificación de la obra'),
    ...projectDetails.map(bullet),
    heading('Configuración descrita'),
    paragraph(
      'La configuración se transcribe a partir de los datos facilitados en el expediente. Las dimensiones que no se han indicado quedan pendientes de completar.',
    ),
    ...configuration.map(bullet),
    heading('Documentación gráfica'),
    paragraph(
      draft.photos.length
        ? `Se han incorporado ${draft.photos.length} ${draft.photos.length === 1 ? 'fotografía' : 'fotografías'} aportadas para documentar visualmente la obra. Se muestran en el apartado gráfico del documento.`
        : 'No se han añadido fotografías al expediente. La documentación gráfica puede incorporarse posteriormente desde el editor.',
    ),
    heading('Observaciones'),
    paragraph(
      observations || 'No se han aportado observaciones adicionales para esta intervención.',
    ),
    heading('Revisión previa a la emisión'),
    paragraph(
      'El técnico responsable deberá contrastar los datos de entrada, la configuración, las dimensiones y la documentación gráfica con el proyecto definitivo antes de validar y firmar el documento.',
    ),
  ]
}

function heading(text: string): DocumentBlock {
  return { id: crypto.randomUUID(), type: 'heading', text }
}

function paragraph(text: string): DocumentBlock {
  return { id: crypto.randomUUID(), type: 'paragraph', text }
}

function bullet(text: string): DocumentBlock {
  return { id: crypto.randomUUID(), type: 'bullet', text }
}

function wait(duration: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, duration))
}
