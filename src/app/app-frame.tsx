import {
  AppShellContent,
  AppShellHeader,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@doscientos/ui'
import { Link } from '@tanstack/react-router'
import { FileCheck2, FileText, HardHat } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'

import './app-frame.css'

export function AppFrame({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider
      className="app-shell"
      defaultOpen
      style={{ '--sidebar-width': '224px' } as CSSProperties}
    >
      <Sidebar aria-label="Espacio de trabajo" className="app-sidebar" collapsible="offcanvas">
        <SidebarHeader className="sidebar-top">
          <Link to="/" className="workspace-lockup" aria-label="ING-TUBO, biblioteca de documentos">
            <span className="workspace-symbol">
              <HardHat aria-hidden="true" size={17} />
            </span>
            <strong>ING-TUBO</strong>
          </Link>
        </SidebarHeader>
        <div className="sidebar-divider" />
        <SidebarContent className="sidebar-content">
          <SidebarNavigation />
        </SidebarContent>
        <div className="sidebar-spacer" />
      </Sidebar>
      <SidebarInset className="app-main">
        <AppShellHeader className="app-header">
          <SidebarTrigger className="app-sidebar-toggle" />
          <div className="header-crumb">
            <Link to="/">Documentos</Link>
            <span aria-hidden="true">/</span>
            <strong>ING-TUBO</strong>
          </div>
        </AppShellHeader>
        <AppShellContent className="app-content" size="full" density="compact">
          {children}
        </AppShellContent>
      </SidebarInset>
    </SidebarProvider>
  )
}

function SidebarNavigation() {
  const { isMobile, setOpenMobile } = useSidebar()
  return (
    <nav className="sidebar-navigation" aria-label="Navegación principal">
      <Link
        to="/"
        className="sidebar-nav-item"
        activeProps={{ className: 'sidebar-nav-item active' }}
        onClick={() => {
          if (isMobile) setOpenMobile(false)
        }}
      >
        <FileText aria-hidden="true" size={16} />
        <span>Documentos</span>
      </Link>
      <div className="sidebar-divider sidebar-navigation-divider" />
      <Link
        to="/plantillas/inicio"
        className="sidebar-nav-item"
        activeProps={{ className: 'sidebar-nav-item active' }}
        onClick={() => {
          if (isMobile) setOpenMobile(false)
        }}
      >
        <FileText aria-hidden="true" size={16} />
        <span>Plantilla de inicio</span>
      </Link>
      <Link
        to="/plantillas/cierre"
        className="sidebar-nav-item"
        activeProps={{ className: 'sidebar-nav-item active' }}
        onClick={() => {
          if (isMobile) setOpenMobile(false)
        }}
      >
        <FileCheck2 aria-hidden="true" size={16} />
        <span>Plantilla de cierre</span>
      </Link>
    </nav>
  )
}
