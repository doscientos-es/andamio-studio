import { Button, Input } from '@doscientos/ui'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Eye, FileCheck2 } from 'lucide-react'
import { useState } from 'react'

import { useDocumentCatalog } from '../../application/document-catalog'
import type { DocumentBlock, TechnicalDocument } from '../../domain/document'
import { DocumentStatusBadge } from '../shared/document-status'
import { RichDocumentEditor } from './rich-document-editor'

import './document-editor-page.css'

export function DocumentEditorPage({ document }: { document: TechnicalDocument }) {
  const { updateDocument } = useDocumentCatalog()
  const [status, setStatus] = useState('Guardado')

  function save(nextDocument: TechnicalDocument) {
    updateDocument({ ...nextDocument, updatedAt: new Date().toISOString().slice(0, 10) })
    setStatus('Guardado')
  }

  function updateBlocks(blocks: DocumentBlock[]) {
    save({ ...document, blocks })
  }

  return (
    <div className="document-editor-page">
      <div className="editor-topline">
        <Link
          to="/documents/$documentId"
          params={{ documentId: document.id }}
          className="editor-back-link"
        >
          <ArrowLeft aria-hidden="true" size={14} /> Vista previa
        </Link>
        <div className="editor-save-state">
          <span />
          {status}
        </div>
      </div>
      <div className="editor-heading">
        <DocumentStatusBadge status={document.status} />
        <div className="editor-heading-actions">
          <Button
            variant="outline"
            size="sm"
            onPress={() => save({ ...document, status: 'En revisión' })}
          >
            <FileCheck2 aria-hidden="true" size={14} /> Marcar para revisión
          </Button>
          <Link
            className="editor-preview-button"
            to="/documents/$documentId"
            params={{ documentId: document.id }}
          >
            <Eye aria-hidden="true" size={14} /> Vista previa
          </Link>
        </div>
      </div>
      <div className="editor-layout">
        <section className="editor-main" aria-label="Contenido editable">
          <div className="editor-paper">
            <div className="editor-paper-label">
              <span>{document.reference}</span>
            </div>
            <label className="editor-title-label" htmlFor="document-title">
              Título del documento
            </label>
            <Input
              id="document-title"
              className="editor-title-input"
              value={document.title}
              onChange={(event) => save({ ...document, title: event.currentTarget.value })}
            />
            <div className="editor-location-line">
              {document.location} <span>·</span> {document.scaffoldType}
            </div>
            <RichDocumentEditor
              documentId={document.id}
              blocks={document.blocks}
              onChange={updateBlocks}
            />
            <div className="editor-paper-note">
              Revisa los datos técnicos y las fuentes asociadas antes de aprobar el expediente.
            </div>
          </div>
        </section>
        <aside className="editor-side-panel">
          <dl>
            <div>
              <dt>Referencia</dt>
              <dd>{document.reference}</dd>
            </div>
            <div>
              <dt>Emplazamiento</dt>
              <dd>{document.location}</dd>
            </div>
            <div>
              <dt>Uso previsto</dt>
              <dd>{document.intendedUse}</dd>
            </div>
            <div>
              <dt>Dimensiones</dt>
              <dd>
                {document.height} × {document.length}
              </dd>
            </div>
          </dl>
          <p>
            Comprueba que los datos de la ficha coinciden con la documentación técnica del
            expediente.
          </p>
        </aside>
      </div>
    </div>
  )
}
