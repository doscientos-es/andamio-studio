import { Input } from '@doscientos/ui'
import type { ReactNode } from 'react'

import type { NewDocumentDraft } from '../../application/new-document-draft'

export function ProjectDetailsStep({
  draft,
  onChange,
}: {
  draft: NewDocumentDraft
  onChange: (draft: NewDocumentDraft) => void
}) {
  return (
    <div className="create-step-content">
      <div className="create-form-grid">
        <FormField label="Título del documento" required>
          <Input
            value={draft.title}
            onChange={(event) => onChange({ ...draft, title: event.currentTarget.value })}
            placeholder="Ej. Proyecto de andamio · Fachada norte"
          />
        </FormField>
        <FormField label="Nombre de la obra" required>
          <Input
            value={draft.workName}
            onChange={(event) => onChange({ ...draft, workName: event.currentTarget.value })}
            placeholder="Ej. Rehabilitación de fachada norte"
          />
        </FormField>
        <FormField label="Cliente / titular" required>
          <Input
            value={draft.client}
            onChange={(event) => onChange({ ...draft, client: event.currentTarget.value })}
            placeholder="Nombre del cliente o empresa"
          />
        </FormField>
        <FormField label="Emplazamiento" required>
          <Input
            value={draft.location}
            onChange={(event) => onChange({ ...draft, location: event.currentTarget.value })}
            placeholder="Dirección, municipio"
          />
        </FormField>
        <FormField label="Tipo de andamio o estructura" required>
          <Input
            value={draft.scaffoldType}
            onChange={(event) => onChange({ ...draft, scaffoldType: event.currentTarget.value })}
            placeholder="Ej. Andamio multidireccional"
          />
        </FormField>
        <FormField label="Uso previsto" required>
          <Input
            value={draft.intendedUse}
            onChange={(event) => onChange({ ...draft, intendedUse: event.currentTarget.value })}
            placeholder="Ej. Acceso y trabajos de fachada"
          />
        </FormField>
        <FormField label="Altura" hint="Opcional">
          <Input
            value={draft.height}
            onChange={(event) => onChange({ ...draft, height: event.currentTarget.value })}
            placeholder="Ej. 18,40 m"
          />
        </FormField>
        <FormField label="Longitud" hint="Opcional">
          <Input
            value={draft.length}
            onChange={(event) => onChange({ ...draft, length: event.currentTarget.value })}
            placeholder="Ej. 32,00 m"
          />
        </FormField>
      </div>
    </div>
  )
}

function FormField({
  label,
  required,
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="create-field">
      <span className="create-field-label">
        {label}
        {required && <span className="create-required"> · Obligatorio</span>}
        {hint && <span className="create-field-hint">{hint}</span>}
      </span>
      {children}
    </label>
  )
}
