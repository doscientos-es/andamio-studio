import type { DocumentPreviewPageDescriptor } from '../../application/document-pagination'
import type { TechnicalDocument } from '../../domain/document'

export function DocumentTechnicalPage({
  document,
  page,
}: {
  document: TechnicalDocument
  page: DocumentPreviewPageDescriptor
}) {
  return (
    <article
      className={`document-sheet document-technical-page document-technical-${page.type}`}
      id={`document-page-${page.pageNumber}`}
    >
      <div className="memo-head">
        <span>{document.reference}</span>
      </div>
      <h2>{page.title}</h2>
      {page.type === 'section' ? (
        <TechnicalSection document={document} title={page.title ?? ''} />
      ) : page.type === 'table' ? (
        <CalculationTable
          document={document}
          title={page.title ?? ''}
          sequence={page.sequence ?? 1}
        />
      ) : (
        <DrawingSheet document={document} view={page.title ?? ''} sequence={page.sequence ?? 1} />
      )}
      <footer className="paper-footer">
        <span>Documento de trabajo · Pendiente de validación técnica</span>
        <span>{String(page.pageNumber).padStart(2, '0')}</span>
      </footer>
    </article>
  )
}

function TechnicalSection({ document, title }: { document: TechnicalDocument; title: string }) {
  const details = getProjectDetails(document)
  const paragraphs = getSectionCopy(title, document)

  return (
    <>
      <div className="technical-section-context">
        <span>{document.workName ?? document.title}</span>
        <span>{document.location}</span>
      </div>
      <div className="technical-prose">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <dl className="technical-data-strip">
        {details.slice(0, 3).map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <div className="technical-review-box">
        <strong>Dato pendiente de validar</strong>
        <span>Completar con la documentación y los cálculos aprobados para esta obra.</span>
      </div>
    </>
  )
}

function CalculationTable({
  document,
  title,
  sequence,
}: {
  document: TechnicalDocument
  title: string
  sequence: number
}) {
  const rows = getProjectDetails(document)

  return (
    <div className="technical-table-wrap">
      <p className="technical-table-intro">
        Registro de parámetros para la revisión de: {title.toLocaleLowerCase('es')}.
      </p>
      <table className="technical-table">
        <thead>
          <tr>
            <th>Parámetro</th>
            <th>Dato aportado</th>
            <th>Revisión</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, value], index) => (
            <tr key={`${label}-${sequence}`}>
              <th scope="row">{label}</th>
              <td>{value}</td>
              <td>
                {index < 3 && value !== 'Pendiente de completar'
                  ? 'Contrastar'
                  : 'Pendiente de cálculo'}
              </td>
            </tr>
          ))}
          {Array.from({ length: 5 }, (_, index) => (
            <tr key={`pending-${sequence}-${index}`}>
              <th scope="row">Comprobación {String(index + 1).padStart(2, '0')}</th>
              <td>Pendiente de completar</td>
              <td>Pendiente de cálculo</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="technical-table-note">
        Los valores de cálculo se incorporarán tras la comprobación del técnico responsable.
      </div>
    </div>
  )
}

function DrawingSheet({
  document,
  view,
  sequence,
}: {
  document: TechnicalDocument
  view: string
  sequence: number
}) {
  return (
    <div className="drawing-sheet-content">
      <div className="drawing-viewport">
        {view === 'Planta de implantación' ? (
          <PlanDrawing />
        ) : view === 'Sección transversal' ? (
          <SectionDrawing />
        ) : view === 'Detalle de unión' ? (
          <ConnectionDrawing />
        ) : (
          <ElevationDrawing />
        )}
      </div>
      <div className="drawing-caption-grid">
        <div>
          <span>OBRA</span>
          <strong>{document.workName ?? document.title}</strong>
        </div>
        <div>
          <span>EMPLAZAMIENTO</span>
          <strong>{document.location}</strong>
        </div>
        <div>
          <span>PLANO</span>
          <strong>
            {String(sequence).padStart(2, '0')} · {view}
          </strong>
        </div>
        <div>
          <span>ESCALA / REVISIÓN</span>
          <strong>Por definir · Pendiente</strong>
        </div>
      </div>
      <p className="drawing-placeholder-note">
        Esquema de referencia · Sustituir por plano validado
      </p>
    </div>
  )
}

function ElevationDrawing() {
  return (
    <svg viewBox="0 0 900 500" aria-label="Esquema placeholder de alzado de andamio">
      <DrawingFrame />
      <g className="drawing-structure">
        {Array.from({ length: 7 }, (_, index) => {
          const x = 135 + index * 82
          return <line key={`post-${index}`} x1={x} y1="110" x2={x} y2="390" />
        })}
        {Array.from({ length: 5 }, (_, index) => {
          const y = 145 + index * 57
          return <line key={`rail-${index}`} x1="135" y1={y} x2="627" y2={y} />
        })}
        {Array.from({ length: 6 }, (_, index) => {
          const x = 135 + index * 82
          return (
            <g key={`brace-${index}`}>
              <line x1={x} y1="202" x2={x + 82} y2="259" />
              <line x1={x} y1="316" x2={x + 82} y2="259" />
            </g>
          )
        })}
        <line className="drawing-ground" x1="80" y1="395" x2="690" y2="395" />
      </g>
      <DrawingCallouts />
      <DrawingDimensions />
    </svg>
  )
}

function PlanDrawing() {
  return (
    <svg viewBox="0 0 900 500" aria-label="Esquema placeholder de planta de andamio">
      <DrawingFrame />
      <g className="drawing-structure">
        <rect x="145" y="125" width="470" height="78" />
        <rect x="145" y="283" width="470" height="78" />
        {Array.from({ length: 7 }, (_, index) => {
          const x = 145 + index * 78
          return (
            <g key={`bay-${index}`}>
              <line x1={x} y1="125" x2={x} y2="203" />
              <line x1={x} y1="283" x2={x} y2="361" />
              <line x1={x} y1="203" x2={x} y2="283" />
            </g>
          )
        })}
        <line className="drawing-ground" x1="120" y1="243" x2="650" y2="243" />
      </g>
      <DrawingCallouts />
      <DrawingDimensions />
    </svg>
  )
}

function SectionDrawing() {
  return (
    <svg viewBox="0 0 900 500" aria-label="Esquema placeholder de sección de andamio">
      <DrawingFrame />
      <g className="drawing-structure">
        <path d="M275 95H480V392H275Z" />
        <line x1="210" y1="370" x2="660" y2="370" />
        <line x1="305" y1="125" x2="305" y2="370" />
        <line x1="390" y1="125" x2="390" y2="370" />
        <line x1="475" y1="125" x2="475" y2="370" />
        <line x1="295" y1="170" x2="490" y2="170" />
        <line x1="295" y1="250" x2="490" y2="250" />
        <line x1="295" y1="330" x2="490" y2="330" />
        <line x1="305" y1="250" x2="390" y2="170" />
        <line x1="390" y1="250" x2="475" y2="170" />
        <line className="drawing-ground" x1="150" y1="392" x2="700" y2="392" />
      </g>
      <DrawingCallouts />
      <DrawingDimensions />
    </svg>
  )
}

function ConnectionDrawing() {
  return (
    <svg viewBox="0 0 900 500" aria-label="Esquema placeholder de detalle de unión">
      <DrawingFrame />
      <g className="drawing-structure drawing-detail">
        <rect x="580" y="98" width="72" height="300" />
        <line x1="210" y1="185" x2="580" y2="185" />
        <line x1="210" y1="310" x2="580" y2="310" />
        <line x1="235" y1="145" x2="235" y2="360" />
        <line x1="280" y1="185" x2="280" y2="310" />
        <path d="M280 185L475 118L580 148" />
        <path d="M280 310L465 375L580 340" />
        <circle cx="538" cy="139" r="12" />
        <circle cx="538" cy="349" r="12" />
        <line className="drawing-dimension" x1="538" y1="139" x2="538" y2="349" />
      </g>
      <DrawingCallouts />
      <DrawingDimensions />
    </svg>
  )
}

function DrawingFrame() {
  return (
    <g className="drawing-frame">
      <rect x="28" y="25" width="844" height="450" />
      <path d="M28 432H872M700 432V475" />
      <text x="48" y="457">
        VISTA TÉCNICA · GEOMETRÍA PENDIENTE
      </text>
      <text x="732" y="457">
        ESCALA: N/D
      </text>
    </g>
  )
}

function DrawingCallouts() {
  return (
    <g className="drawing-annotations">
      <path d="M610 145L724 105H808" />
      <text x="660" y="93">
        Cota por confirmar
      </text>
      <path d="M570 310L720 350H810" />
      <text x="667" y="371">
        Anclaje por definir
      </text>
      <text x="91" y="76">
        ESQUEMA NO CONSTRUCTIVO
      </text>
    </g>
  )
}

function DrawingDimensions() {
  return (
    <g className="drawing-dimensions">
      <path d="M135 408V418M627 408V418M135 413H627" />
      <path d="M111 110H121M111 390H121M116 110V390" />
      <text x="320" y="430">
        Longitud: pendiente
      </text>
      <text x="91" y="275" transform="rotate(-90 91 275)">
        Altura: pendiente
      </text>
    </g>
  )
}

function getProjectDetails(document: TechnicalDocument) {
  return [
    ['Obra', document.workName ?? document.title],
    ['Titular', document.client],
    ['Emplazamiento', document.location],
    ['Sistema', document.scaffoldType],
    ['Uso', document.intendedUse],
    ['Altura', displayMeasurement(document.height)],
    ['Longitud', displayMeasurement(document.length)],
  ] as const
}

function displayMeasurement(value: string) {
  return value === 'Pendiente' || !value.trim() ? 'Pendiente de completar' : value
}

function getSectionCopy(title: string, document: TechnicalDocument) {
  const copyBySection: Record<string, string[]> = {
    'Datos de partida': [
      `La base de esta documentación es la información recogida para «${document.workName ?? document.title}». Los datos descriptivos se muestran según lo aportado al expediente.`,
      'Las acciones, hipótesis de cálculo y propiedades de los componentes se completarán con la documentación del sistema y los resultados aprobados.',
    ],
    'Emplazamiento e implantación': [
      `El emplazamiento indicado es ${document.location}. La geometría del soporte, las condiciones del terreno y las interferencias del entorno quedan pendientes de confirmación.`,
      'La disposición definitiva deberá representarse sobre el levantamiento o la documentación gráfica de obra.',
    ],
    'Descripción del sistema': [
      `El sistema indicado en los datos de partida es ${document.scaffoldType}. La identificación de componentes y sus características se incorporarán a partir de la documentación del fabricante.`,
      'Este apartado organiza la información para su posterior contraste con la solución realmente prevista.',
    ],
    'Configuración del andamio': [
      `El uso descrito para la estructura es: ${document.intendedUse}. Las dimensiones generales disponibles se recogen en la ficha y deben comprobarse en el plano definitivo.`,
      'La configuración por niveles, vanos y módulos se documentará en los planos de este expediente.',
    ],
    'Apoyos y nivelación': [
      'La condición del soporte y el reparto de cargas en los apoyos no se han definido en los datos de entrada.',
      'Añadir la solución de apoyo, los elementos de reparto y los valores de comprobación cuando se disponga de ellos.',
    ],
    'Estabilidad y arriostramiento': [
      'La disposición y capacidad de los amarres deben definirse a partir de la geometría final, el soporte y las condiciones de servicio.',
      'El esquema incluido en las páginas gráficas es orientativo y no representa una solución calculada.',
    ],
    'Accesos y circulación': [
      'El acceso y la circulación entre niveles se definirán en coordinación con el montaje previsto y las condiciones reales de la obra.',
      'Completar la ubicación de accesos, pasos y posibles interferencias sobre los planos de implantación.',
    ],
    'Protecciones colectivas': [
      'La composición de las protecciones colectivas queda pendiente de especificación según la configuración final del sistema.',
      'Incorporar los componentes y comprobaciones correspondientes antes de aprobar la documentación.',
    ],
    'Secuencia de montaje': [
      'La secuencia deberá corresponder con la configuración aprobada y con las instrucciones del sistema empleado.',
      'Este documento reserva el apartado para incorporar fases, puntos de control y condiciones de seguridad del montaje.',
    ],
    'Uso, inspección y mantenimiento': [
      'Las condiciones de uso y las inspecciones asociadas se completarán con el procedimiento específico de la obra.',
      'Registrar aquí las revisiones necesarias y cualquier limitación de servicio aplicable una vez validada la solución.',
    ],
    'Limitaciones y revisión': [
      'Los datos que figuran como pendientes requieren confirmación antes de la emisión del documento.',
      'La memoria, las tablas y los planos deberán revisarse conjuntamente por el profesional responsable.',
    ],
  }

  return (
    copyBySection[title] ?? [
      'Apartado pendiente de completar con información validada para esta obra.',
    ]
  )
}
