import type { DocumentBlock, TechnicalDocument } from '../../domain/document'
import { DocumentBlockContent } from './document-block-content'

export function DocumentMemoPage({
  document,
  blocks,
  pageNumber,
}: {
  document: TechnicalDocument
  blocks: DocumentBlock[]
  pageNumber: number
}) {
  return (
    <article className="document-sheet document-memo-page" id={`document-page-${pageNumber}`}>
      <div className="memo-head">
        <span>{document.reference}</span>
      </div>
      <h2>{document.title}</h2>
      <p className="memo-subtitle">Requiere revisión profesional</p>
      <DocumentBlockContent blocks={blocks} />
      <footer className="paper-footer">
        <span>Contenido del proyecto · Pendiente de revisión y aprobación</span>
        <span>{String(pageNumber).padStart(2, '0')}</span>
      </footer>
    </article>
  )
}
