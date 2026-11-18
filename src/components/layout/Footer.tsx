import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLegalModal } from '../legal/LegalModal';

export const Footer: React.FC = () => {
  const { openLegalModal } = useLegalModal();

  return (
    <footer
      className="bg-nutri-olive text-nutri-ivory pt-16 pb-12 border-t border-nutri-forest/30"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Pie de página institucional y legal
      </h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grilla Principal de 3 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-nutri-ivory/15">
          {/* Columna 1: Identidad, Slogan & WhatsApp */}
          <div className="md:col-span-5 flex flex-col items-start space-y-4">
            <a
              href="#inicio"
              aria-label="Jeanette Ajata Nutrición - Ir al inicio de la página"
              className="inline-flex flex-col group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold rounded-sm"
            >
              <span className="font-serif text-3xl font-semibold tracking-tight text-nutri-ivory group-hover:text-nutri-gold transition-colors duration-200">
                Jeanette Ajata Cutipa
              </span>
              <span className="text-xs uppercase tracking-widest text-nutri-gold font-medium mt-0.5">
                Licenciada en Nutrición
              </span>
            </a>

            <p className="text-nutri-ivory/80 text-sm sm:text-base leading-relaxed max-w-sm font-light">
              Nutrición consciente, salud para toda la vida.
            </p>

            {/* Enlace directo a WhatsApp */}
            <div className="pt-2">
              <a
                href="https://wa.me/56900000000?text=Hola%20Jeanette,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp al +56 9 (abre en una pestaña nueva)"
                className="inline-flex items-center gap-2.5 bg-nutri-sage/80 hover:bg-nutri-sage text-nutri-ivory px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Escríbeme por WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="md:col-span-3">
            <h3 className="font-serif text-lg font-medium text-nutri-ivory tracking-wide mb-4">
              Navegación
            </h3>
            <nav aria-label="Enlaces rápidos del pie de página">
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="#inicio"
                    className="text-nutri-ivory/75 hover:text-nutri-gold transition-colors duration-200 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold rounded-sm"
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="#servicios"
                    className="text-nutri-ivory/75 hover:text-nutri-gold transition-colors duration-200 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold rounded-sm"
                  >
                    Modalidades de Atención
                  </a>
                </li>
                <li>
                  <a
                    href="#sobre-mi"
                    className="text-nutri-ivory/75 hover:text-nutri-gold transition-colors duration-200 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold rounded-sm"
                  >
                    Sobre Mí
                  </a>
                </li>
                <li>
                  <a
                    href="#contacto"
                    className="text-nutri-ivory/75 hover:text-nutri-gold transition-colors duration-200 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold rounded-sm"
                  >
                    Contacto y Reserva
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Columna 3: Información Legal & Regulatoria (Modales Interactivos) */}
          <div className="md:col-span-4">
            <h3 className="font-serif text-lg font-medium text-nutri-ivory tracking-wide mb-4">
              Marco Legal y Regulatorio
            </h3>
            <nav aria-label="Enlaces legales y de normativas">
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => openLegalModal('privacy')}
                    className="text-left text-nutri-ivory/75 hover:text-nutri-gold transition-colors duration-200 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold rounded-sm"
                  >
                    Política de Privacidad (Ley N° 21.719 y 21.663)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openLegalModal('terms')}
                    className="text-left text-nutri-ivory/75 hover:text-nutri-gold transition-colors duration-200 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold rounded-sm"
                  >
                    Términos y Condiciones del Servicio
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openLegalModal('rights')}
                    className="text-left text-nutri-ivory/75 hover:text-nutri-gold transition-colors duration-200 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold rounded-sm"
                  >
                    Ley N° 20.584 (Derechos y Deberes en Salud)
                  </button>
                </li>
              </ul>
            </nav>
            <p className="mt-4 text-xs text-nutri-ivory/60 leading-relaxed font-light">
              Atención bajo estricto cumplimiento del Código Sanitario, confidencialidad clínica y ética profesional.
            </p>
          </div>
        </div>

        {/* Barra Inferior (Bottom): Copyright & Accesibilidad */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-nutri-ivory/60 gap-4">
          <p>
            &copy; 2026 Jeanette Ajata Cutipa. Todos los derechos reservados.
          </p>
          <p className="text-nutri-ivory/50">
            Diseño accesible WCAG 2.1 AA &bull; Cumplimiento Leyes N° 21.719, 21.663 y 20.584
          </p>
        </div>
      </div>
    </footer>
  );
};
