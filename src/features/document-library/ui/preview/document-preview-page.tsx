import { Badge, Button } from '@doscientos/ui'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight, CheckCircle2, Ruler, ShieldCheck } from 'lucide-react'

import { useDocumentCatalog } from '../../application/document-catalog'
import { getDocumentPageCount } from '../../application/document-pagination'
import type { TechnicalDocument } from '../../domain/document'
import { PdfExportButton } from '../library/pdf-export-button'
import { DocumentStatusBadge } from '../shared/document-status'
import { DocumentPageMinimap } from './document-page-minimap'
import { DocumentPreviewPages } from './document-preview-pages'

import './document-preview-page.css'

export function DocumentPreviewPage({ document }: { document: TechnicalDocument }) {
  const { updateDocument } = useDocumentCatalog()
  const pageCount = getDocumentPageCount(document.blocks, document.photos?.length ?? 0)

  function approveReview() {
    updateDocument({
      ...document,
      status: 'Revisado',
      updatedAt: new Date().toISOString().slice(0, 10),
    })
  }

  return (
    <div className="document-preview-page">
      <div className="document-breadcrumb">
        <Link to="/">
          <ArrowLeft aria-hidden="true" size={14} /> Documentos
        </Link>
        <span aria-hidden="true">/</span>
        <span>Vista previa</span>
      </div>
      <div className="preview-heading">
        <div>
          <div className="preview-reference">
            <span>{document.reference}</span>
            <DocumentStatusBadge status={document.status} />
          </div>
          <h1>{document.title}</h1>
          <p>{document.location}</p>
        </div>
        <div className="preview-actions">
          <PdfExportButton document={document} />
          {document.status === 'En revisión' && (
            <Button
              className="preview-approve-button"
              onPress={approveReview}
              size="sm"
              variant="outline"
            >
              <CheckCircle2 aria-hidden="true" size={14} /> Aprobar revisión
            </Button>
          )}
          <Link
            className="preview-edit-button"
            to="/documents/$documentId/edit"
            params={{ documentId: document.id }}
          >
            Editar <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </div>
      <div className="preview-workspace">
        <section className="preview-paper-area" aria-label="Previsualización del documento">
          <div className="preview-paper-caption">{pageCount} páginas</div>
          <DocumentPreviewPages document={document} />
        </section>
        <aside className="preview-details">
          <DocumentPageMinimap document={document} />
          <section className="detail-panel">
            <dl>
              <div>
                <dt>Titular / cliente</dt>
                <dd>{document.client}</dd>
              </div>
              <div>
                <dt>Configuración</dt>
                <dd>{document.scaffoldType}</dd>
              </div>
              <div>
                <dt>Uso previsto</dt>
                <dd>{document.intendedUse}</dd>
              </div>
              <div>
                <dt>Dimensiones</dt>
                <dd>
                  <Ruler aria-hidden="true" size={13} /> {document.height} alto · {document.length}{' '}
                  longitud
                </dd>
              </div>
              <div>
                <dt>Fuentes asociadas</dt>
                <dd>{document.sourceCount} referencias técnicas</dd>
              </div>
              <div>
                <dt>Fotografías</dt>
                <dd>{document.photos?.length ?? 0} imágenes de obra</dd>
              </div>
            </dl>
          </section>
          <section className="review-panel">
            <div className="review-panel-heading">
              <ShieldCheck aria-hidden="true" size={16} />
              <strong>Revisión profesional</strong>
            </div>
            <p>
              {document.status === 'Revisado'
                ? 'Revisión interna registrada. Las comprobaciones técnicas y la firma del responsable siguen siendo manuales.'
                : 'Antes de emitir, contrasta el cálculo y la normativa; la firma del responsable siempre es manual.'}
            </p>
            <ul>
              <li>
                <Badge variant="warning">Pendiente</Badge>
                <span>Cálculo y configuración</span>
              </li>
              <li>
                <Badge variant="warning">Pendiente</Badge>
                <span>Normativa aplicable</span>
              </li>
              <li>
                <Badge variant="outline">Manual</Badge>
                <span>Firma del responsable</span>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  )
}
