import type { DocumentPhoto } from '../../domain/document'

const MAX_FILE_SIZE = 20 * 1024 * 1024
const MAX_DIMENSION = 1600

export async function preparePhoto(file: File): Promise<DocumentPhoto> {
  if (!file.type.startsWith('image/')) throw new Error(`${file.name} no es una imagen.`)
  if (file.size > MAX_FILE_SIZE) throw new Error(`${file.name} supera el límite de 20 MB.`)

  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(bitmap.width * scale))
  canvas.height = Math.max(1, Math.round(bitmap.height * scale))
  const context = canvas.getContext('2d')
  if (!context) {
    bitmap.close()
    throw new Error(`No se pudo procesar ${file.name}.`)
  }
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) =>
        result ? resolve(result) : reject(new Error(`No se pudo procesar ${file.name}.`)),
      'image/jpeg',
      0.8,
    )
  })
  const dataUrl = await readBlob(blob)

  return {
    id: crypto.randomUUID(),
    name: file.name,
    caption: '',
    dataUrl,
  }
}

function readBlob(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') resolve(reader.result)
      else reject(new Error('No se pudo leer la imagen.'))
    })
    reader.addEventListener('error', () => reject(new Error('No se pudo leer la imagen.')))
    reader.readAsDataURL(blob)
  })
}
