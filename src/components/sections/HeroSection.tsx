import React, { useState } from 'react';
import { Globe, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { FloatingBadge } from '../ui/MotionPrimitives';

export interface HeroSectionProps {
  onSelectBolivia?: () => void;
  onSelectChile?: () => void;
  whatsappNumber?: string; // Formato internacional, ej: "56900000000"
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  whatsappNumber = '56900000000',
}) => {
  const [imageError, setImageError] = useState(false);

  const boliviaWaLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hola Jeanette, me comunico desde Bolivia y quisiera agendar una Consulta Nutricional Online.'
  )}`;

  const chileWaLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hola Jeanette, me interesa el Programa de Educación Alimentaria y hábitos en Calama, Chile.'
  )}`;

  // URL primaria y respaldo de alimentación saludable y consulta
  const primaryImageUrl = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80';
  const fallbackImageUrl = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80';

  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative bg-nutri-ivory pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-nutri-forest/10"
    >
      {/* Sutil halo decorativo de fondo */}
      <div
        className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-nutri-gold/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-nutri-sage/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ======================================================== */}
          {/* COLUMNA IZQUIERDA: Textos Legales, Propuesta y CTAs     */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* Badge superior requerido */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nutri-sage text-white text-xs sm:text-sm font-medium tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-nutri-gold" aria-hidden="true" />
              <span>Telemedicina Internacional &amp; Asesorías en Calama</span>
            </div>

            {/* Título Principal <h1> con font-title (Playfair Display) y color nutri-forest */}
            <h1
              id="hero-heading"
              className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.18] font-normal text-nutri-forest tracking-tight"
            >
              Transforma tus hábitos y tu salud a través de una alimentación consciente
            </h1>

            {/* Párrafo descriptivo con font-body y color nutri-dark */}
            <p className="font-body text-base sm:text-lg md:text-xl text-nutri-dark leading-relaxed font-light max-w-2xl">
              Soy Jeanette Ajata, Nutricionista titulada en Bolivia. Te acompaño mediante Consulta Nutricional Online internacional y Programas de Educación Alimentaria en Chile. Sin dietas restrictivas, 100% adaptado a tu estilo de vida.
            </p>

            {/* ======================================================== */}
            {/* BOTONES DE SEGMENTACIÓN (CTAs)                           */}
            {/* ======================================================== */}
            <div className="pt-2 w-full sm:w-auto flex flex-col sm:flex-row gap-3.5 sm:gap-4">
              {/* Botón Primario 1 (Bolivia - Telemedicina) */}
              <a
                href={boliviaWaLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agendar telemedicina para pacientes en Bolivia (abre en WhatsApp)"
                className="inline-flex items-center justify-center gap-2.5 bg-nutri-sage text-white px-6 py-3.5 rounded-full text-sm sm:text-base font-medium shadow-sm transition-all duration-200 hover:bg-nutri-forest hover:shadow-md hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold focus-visible:ring-offset-2 focus-visible:ring-offset-nutri-ivory"
              >
                <Globe className="w-4 h-4 text-nutri-ivory" aria-hidden="true" />
                <span>Telemedicina (Pacientes Bolivia)</span>
              </a>

              {/* Botón Primario 2 (Chile - Asesoría en Calama) */}
              <a
                href={chileWaLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Solicitar asesoría de educación alimentaria en Calama, Chile (abre en WhatsApp)"
                className="inline-flex items-center justify-center gap-2.5 border-2 border-nutri-sage text-nutri-sage bg-transparent px-6 py-3.5 rounded-full text-sm sm:text-base font-medium transition-all duration-200 hover:bg-nutri-sage hover:text-white hover:shadow-md hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold focus-visible:ring-offset-2 focus-visible:ring-offset-nutri-ivory"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>Asesoría en Calama (Chile)</span>
              </a>
            </div>

            {/* ======================================================== */}
            {/* DISCLAIMER DE TRANSPARENCIA LEGAL (Ley 20.584)           */}
            {/* ======================================================== */}
            <div className="pt-2 max-w-xl">
              <small className="block text-xs text-nutri-dark/70 leading-relaxed font-normal bg-nutri-forest/5 p-3 rounded-xl border border-nutri-forest/10">
                <span className="inline-flex items-center gap-1.5 font-semibold text-nutri-forest mr-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-nutri-gold flex-shrink-0" aria-hidden="true" />
                  Transparencia profesional:
                </span>
                Profesional con título emitido en Bolivia. Servicios en Chile enfocados exclusivamente en educación alimentaria y promoción de hábitos saludables mientras finaliza su proceso de convalidación legal (Ley N° 20.584).
              </small>
            </div>

          </div>

          {/* ======================================================== */}
          {/* COLUMNA DERECHA: Imagen con esquinas asimétricas & marco */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              
              {/* Marco exterior decorativo con acento nutri-gold */}
              <div
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl border-2 border-nutri-gold/50 pointer-events-none transition-transform duration-300"
                aria-hidden="true"
              />

              {/* Contenedor elegante de la imagen con esquinas redondeadas asimétricas y borde nutri-gold */}
              <div className="relative overflow-hidden rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl border-2 border-nutri-gold shadow-xl bg-nutri-forest/10 aspect-[4/5] sm:aspect-[3/4]">
                
                {/* Fotografía profesional de nutrición y bienestar */}
                <img
                  src={imageError ? fallbackImageUrl : primaryImageUrl}
                  alt="Alimentación consciente y asesoría nutricional con Jeanette Ajata"
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  loading="eager"
                  width="600"
                  height="800"
                  onError={() => setImageError(true)}
                />

                {/* Gradiente sutil para integración cromática Natural Premium */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-nutri-dark/65 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Tarjeta flotante inferior animada con FloatingBadge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <FloatingBadge amplitude={3} duration={4}>
                    <div className="bg-nutri-ivory/95 backdrop-blur-md p-3.5 rounded-2xl border border-nutri-forest/15 shadow-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-title text-sm sm:text-base font-semibold text-nutri-forest leading-tight">
                            Jeanette Ajata Cutipa
                          </p>
                          <p className="text-[11px] text-nutri-dark/75 font-body">
                            Licenciada en Nutrición (Bolivia)
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-nutri-forest bg-nutri-gold/20 text-nutri-dark px-2 py-0.5 rounded-full border border-nutri-gold/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-nutri-sage animate-pulse" />
                          Calama &bull; Online
                        </span>
                      </div>
                    </div>
                  </FloatingBadge>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
