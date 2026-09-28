import { Check, FileText, LoaderCircle, ShieldCheck } from 'lucide-react'

import { documentGenerationStages } from '../../application/document-content-generator'

export function DocumentGenerationProgress({
  stage,
  photoCount,
}: {
  stage: number
  photoCount: number
}) {
  const progress = Math.min(
    94,
    Math.round(((stage + 0.75) / documentGenerationStages.length) * 100),
  )
  const steps = documentGenerationStages.map((label, index) =>
    index === 3 && photoCount === 0 ? 'Revisando apartados y anexos' : label,
  )

  return (
    <main className="new-document-page generation-page">
      <section className="generation-card" aria-labelledby="generation-title">
        <div className="generation-main">
          <div className="generation-brand-mark">
            <FileText aria-hidden="true" size={19} />
          </div>
          <h1 id="generation-title">La IA está preparando tu documento</h1>
          <p className="generation-intro">
            Analizando los datos de la obra y redactando un expediente técnico listo para revisar.
          </p>

          <progress
            className="generation-progress-track"
            aria-label="Progreso de preparación del documento"
            max={100}
            value={progress}
          />

          <ol className="generation-steps" aria-live="polite">
            {steps.map((label, index) => (
              <li
                className={index < stage ? 'is-complete' : index === stage ? 'is-active' : ''}
                key={label}
              >
                <span className="generation-step-marker">
                  {index < stage ? (
                    <Check aria-hidden="true" size={13} />
                  ) : index === stage ? (
                    <LoaderCircle className="generation-spinner" aria-hidden="true" size={13} />
                  ) : (
                    <span />
                  )}
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ol>

          <div className="generation-security-note">
            <ShieldCheck aria-hidden="true" size={15} />
            <span>El resultado se guarda como borrador para tu revisión.</span>
          </div>
        </div>

        <div className="generation-preview" aria-hidden="true">
          <div className="generation-preview-pages">
            <div className="generation-mini-page generation-mini-certificate">
              <i />
              <i />
              <i />
              <i />
              <b />
            </div>
            <div className="generation-mini-page generation-mini-body">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="generation-mini-page generation-mini-close">
              <i />
              <i />
              <b />
              <i />
            </div>
          </div>
          <div className="generation-preview-footer">
            <span>{photoCount ? `${photoCount} fotografías` : 'Estructura del documento'}</span>
            <span>PDF</span>
          </div>
        </div>
      </section>
    </main>
  )
}
