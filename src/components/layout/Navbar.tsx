import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { NavItem } from '../../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Áreas de Enfoque', href: '#areas-enfoque' },
  { label: 'Sobre Mí', href: '#sobre-mi' },
  { label: 'Contacto', href: '#contacto' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll to toggle background blur and track active section (Scroll Spy)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll Spy con detección de compensación para navbar sticky
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key to close mobile menu & trap/restore focus (WCAG 2.1)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-nutri-ivory/90 backdrop-blur-md shadow-sm border-b border-nutri-forest/10 py-3.5'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center justify-between"
          aria-label="Navegación principal"
        >
          {/* Logo / Tipografía Izquierda */}
          <div className="flex-shrink-0">
            <a
              href="#inicio"
              aria-label="Jeanette Ajata Nutrición - Volver al inicio"
              className="group inline-flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold rounded-sm"
              onClick={closeMobileMenu}
            >
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-nutri-forest transition-colors duration-200 group-hover:text-nutri-forest/80">
                Jeanette Ajata
              </span>
              <span className="text-[10px] sm:text-xs tracking-widest uppercase font-medium text-nutri-sage transition-colors duration-200">
                Nutrición y Bienestar
              </span>
            </a>
          </div>

          {/* Menú de Enlaces Desktop (Centro con indicador dinámico de sección activa) */}
          <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`relative text-sm lg:text-base font-medium py-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold rounded-sm ${
                      isActive
                        ? 'text-nutri-forest font-semibold'
                        : 'text-nutri-dark/80 hover:text-nutri-forest'
                    }`}
                  >
                    <span>{item.label}</span>
                    {/* Indicador de sección activa con línea dorada sutil */}
                    {isActive ? (
                      <span
                        className="absolute bottom-[-4px] left-0 right-0 h-[2.5px] bg-nutri-gold rounded-full"
                        aria-hidden="true"
                      />
                    ) : (
                      <span
                        className="nav-link-underline"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Botón CTA Desktop (Derecha) */}
          <div className="hidden md:flex items-center">
            <a
              href="#contacto"
              aria-label="Agendar consulta o asesoría con Jeanette Ajata"
              className="inline-flex items-center gap-2 bg-nutri-sage text-nutri-ivory px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:bg-nutri-forest hover:shadow-md hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold focus-visible:ring-offset-2 focus-visible:ring-offset-nutri-ivory"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Agendar Consulta</span>
            </a>
          </div>

          {/* Botón Menú Hamburguesa Mobile */}
          <div className="flex md:hidden items-center">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={isMobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              className="p-2 rounded-lg text-nutri-forest hover:bg-nutri-forest/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Menú Desplegable Mobile */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
          className="fixed inset-x-0 top-[65px] sm:top-[73px] bottom-0 z-40 bg-nutri-olive/40 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeMobileMenu();
          }}
        >
          <div className="bg-nutri-ivory border-b border-nutri-forest/15 px-6 pt-6 pb-8 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
            <ul className="flex flex-col space-y-4" role="list">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <li key={item.label} className="border-b border-nutri-forest/10 pb-3">
                    <a
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`block text-lg font-serif font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold rounded-sm px-1 py-1 ${
                        isActive ? 'text-nutri-forest font-semibold pl-2 border-l-2 border-nutri-gold' : 'text-nutri-forest hover:text-nutri-gold'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 pt-2">
              <a
                href="#contacto"
                onClick={closeMobileMenu}
                aria-label="Agendar consulta nutricional desde menú móvil"
                className="w-full inline-flex items-center justify-center gap-2 bg-nutri-sage text-nutri-ivory px-5 py-3 rounded-full text-base font-medium shadow-sm transition-all duration-200 hover:bg-nutri-forest active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold focus-visible:ring-offset-2"
              >
                <Calendar className="w-5 h-5" aria-hidden="true" />
                <span>Agendar Consulta</span>
              </a>
            </div>

            <div className="mt-6 text-center text-xs text-nutri-forest/70 font-sans">
              Nutrición consciente, salud para toda la vida
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
