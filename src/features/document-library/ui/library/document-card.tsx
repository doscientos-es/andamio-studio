import { Button } from '@doscientos/ui'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, FileText, Trash2 } from 'lucide-react'

import { useDocumentCatalog } from '../../application/document-catalog'
import { getDocumentPageCount } from '../../application/document-pagination'
import type { TechnicalDocument } from '../../domain/document'
import { DocumentArtwork } from '../shared/document-artwork'
import { DocumentStatusBadge } from '../shared/document-status'
import { formatDocumentDate } from '../shared/format-date'
import { PdfExportButton } from './pdf-export-button'

import './document-card.css'

export function DocumentCard({ document }: { document: TechnicalDocument }) {
  const { deleteDocument } = useDocumentCatalog()
  const pageCount = getDocumentPageCount(document.blocks, document.photos?.length ?? 0)
  return (
    <article className="document-card">
      <Link
        className="document-card-hit-area"
        to="/documents/$documentId"
        params={{ documentId: document.id }}
        aria-label={`Abrir ${document.title}`}
      />
      <div className="document-card-thumbnail">
        <DocumentArtwork document={document} />
      </div>
      <div className="document-card-content">
        <div className="document-card-reference">
          <span>
            <FileText aria-hidden="true" size={13} /> {document.reference}
          </span>
          <DocumentStatusBadge status={document.status} />
        </div>
        <h2>{document.title}</h2>
        <p>{document.location}</p>
        <p className="document-card-summary">{document.summary}</p>
        <div className="document-card-footer">
          <span>
            {formatDocumentDate(document.updatedAt)} <i aria-hidden="true">·</i> {pageCount} páginas
          </span>
          <div className="document-card-actions">
            <Link
              className="open-document-link"
              to="/documents/$documentId"
              params={{ documentId: document.id }}
            >
              Abrir <ArrowUpRight aria-hidden="true" size={14} />
            </Link>
            <PdfExportButton document={document} />
            <Button
              aria-label={`Eliminar ${document.title}`}
              className="delete-document-button"
              onPress={() => {
                if (
                  window.confirm(`¿Eliminar “${document.title}”? Esta acción no se puede deshacer.`)
                ) {
                  deleteDocument(document.id)
                }
              }}
              size="icon-sm"
              variant="ghost"
            >
              <Trash2 aria-hidden="true" size={14} />
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
