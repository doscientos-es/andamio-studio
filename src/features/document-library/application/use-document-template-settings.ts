import { useState } from 'react'

import {
  defaultDocumentTemplateSettings,
  type DocumentTemplateSettings,
} from '../domain/document-template'
import { LocalDocumentTemplateRepository } from '../infrastructure/local-document-template-repository'

const templateRepository = new LocalDocumentTemplateRepository()

export function useDocumentTemplateSettings() {
  const [settings, setSettings] = useState(() => templateRepository.load())

  function updateSettings(changes: Partial<DocumentTemplateSettings>) {
    setSettings((current) => {
      const next = { ...current, ...changes }
      templateRepository.save(next)
      return next
    })
  }

  function resetSettings() {
    templateRepository.save(defaultDocumentTemplateSettings)
    setSettings(defaultDocumentTemplateSettings)
  }

  return { settings, updateSettings, resetSettings }
}
