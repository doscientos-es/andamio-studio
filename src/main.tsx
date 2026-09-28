import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { router } from '@/app/router'
import { DocumentCatalogProvider } from '@/features/document-library/application/document-catalog'

import './styles.css'

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('No se ha encontrado el elemento raíz de la aplicación.')

createRoot(rootElement).render(
  <StrictMode>
    <DocumentCatalogProvider>
      <RouterProvider router={router} />
    </DocumentCatalogProvider>
  </StrictMode>,
)
