import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { LayoutProps } from '../../types';
import { LegalModalProvider } from '../legal/LegalModal';

/**
 * Layout Base para Clínica de Nutrición Jeanette Ajata.
 * 
 * Cumple con WCAG 2.1 (AA):
 * - Enlace directo para saltar al contenido principal ("Skip to content").
 * - Estructura semántica completa (<header>, <nav>, <main>, <footer>).
 * - Soporta inyección de páginas hijas vía {children} (compatible con React Router, Next.js u Outlet).
 * - Integra LegalModalProvider para los modales de la Ley N° 21.719, 21.663 y 20.584.
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LegalModalProvider>
      <div className="min-h-screen flex flex-col bg-nutri-ivory text-nutri-dark selection:bg-nutri-gold/25 selection:text-nutri-dark">
        {/* Enlace de accesibilidad para lectores de pantalla y navegación por teclado (Skip link) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-nutri-forest focus:text-nutri-ivory focus:rounded-md focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-nutri-gold text-sm font-medium"
        >
          Saltar al contenido principal
        </a>

        {/* Barra de Navegación Sticky Superior */}
        <Navbar />

        {/* Contenedor Principal Semántico donde se inyectan las vistas */}
        <main
          id="main-content"
          className="flex-grow focus:outline-none"
          tabIndex={-1}
        >
          {children}
        </main>

        {/* Pie de Página Inferior */}
        <Footer />
      </div>
    </LegalModalProvider>
  );
};

export default Layout;
