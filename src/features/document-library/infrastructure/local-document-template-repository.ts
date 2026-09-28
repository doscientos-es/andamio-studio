import {
  defaultDocumentTemplateSettings,
  type DocumentTemplateSettings,
} from '../domain/document-template'

const STORAGE_KEY = 'andamio-studio.document-templates.v1'

export class LocalDocumentTemplateRepository {
  load(): DocumentTemplateSettings {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return defaultDocumentTemplateSettings
      const value: unknown = JSON.parse(raw)
      if (!isTemplateSettings(value)) return defaultDocumentTemplateSettings
      return value
    } catch {
      return defaultDocumentTemplateSettings
    }
  }

  save(settings: DocumentTemplateSettings) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }
}

function isTemplateSettings(value: unknown): value is DocumentTemplateSettings {
  if (typeof value !== 'object' || value === null) return false
  return Object.keys(defaultDocumentTemplateSettings).every(
    (key) => typeof (value as Record<string, unknown>)[key] === 'string',
  )
}
