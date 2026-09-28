import { useDocumentTemplateSettings } from '../../application/use-document-template-settings'
import type { TechnicalDocument } from '../../domain/document'

export function DocumentCertificatePage({ document }: { document: TechnicalDocument }) {
  const { settings } = useDocumentTemplateSettings()

  return (
    <article className="document-sheet document-certificate-page" id="document-page-1">
      <header className="certificate-brand">
        <span className="certificate-mark">I</span>
        <div>
          <strong>INGENIERÍA TÉCNICA</strong>
          <small>ESTRUCTURAS TUBULARES</small>
        </div>
        <span className="certificate-reference">{document.reference}</span>
      </header>
      <div className="certificate-title">
        <h2>{settings.openingTitle}</h2>
        <p>{document.title}</p>
      </div>
      <dl className="certificate-facts">
        <div>
          <dt>Autor del documento</dt>
          <dd>Pendiente de completar</dd>
        </div>
        <div>
          <dt>Documento adjunto</dt>
          <dd>{document.workName ?? document.title}</dd>
        </div>
        <div>
          <dt>Titular / cliente</dt>
          <dd>{document.client}</dd>
        </div>
        <div>
          <dt>Emplazamiento</dt>
          <dd>{document.location}</dd>
        </div>
      </dl>
      <section className="certificate-statements">
        <h3>Certificación</h3>
        <p>{settings.openingCertification}</p>
        <p>{settings.openingTechnicalNote}</p>
        <h3>Garantía profesional</h3>
        <p>{settings.openingIssueNote}</p>
      </section>
      <footer className="paper-footer">
        <span>Certificado de intervención profesional · Pendiente de revisión y firma</span>
        <span>01</span>
      </footer>
    </article>
  )
}
