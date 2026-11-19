import React from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  FileCheck2,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export interface StepItem {
  number: string;
  badge: string;
  title: string;
  timeframe: string;
  description: string;
  highlights: string[];
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
}

export interface MethodologySectionProps {
  className?: string;
}

export const METHODOLOGY_STEPS: StepItem[] = [
  {
    number: '01',
    badge: 'Paso 01 &bull; Punto de Partida',
    title: 'Evaluación Integral',
    timeframe: '45 - 60 min',
    description:
      'Conversamos a fondo sobre tu rutina, historial, gustos alimentarios y objetivos reales. Analizamos tu punto de partida sin básculas punitivas ni culpas.',
    highlights: [
      'Entrevista sin juicios sobre tus hábitos reales',
      'Revisión de analíticas o digestión (según modalidad)',
      'Definición conjunta de metas realistas',
    ],
    icon: ClipboardCheck,
  },
  {
    number: '02',
    badge: 'Paso 02 &bull; Diseño Estratégico',
    title: 'Tu Plan a Medida',
    timeframe: 'En menos de 48 hrs',
    description:
      'Recibes tu guía o pauta personalizada en formato digital, con opciones de comidas reales, fáciles de preparar y adaptadas a tu presupuesto local.',
    highlights: [
      'Alimentos accesibles en tu mercado o súper habitual',
      'Opciones flexibles de reemplazo sin estrés',
      'Recetas sencillas que no te quitan todo el día',
    ],
    icon: FileCheck2,
  },
  {
    number: '03',
    badge: 'Paso 03 &bull; Consolidación',
    title: 'Seguimiento y Ajustes Continuos',
    timeframe: 'Acompañamiento Activo',
    description:
      'No te quedas solo con un documento. Tendrás canal directo de soporte para resolver dudas del día a día, ajustar porciones y consolidar tus hábitos.',
    highlights: [
      'Resolución de dudas prácticas por mensajería',
      'Ajustes de pauta según tus eventos sociales',
      'Educación para mantener los resultados de por vida',
    ],
    icon: HeartHandshake,
  },
];

export const MethodologySection: React.FC<MethodologySectionProps> = ({
  className = '',
}) => {
  return (
    <section
      id="metodologia"
      aria-labelledby="methodology-heading"
      className={`relative bg-nutri-ivory py-20 lg:py-28 border-t border-nutri-forest/10 overflow-hidden ${className}`}
    >
      {/* Sutil halo decorativo en los laterales */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-nutri-gold/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 bg-nutri-sage/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 space-y-4">
          <span className="text-nutri-gold uppercase tracking-widest text-xs font-semibold block">
            TU PROCESO PASO A PASO
          </span>
          <h2
            id="methodology-heading"
            className="font-title text-3xl sm:text-4xl lg:text-5xl text-nutri-forest font-normal tracking-tight leading-tight"
          >
            Sin juicios ni pautas imposibles: así es tu acompañamiento
          </h2>
          <div className="w-16 h-0.5 bg-nutri-gold mx-auto rounded-full my-4" aria-hidden="true" />
          <p className="font-body text-base sm:text-lg text-nutri-dark/80 font-light leading-relaxed max-w-2xl mx-auto">
            Olvídate de la rigidez de las dietas del pasado. Diseñamos un camino estructurado y transparente para que sepas con exactitud qué esperar desde nuestro primer contacto.
          </p>
        </div>

        {/* Grid de 3 Pasos Conectados */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          
          {/* Línea conectora visual en Desktop */}
          <div
            className="hidden md:block absolute top-28 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-nutri-forest/15 via-nutri-gold/40 to-nutri-forest/15 -z-0"
            aria-hidden="true"
          />

          {METHODOLOGY_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.15, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                className="relative z-10 flex flex-col justify-between bg-white/75 backdrop-blur-sm rounded-3xl p-7 sm:p-9 border border-nutri-forest/15 shadow-sm hover:shadow-xl hover:border-nutri-gold/60 transition-all duration-300 group"
              >
                <div>
                  {/* Fila superior: Número grande estilizado e Icono */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-title text-3xl sm:text-4xl font-bold text-nutri-forest/20 group-hover:text-nutri-gold/70 transition-colors duration-300">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-nutri-ivory flex items-center justify-center border border-nutri-forest/10 text-nutri-forest shadow-xs group-hover:bg-nutri-forest group-hover:text-nutri-ivory transition-colors duration-300">
                      <Icon className="w-6 h-6 text-nutri-sage group-hover:text-nutri-gold transition-colors duration-300" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Badge de Tiempo y Etapa */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nutri-sage/10 text-nutri-forest text-xs font-medium mb-3">
                    <Clock className="w-3.5 h-3.5 text-nutri-gold" aria-hidden="true" />
                    <span>{step.timeframe}</span>
                  </div>

                  {/* Título del Paso */}
                  <h3 className="font-title text-xl sm:text-2xl text-nutri-forest font-normal leading-snug mb-3">
                    {step.title}
                  </h3>

                  {/* Descripción */}
                  <p className="font-body text-sm sm:text-base text-nutri-dark/85 leading-relaxed font-light mb-6">
                    {step.description}
                  </p>

                  {/* Highlights en bullet points */}
                  <ul className="space-y-2.5 pt-4 border-t border-nutri-forest/10" role="list">
                    {step.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-nutri-dark/85">
                        <CheckCircle2 className="w-4 h-4 text-nutri-gold shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer de la tarjeta */}
                <div className="pt-6 mt-6 border-t border-nutri-forest/10 flex items-center justify-between text-xs text-nutri-forest/70 font-medium">
                  <span>Etapa {idx + 1} de 3</span>
                  <span className="text-nutri-gold group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                    Continuar <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Cierre de Sección: Botón centrado suave que hace scroll a #contacto */}
        <div className="mt-14 lg:mt-16 text-center space-y-4">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contacto"
              aria-label="Comenzar con el Paso 1 y coordinar tu consulta"
              className="inline-flex items-center justify-center gap-2.5 bg-nutri-sage text-white px-8 py-4 rounded-full text-base font-medium shadow-sm transition-all duration-200 hover:bg-nutri-forest hover:shadow-md hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold focus-visible:ring-offset-2 focus-visible:ring-offset-nutri-ivory"
            >
              <Sparkles className="w-4 h-4 text-nutri-gold" aria-hidden="true" />
              <span>Comenzar con el Paso 1</span>
              <ArrowRight className="w-4 h-4 text-white" aria-hidden="true" />
            </a>
          </div>

          <p className="text-xs text-nutri-dark/65 font-body max-w-md mx-auto">
            La coordinación inicial no tiene costo. Te orientamos sobre la modalidad más conveniente antes de agendar.
          </p>
        </div>

      </div>
    </section>
  );
};

export default MethodologySection;
