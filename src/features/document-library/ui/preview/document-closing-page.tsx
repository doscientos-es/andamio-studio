import { useDocumentTemplateSettings } from '../../application/use-document-template-settings'
import type { TechnicalDocument } from '../../domain/document'

export function DocumentClosingPage({
  document,
  pageNumber,
}: {
  document: TechnicalDocument
  pageNumber: number
}) {
  const { settings } = useDocumentTemplateSettings()

  return (
    <article className="document-sheet document-closing-page" id={`document-page-${pageNumber}`}>
      <header className="closing-header">
        <strong>{document.reference}</strong>
      </header>
      <div className="closing-content">
        <span className="closing-rule" />
        <h2>{settings.closingTitle}</h2>
        <p>{settings.closingBody}</p>
        <div className="closing-signature-grid">
          <div>
            <span>Técnico competente</span>
            <strong>Pendiente de completar</strong>
          </div>
          <div>
            <span>N.º de colegiado</span>
            <strong>Pendiente de completar</strong>
          </div>
          <div className="signature-space">
            <span>Firma y sello</span>
          </div>
          <div>
            <span>Fecha de emisión</span>
            <strong>Pendiente de revisión</strong>
          </div>
        </div>
      </div>
      <footer className="paper-footer">
        <span>{document.workName ?? document.title}</span>
        <span>{String(pageNumber).padStart(2, '0')}</span>
      </footer>
    </article>
  )
}
