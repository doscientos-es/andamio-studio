import { Textarea } from '@doscientos/ui'
import { FileCheck2 } from 'lucide-react'

import type { NewDocumentDraft } from '../../application/new-document-draft'

export function DocumentContentStep({
  draft,
  onChange,
}: {
  draft: NewDocumentDraft
  onChange: (draft: NewDocumentDraft) => void
}) {
  return (
    <div className="create-step-content create-content-step">
      <div className="create-field">
        <label className="create-field-label" htmlFor="intervention-description">
          Describe la intervención <span className="create-required">· Obligatorio</span>
        </label>
        <span className="create-field-description">
          Indica qué trabajos se harán y cualquier particularidad que deba figurar en el documento.
        </span>
        <Textarea
          id="intervention-description"
          className="create-description-input"
          maxLength={4000}
          value={draft.description}
          onChange={(event) => onChange({ ...draft, description: event.currentTarget.value })}
          placeholder="Ej. Acceso temporal para inspeccionar la cara exterior del depósito. Se trabajará desde tres niveles y se delimitará la zona inferior…"
          rows={7}
        />
        <span className="create-character-count">{draft.description.length} / 4.000</span>
      </div>
      <div className="create-field">
        <label className="create-field-label" htmlFor="intervention-observations">
          Observaciones
        </label>
        <span className="create-field-description">
          Detalles adicionales que quieras dejar preparados para el editor.
        </span>
        <Textarea
          id="intervention-observations"
          className="create-observations-input"
          maxLength={2000}
          value={draft.observations}
          onChange={(event) => onChange({ ...draft, observations: event.currentTarget.value })}
          placeholder="Condiciones de acceso, elementos singulares, coordinación…"
          rows={4}
        />
      </div>
      <div className="create-review-note">
        <FileCheck2 aria-hidden="true" size={17} />
        <p>
          La IA organizará los datos que has escrito en apartados técnicos. Podrás editar y revisar
          cada sección antes de emitir el documento.
        </p>
      </div>
    </div>
  )
}
