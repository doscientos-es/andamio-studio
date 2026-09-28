export type DocumentTemplateSettings = {
  openingTitle: string
  openingCertification: string
  openingTechnicalNote: string
  openingIssueNote: string
  closingTitle: string
  closingBody: string
}

export const defaultDocumentTemplateSettings: DocumentTemplateSettings = {
  openingTitle: 'CIP · Certificado de Garantía de Intervención Profesional',
  openingCertification:
    'La documentación técnica asociada a esta intervención queda identificada en este expediente y pendiente de revisión por el profesional responsable.',
  openingTechnicalNote:
    'La configuración, los cálculos y las condiciones de uso deberán contrastarse con los datos y planos definitivos antes de emitir el certificado.',
  openingIssueNote:
    'La emisión y validez de este certificado quedan pendientes de completar los datos del técnico competente, su revisión y su firma.',
  closingTitle: 'Validación profesional',
  closingBody:
    'Este expediente reúne la documentación de la intervención descrita. Antes de su emisión, el técnico responsable debe revisar el contenido, los cálculos, los planos y los anexos.',
}
