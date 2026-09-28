import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

import { AppFrame } from '@/app/app-frame'

export const Route = createRootRoute({
  component: RootLayout,
  errorComponent: RootError,
  notFoundComponent: NotFound,
})

function RootLayout() {
  return (
    <AppFrame>
      <Outlet />
    </AppFrame>
  )
}

function RootError({ error, reset }: { error: unknown; reset: () => void }) {
  return (
    <main className="route-state" role="alert">
      <h1>No se ha podido cargar el proyecto</h1>
      <p>{error instanceof Error ? error.message : 'Inténtalo de nuevo.'}</p>
      <button onClick={reset}>Reintentar</button>
      <Link to="/">Volver al inicio</Link>
    </main>
  )
}

function NotFound() {
  return (
    <main className="route-state">
      <h1>Página no encontrada</h1>
      <Link to="/">Volver al inicio</Link>
    </main>
  )
}
