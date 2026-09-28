import { Button, Input, Textarea } from '@doscientos/ui'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, RotateCcw } from 'lucide-react'

import { useDocumentTemplateSettings } from '../../application/use-document-template-settings'
import type { DocumentTemplateSettings } from '../../domain/document-template'

import './document-template-editor-page.css'

type TemplateSection = 'inicio' | 'cierre'
type TemplateField = {
  key: keyof DocumentTemplateSettings
  label: string
  multiline?: boolean
}

const fields: Record<TemplateSection, TemplateField[]> = {
  inicio: [
    { key: 'openingTitle', label: 'Título del certificado' },
    { key: 'openingCertification', label: 'Texto de certificación', multiline: true },
    { key: 'openingTechnicalNote', label: 'Nota técnica', multiline: true },
    { key: 'openingIssueNote', label: 'Revisión y emisión', multiline: true },
  ],
  cierre: [
    { key: 'closingTitle', label: 'Título del cierre' },
    { key: 'closingBody', label: 'Texto de validación', multiline: true },
  ],
}

export function DocumentTemplateEditorPage({ section }: { section: TemplateSection }) {
  const { settings, updateSettings, resetSettings } = useDocumentTemplateSettings()
  const isOpening = section === 'inicio'
  const pageTitle = isOpening ? 'Plantilla de inicio' : 'Plantilla de cierre'

  return (
    <main className="document-template-page">
      <Link className="new-document-back-link" to="/">
        <ArrowLeft aria-hidden="true" size={15} /> Documentos
      </Link>
      <header className="template-page-heading">
        <div>
          <h1>{pageTitle}</h1>
          <p>Edita el contenido fijo que aparecerá en los documentos nuevos.</p>
        </div>
        <Button onPress={resetSettings} size="sm" variant="outline">
          <RotateCcw aria-hidden="true" size={14} /> Restablecer original
        </Button>
      </header>

      <nav className="template-section-tabs" aria-label="Plantillas del documento">
        <Link
          className={`template-section-tab${isOpening ? ' is-active' : ''}`}
          to="/plantillas/inicio"
        >
          Inicio
        </Link>
        <Link
          className={`template-section-tab${!isOpening ? ' is-active' : ''}`}
          to="/plantillas/cierre"
        >
          Cierre
        </Link>
      </nav>

      <div className="template-editor-layout">
        <section className="template-fields" aria-label={`Editar ${pageTitle.toLowerCase()}`}>
          {fields[section].map((field) => (
            <label className="template-field" key={field.key}>
              <span>{field.label}</span>
              {field.multiline ? (
                <Textarea
                  rows={5}
                  value={settings[field.key]}
                  onChange={(event) => updateSettings({ [field.key]: event.currentTarget.value })}
                />
              ) : (
                <Input
                  value={settings[field.key]}
                  onChange={(event) => updateSettings({ [field.key]: event.currentTarget.value })}
                />
              )}
            </label>
          ))}
          <p className="template-save-state">Los cambios se guardan automáticamente.</p>
        </section>

        <section className="template-live-preview" aria-label="Vista previa de la plantilla">
          <div className="template-preview-page">
            {isOpening ? (
              <OpeningTemplatePreview settings={settings} />
            ) : (
              <ClosingTemplatePreview settings={settings} />
            )}
            <div className="template-preview-footer">
              <span>Documento técnico</span>
              <span>{isOpening ? '01' : 'FIN'}</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function OpeningTemplatePreview({ settings }: { settings: DocumentTemplateSettings }) {
  return (
    <>
      <div className="template-preview-brand">
        <span>I</span>
        <strong>INGENIERÍA TÉCNICA</strong>
      </div>
      <h2>{settings.openingTitle}</h2>
      <div className="template-preview-meta">
        <i />
        <i />
        <i />
        <i />
      </div>
      <h3>Certificación</h3>
      <p>{settings.openingCertification}</p>
      <p>{settings.openingTechnicalNote}</p>
      <h3>Garantía profesional</h3>
      <p>{settings.openingIssueNote}</p>
    </>
  )
}

function ClosingTemplatePreview({ settings }: { settings: DocumentTemplateSettings }) {
  return (
    <div className="template-preview-closing">
      <span />
      <h2>{settings.closingTitle}</h2>
      <p>{settings.closingBody}</p>
      <div className="template-preview-signature">
        <i />
        <i />
      </div>
    </div>
  )
}
