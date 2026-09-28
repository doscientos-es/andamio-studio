import type { NewDocumentDraft } from '../../application/new-document-draft'

export type NewDocumentStep = 'obra' | 'contenido' | 'fotos'

export const newDocumentSteps: Array<{ id: NewDocumentStep; label: string }> = [
  { id: 'obra', label: 'Obra' },
  { id: 'contenido', label: 'Contenido' },
  { id: 'fotos', label: 'Fotos' },
]

export const initialNewDocumentDraft: NewDocumentDraft = {
  title: 'Certificado de Garantía de Intervención Profesional',
  workName: '',
  client: '',
  location: '',
  scaffoldType: '',
  intendedUse: '',
  height: '',
  length: '',
  description: '',
  observations: '',
  photos: [],
}
