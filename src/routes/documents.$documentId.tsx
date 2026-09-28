import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/documents/$documentId')({ component: DocumentRouteLayout })

function DocumentRouteLayout() {
  return <Outlet />
}
