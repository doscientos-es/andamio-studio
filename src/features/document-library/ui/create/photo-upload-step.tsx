import { Button, Input } from '@doscientos/ui'
import { ImagePlus, LoaderCircle, MoveDown, MoveUp, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'

import type { DocumentPhoto } from '../../domain/document'
import { preparePhoto } from './prepare-photo'

const MAX_PHOTOS = 6

export function PhotoUploadStep({
  photos,
  onChange,
  onProcessingChange,
}: {
  photos: DocumentPhoto[]
  onChange: (photos: DocumentPhoto[]) => void
  onProcessingChange: (isProcessing: boolean) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  async function addFiles(fileList: FileList | null) {
    if (!fileList?.length || isProcessing) return
    setError('')
    const files = Array.from(fileList)
    const available = MAX_PHOTOS - photos.length
    if (available <= 0) {
      setError(`Puedes añadir hasta ${MAX_PHOTOS} fotos.`)
      return
    }
    if (files.length > available) {
      setError(`Solo se añadirán las ${available} fotos que caben en este documento.`)
    }

    setIsProcessing(true)
    onProcessingChange(true)
    const prepared = []
    for (const file of files.slice(0, available)) {
      try {
        prepared.push(await preparePhoto(file))
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : 'No se pudo añadir una de las fotos.')
      }
    }
    onChange([...photos, ...prepared])
    setIsProcessing(false)
    onProcessingChange(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  function movePhoto(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= photos.length) return
    const nextPhotos = [...photos]
    const [movedPhoto] = nextPhotos.splice(index, 1)
    if (!movedPhoto) return
    nextPhotos.splice(target, 0, movedPhoto)
    onChange(nextPhotos)
  }

  function updateCaption(photoId: string, caption: string) {
    onChange(photos.map((photo) => (photo.id === photoId ? { ...photo, caption } : photo)))
  }

  function removePhoto(photoId: string) {
    onChange(photos.filter((photo) => photo.id !== photoId))
  }

  return (
    <div className="create-step-content create-photo-step">
      <div className="create-photo-heading">
        <div>
          <h2>Fotos de la obra</h2>
          <p>Las imágenes se optimizan y se incorporan al final del documento.</p>
        </div>
        <span>
          {photos.length} / {MAX_PHOTOS}
        </span>
      </div>

      <section className={`create-photo-dropzone${isProcessing ? ' is-processing' : ''}`}>
        {isProcessing ? (
          <LoaderCircle className="create-photo-spinner" aria-hidden="true" size={21} />
        ) : (
          <ImagePlus aria-hidden="true" size={21} />
        )}
        <strong>{isProcessing ? 'Preparando fotos…' : 'Añade fotos de la obra'}</strong>
        {!isProcessing && (
          <label className="create-photo-picker" htmlFor="work-photo-files">
            Elegir fotos
          </label>
        )}
        <span>JPG, PNG o WEBP · hasta 6 fotos · 20 MB por archivo</span>
        <input
          id="work-photo-files"
          accept="image/*"
          className="sr-only"
          aria-label="Añadir fotos de la obra"
          disabled={isProcessing || photos.length >= MAX_PHOTOS}
          multiple
          onChange={(event) => void addFiles(event.currentTarget.files)}
          ref={inputRef}
          type="file"
        />
      </section>

      {error && (
        <p className="create-photo-error" role="alert">
          {error}
        </p>
      )}

      {photos.length > 0 ? (
        <div className="create-photo-list" aria-label="Fotos añadidas">
          {photos.map((photo, index) => (
            <article className="create-photo-item" key={photo.id}>
              <img src={photo.dataUrl} alt={photo.caption || `Foto de obra ${index + 1}`} />
              <div className="create-photo-item-content">
                <strong title={photo.name}>{photo.name}</strong>
                <label>
                  <span className="sr-only">Pie de foto {index + 1}</span>
                  <Input
                    value={photo.caption}
                    onChange={(event) => updateCaption(photo.id, event.currentTarget.value)}
                    placeholder="Añadir pie de foto"
                  />
                </label>
              </div>
              <div className="create-photo-actions">
                <Button
                  aria-label={`Subir foto ${index + 1}`}
                  isDisabled={index === 0}
                  onPress={() => movePhoto(index, -1)}
                  size="icon-sm"
                  variant="ghost"
                >
                  <MoveUp aria-hidden="true" size={14} />
                </Button>
                <Button
                  aria-label={`Bajar foto ${index + 1}`}
                  isDisabled={index === photos.length - 1}
                  onPress={() => movePhoto(index, 1)}
                  size="icon-sm"
                  variant="ghost"
                >
                  <MoveDown aria-hidden="true" size={14} />
                </Button>
                <Button
                  aria-label={`Eliminar foto ${index + 1}`}
                  onPress={() => removePhoto(photo.id)}
                  size="icon-sm"
                  variant="ghost"
                >
                  <Trash2 aria-hidden="true" size={14} />
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="create-photo-empty">
          Las fotos son opcionales. Podrás añadirlas en cualquier momento.
        </p>
      )}
    </div>
  )
}
