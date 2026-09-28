import { Button } from '@doscientos/ui'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useState } from 'react'

import { useDocumentCatalog } from '../../application/document-catalog'
import { generateDocumentContent } from '../../application/document-content-generator'
import {
  createTechnicalDocument,
  type NewDocumentDraft,
} from '../../application/new-document-draft'
import { DocumentContentStep } from './document-content-step'
import { DocumentGenerationProgress } from './document-generation-progress'
import {
  initialNewDocumentDraft,
  newDocumentSteps,
  type NewDocumentStep,
} from './new-document-steps'
import { PhotoUploadStep } from './photo-upload-step'
import { ProjectDetailsStep } from './project-details-step'

import './new-document-page.css'

const stepCopy: Record<NewDocumentStep, { title: string; description: string }> = {
  obra: {
    title: 'Cuéntanos de qué obra se trata',
    description: 'Completa los datos principales del expediente.',
  },
  contenido: {
    title: 'Describe la intervención',
    description: 'Cuéntanos qué trabajo se hará para preparar el primer borrador.',
  },
  fotos: {
    title: 'Añade fotos de la obra',
    description: 'Incluye imágenes opcionales que quedarán al final del documento.',
  },
}

export function NewDocumentPage() {
  const navigate = useNavigate()
  const { documents, createDocument } = useDocumentCatalog()
  const [draft, setDraft] = useState(initialNewDocumentDraft)
  const [step, setStep] = useState<NewDocumentStep>('obra')
  const [formError, setFormError] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [generationStage, setGenerationStage] = useState(0)
  const [isPreparingPhotos, setIsPreparingPhotos] = useState(false)
  const stepIndex = newDocumentSteps.findIndex((item) => item.id === step)

  function updateDraft(nextDraft: NewDocumentDraft) {
    setDraft(nextDraft)
    setFormError('')
  }

  function continueFlow() {
    const error = getStepError(step, draft)
    if (error) {
      setFormError(error)
      return
    }
    setFormError('')
    setStep(newDocumentSteps[Math.min(stepIndex + 1, newDocumentSteps.length - 1)]?.id ?? 'fotos')
  }

  function goBack() {
    setFormError('')
    if (stepIndex === 0) return
    setStep(newDocumentSteps[stepIndex - 1]?.id ?? 'obra')
  }

  async function createDraft() {
    const error = getStepError('contenido', draft)
    if (error) {
      setStep('contenido')
      setFormError(error)
      return
    }

    setIsCreating(true)
    try {
      const blocks = await generateDocumentContent(draft, setGenerationStage)
      const document = createTechnicalDocument(draft, documents, blocks)
      createDocument(document)
      void navigate({
        to: '/documents/$documentId/edit',
        params: { documentId: document.id },
      })
    } catch {
      setIsCreating(false)
      setFormError(
        'No se pudo guardar el borrador. Prueba a reducir el tamaño o el número de fotos.',
      )
    }
  }

  if (isCreating) {
    return <DocumentGenerationProgress stage={generationStage} photoCount={draft.photos.length} />
  }

  return (
    <main className="new-document-page">
      <Link className="new-document-back-link" to="/">
        <ArrowLeft aria-hidden="true" size={15} /> Todos los documentos
      </Link>

      <header className="new-document-heading">
        <h1>Crear documento</h1>
        <p>Completa los datos de la obra y prepara un borrador listo para revisar.</p>
      </header>

      <section className="new-document-card" aria-labelledby="create-step-title">
        <div className="new-document-stepper" aria-label={`Paso ${stepIndex + 1} de 3`}>
          {newDocumentSteps.map((item, index) => (
            <div
              aria-current={item.id === step ? 'step' : undefined}
              className={`new-document-step${item.id === step ? ' is-current' : ''}${index < stepIndex ? ' is-complete' : ''}`}
              key={item.id}
            >
              <span className="new-document-step-marker">
                {index < stepIndex ? <Check aria-hidden="true" size={13} /> : index + 1}
              </span>
              <span>{item.label}</span>
              {index < newDocumentSteps.length - 1 && <i aria-hidden="true" />}
            </div>
          ))}
        </div>

        <div className="new-document-card-heading">
          <h2 id="create-step-title">{stepCopy[step].title}</h2>
          <p>{stepCopy[step].description}</p>
        </div>

        <div className="new-document-step-body">
          {step === 'obra' && <ProjectDetailsStep draft={draft} onChange={updateDraft} />}
          {step === 'contenido' && <DocumentContentStep draft={draft} onChange={updateDraft} />}
          {step === 'fotos' && (
            <PhotoUploadStep
              photos={draft.photos}
              onChange={(photos) => updateDraft({ ...draft, photos })}
              onProcessingChange={setIsPreparingPhotos}
            />
          )}
        </div>

        {formError && (
          <p className="new-document-error" role="alert">
            {formError}
          </p>
        )}

        {step === 'fotos' && (
          <div className="new-document-finish-note">
            <strong>Se guardará como borrador</strong>
            <span>
              {draft.photos.length
                ? `El documento tendrá ${draft.photos.length} ${draft.photos.length === 1 ? 'foto' : 'fotos'} al final.`
                : 'Podrás editarlo, añadir material y revisar los datos antes de emitirlo.'}
            </span>
          </div>
        )}

        <footer className="new-document-footer">
          {stepIndex === 0 ? (
            <Link className="new-document-cancel" to="/">
              Cancelar
            </Link>
          ) : (
            <Button onPress={goBack} variant="ghost">
              <ArrowLeft aria-hidden="true" size={15} /> Atrás
            </Button>
          )}
          {step === 'fotos' ? (
            <Button
              className="new-document-primary-action"
              isDisabled={isCreating || isPreparingPhotos}
              onPress={() => void createDraft()}
              size="sm"
            >
              {isPreparingPhotos
                ? 'Preparando fotos…'
                : isCreating
                  ? 'Creando…'
                  : 'Generar documento'}{' '}
              <ArrowRight aria-hidden="true" size={15} />
            </Button>
          ) : (
            <Button className="new-document-primary-action" onPress={continueFlow} size="sm">
              Continuar <ArrowRight aria-hidden="true" size={15} />
            </Button>
          )}
        </footer>
      </section>
    </main>
  )
}

function getStepError(step: NewDocumentStep, draft: NewDocumentDraft) {
  if (step === 'obra') {
    const requiredFields: Array<[string, string]> = [
      [draft.title, 'título del documento'],
      [draft.workName, 'nombre de la obra'],
      [draft.client, 'cliente o titular'],
      [draft.location, 'emplazamiento'],
      [draft.scaffoldType, 'tipo de andamio'],
      [draft.intendedUse, 'uso previsto'],
    ]
    const missing = requiredFields.filter(([value]) => !value.trim()).map(([, label]) => label)
    return missing.length ? `Completa estos campos: ${missing.join(', ')}.` : ''
  }

  if (step === 'contenido' && !draft.description.trim()) {
    return 'Describe brevemente la intervención para continuar.'
  }
  return ''
}
