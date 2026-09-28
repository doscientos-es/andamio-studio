import { describe, expect, it } from 'vitest'

import { LocalDocumentRepository } from './local-document-repository'
import { sampleDocuments } from './sample-documents'

function createMemoryStorage() {
  const values = new Map<string, string>()
  return {
    getItem(key: string) {
      return values.get(key) ?? null
    },
    setItem(key: string, value: string) {
      values.set(key, value)
    },
  }
}

describe('LocalDocumentRepository', () => {
  it('loads fixtures when no local documents have been saved', () => {
    const repository = new LocalDocumentRepository(createMemoryStorage())
    expect(repository.load()).toEqual(sampleDocuments)
  })

  it('returns a saved revision from the local storage adapter', () => {
    const repository = new LocalDocumentRepository(createMemoryStorage())
    const source = sampleDocuments[0]
    if (!source) throw new Error('Falta el expediente sintético de prueba.')
    const changed = { ...source, title: 'Título editado' }
    repository.save([changed])
    expect(repository.load()).toEqual([changed])
  })

  it('falls back to the fixtures when local storage contains invalid data', () => {
    const storage = createMemoryStorage()
    storage.setItem('andamio-studio:documents:v1', '{malformed')
    expect(new LocalDocumentRepository(storage).load()).toEqual(sampleDocuments)
  })
})
