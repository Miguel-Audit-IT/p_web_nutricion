import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Sparkles,
  HeartPulse,
  Flame,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export interface FocusArea {
  id: string;
  tabLabel: string;
  badge?: string;
  title: string;
  subtitle: string;
  description: string;
  howWeApproach: string[];
  commonSignals: string[];
  ctaText: string;
}

export const FOCUS_AREAS: FocusArea[] = [
  {
    id: 'metabolico',
    tabLabel: 'Control Metabólico',
    badge: 'Enfoque Clínico Online (Bolivia) / Educativo (Chile)',
    title: 'Manejo Metabólico: Resistencia a la Insulina, Diabetes e Hipertensión',
    subtitle: 'Estabilidad glucémica y salud cardiovascular sin pasar hambre',
    description:
      'Un abordaje científico para estabilizar niveles de glucosa, mejorar la sensibilidad a la insulina y regular la presión arterial a través de combinaciones inteligentes de alimentos reales.',
    howWeApproach: [
      'Análisis bioquímico y del índice glucémico global de tus comidas habituales.',
      'Estrategias de distribución de macronutrientes para evitar picos y caídas de energía.',
      'Sustituciones placenteras y sostenibles sin eliminar carbohidratos de forma drástica.',
      'Ajustes progresivos acordes a tus horarios laborales y rutinas de movimiento.',
    ],
    commonSignals: [
      'Cansancio extremo o somnolencia después de comer ("bajones de energía").',
      'Ansiedad intensa por dulces o carbohidratos a media tarde.',
      'Valores de glicemia en ayunas > 100 mg/dL o insulina basal elevada.',
      'Dificultad persistente para regular la presión arterial o niveles de triglicéridos.',
    ],
    ctaText: 'Consultar por Control Metabólico',
  },
  {
    id: 'digestiva',
    tabLabel: 'Salud Digestiva',
    badge: 'Microbiota & Confort Intestinal',
    title: 'Salud Digestiva: Estreñimiento, Hinchazón y Microbiota',
    subtitle: 'Recupera la ligereza y el bienestar gastrointestinal',
    description:
      'Tu intestino es el segundo cerebro y la base de tu inmunidad. Diseñamos pautas para desinflamar el tracto digestivo, regular el tránsito intestinal y nutrir tu microbiota de forma natural.',
    howWeApproach: [
      'Identificación de alimentos desencadenantes de distensión, gases o pesadez.',
      'Incorporación estratégica de fibras prebióticas solubles e hidratación celular.',
      'Técnicas de masticación consciente y ritmos de digestión sin estrés.',
      'Recuperación de la flora bacteriana protectora mediante fermentos y alimentos vivos.',
    ],
    commonSignals: [
      'Sensación recurrente de pesadez o inflamación abdominal al final del día.',
      'Evacuaciones irregulares, esfuerzo excesivo o menos de 3 veces por semana.',
      'Episodios de reflujo gástrico, acidez frecuente o digestiones muy lentas.',
      'Gases molestos y sensación de incomodidad con alimentos habituales.',
    ],
    ctaText: 'Consultar por Salud Digestiva',
  },
  {
    id: 'inflamacion',
    tabLabel: 'Inflamación y Bienestar',
    badge: 'Nutrición Antiinflamatoria',
    title: 'Inflamación Sistémica: Artritis, Articulaciones y Hábitos',
    subtitle: 'Alivio articular y regeneración celular a través de fitonutrientes',
    description:
      'La inflamación celular silenciosa desgasta articulaciones y tejidos. A través de alimentos ricos en antioxidantes, grasas esenciales omega-3 y especias terapéuticas, reducimos la sobrecarga inflamatoria.',
    howWeApproach: [
      'Protocolo antiinflamatorio rico en polifenoles, cúrcuma, jengibre y semillas.',
      'Optimización de la relación entre ácidos grasos Omega-3 y Omega-6.',
      'Reducción guiada de ultraprocesados proinflamatorios, azúcares añadidos y aceites refinados.',
      'Sinergia con hábitos de descanso reparador y manejo del estrés oxidativo.',
    ],
    commonSignals: [
      'Rigidez o dolor en manos, rodillas u otras articulaciones por las mañanas.',
      'Fatiga crónica sin causa aparente que no mejora tras el descanso.',
      'Retención de líquidos persistente y pesadez en extremidades.',
      'Diagnóstico previo de artritis, artrosis o enfermedades autoinmunes.',
    ],
    ctaText: 'Consultar por Nutrición Antiinflamatoria',
  },
  {
    id: 'recomposicion',
    tabLabel: 'Relación con la Comida',
    badge: 'Hábitos Sostenibles & Cero Dietas',
    title: 'Recomposición Corporal y Paz con la Alimentación',
    subtitle: 'Transforma tu cuerpo sanando tu vínculo con los alimentos',
    description:
      'Olvídate del ciclo destructivo de "dieta estricta el lunes, atracón el fin de semana". Construimos hábitos que te permiten ganar masa muscular, perder grasa y disfrutar de reuniones sociales sin remordimiento.',
    howWeApproach: [
      'Desmitificación de alimentos "buenos" vs "malos" y eliminación de la culpa.',
      'Pautas de aporte proteico adecuado para proteger tu masa muscular magra.',
      'Estrategias de alimentación intuitiva y reconocimiento de saciedad real.',
      'Diseño de recetas deliciosas adaptadas a tu presupuesto y tiempo real de cocina.',
    ],
    commonSignals: [
      'Sensación de culpa constante tras consumir ciertos alimentos que te gustan.',
      'Historial de dietas extremas que terminan en efecto rebote.',
      'Preocupación constante y desgaste mental por "qué comer o qué no comer".',
      'Deseo de mejorar tu tono muscular y vitalidad sin obsesión por la balanza.',
    ],
    ctaText: 'Consultar por Recomposición y Hábitos',
  },
];

export interface FocusAreasSectionProps {
  className?: string;
}

export const FocusAreasSection: React.FC<FocusAreasSectionProps> = ({
  className = '',
}) => {
  const [activeTabId, setActiveTabId] = useState<string>('metabolico');

  const activeArea = FOCUS_AREAS.find((area) => area.id === activeTabId) || FOCUS_AREAS[0];

  return (
    <section
      id="areas-enfoque"
      aria-labelledby="focus-heading"
      className={`relative bg-nutri-ivory py-20 lg:py-28 border-b border-nutri-forest/10 overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <span className="text-nutri-gold uppercase tracking-widest text-xs font-semibold block">
            ÁREAS DE ENFOQUE &bull; ACOMPAÑAMIENTO INTEGRAL
          </span>
          <h2
            id="focus-heading"
            className="font-title text-3xl sm:text-4xl lg:text-5xl text-nutri-forest font-normal tracking-tight"
          >
            Soluciones adaptadas a las necesidades reales de tu cuerpo
          </h2>
          <div className="w-16 h-0.5 bg-nutri-gold mx-auto rounded-full" aria-hidden="true" />
          <p className="font-body text-base sm:text-lg text-nutri-dark/80 font-light leading-relaxed">
            Haz clic en cada área para conocer nuestro enfoque de trabajo, las señales de alerta más habituales y cómo podemos acompañarte.
          </p>
        </div>

        {/* Selector de Pestañas Animado con framer-motion (layoutId="activeTab") */}
        <div
          role="tablist"
          aria-label="Áreas de especialidad nutricional"
          className="flex items-center justify-start sm:justify-center gap-2 p-1.5 bg-white/70 backdrop-blur-sm rounded-full border border-nutri-forest/15 max-w-4xl mx-auto mb-10 overflow-x-auto scrollbar-none"
        >
          {FOCUS_AREAS.map((area) => {
            const isActive = activeTabId === area.id;
            return (
              <button
                key={area.id}
                role="tab"
                id={`tab-${area.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${area.id}`}
                type="button"
                onClick={() => setActiveTabId(area.id)}
                className={`relative px-4 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold ${
                  isActive ? 'text-nutri-ivory font-semibold' : 'text-nutri-forest/80 hover:text-nutri-forest'
                }`}
              >
                {/* Indicador animado con layoutId de framer-motion */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-nutri-forest rounded-full shadow-md"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    style={{ zIndex: 0 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {area.id === 'metabolico' && <HeartPulse className="w-4 h-4 text-nutri-gold" aria-hidden="true" />}
                  {area.id === 'digestiva' && <Sparkles className="w-4 h-4 text-nutri-gold" aria-hidden="true" />}
                  {area.id === 'inflamacion' && <Flame className="w-4 h-4 text-nutri-gold" aria-hidden="true" />}
                  {area.id === 'recomposicion' && <Activity className="w-4 h-4 text-nutri-gold" aria-hidden="true" />}
                  <span>{area.tabLabel}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Contenido Dinámico de la Pestaña Activa con AnimatePresence */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeArea.id}
              id={`panel-${activeArea.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeArea.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-nutri-forest/15 shadow-xl"
            >
              {/* Cabecera del Panel */}
              <div className="mb-8">
                {activeArea.badge && (
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-nutri-sage/15 text-nutri-forest border border-nutri-sage/30 text-xs font-semibold mb-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-nutri-gold" aria-hidden="true" />
                    <span>{activeArea.badge}</span>
                  </div>
                )}
                <h3 className="font-title text-2xl sm:text-3xl lg:text-4xl text-nutri-forest font-normal leading-snug">
                  {activeArea.title}
                </h3>
                <p className="font-body text-nutri-sage font-medium text-sm sm:text-base mt-1">
                  {activeArea.subtitle}
                </p>
                <p className="font-body text-nutri-dark/85 text-sm sm:text-base leading-relaxed mt-4 max-w-3xl">
                  {activeArea.description}
                </p>
              </div>

              {/* Grilla de 2 Columnas: ¿Cómo lo abordamos? vs Señales Comunes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-6 border-t border-nutri-forest/10">
                
                {/* Columna 1: ¿Cómo lo abordamos? */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-title text-lg sm:text-xl text-nutri-forest font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-nutri-forest" aria-hidden="true" />
                    <span>¿Cómo lo abordamos?</span>
                  </h4>
                  <ul className="space-y-3" role="list">
                    {activeArea.howWeApproach.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-nutri-gold mt-2 flex-shrink-0" />
                        <span className="font-body text-xs sm:text-sm text-nutri-dark/90 leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Columna 2: Señales Comunes */}
                <div className="space-y-4 bg-nutri-forest/5 p-6 rounded-2xl border border-nutri-forest/10">
                  <h4 className="flex items-center gap-2 font-title text-lg sm:text-xl text-nutri-forest font-semibold">
                    <AlertCircle className="w-5 h-5 text-nutri-gold" aria-hidden="true" />
                    <span>Señales comunes en el cuerpo</span>
                  </h4>
                  <ul className="space-y-3" role="list">
                    {activeArea.commonSignals.map((signal, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-nutri-sage mt-2 flex-shrink-0" />
                        <span className="font-body text-xs sm:text-sm text-nutri-dark/85 leading-relaxed">
                          {signal}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Botón directo de acción hacia el formulario */}
              <div className="mt-10 pt-6 border-t border-nutri-forest/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-nutri-dark/70 font-body">
                  Evaluaremos tu caso particular con total confidencialidad y rigor profesional.
                </p>
                <a
                  href="#contacto"
                  aria-label={`${activeArea.ctaText} (ir a formulario de contacto)`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-nutri-sage text-white px-7 py-3.5 rounded-full text-sm sm:text-base font-medium shadow-sm transition-all duration-200 hover:bg-nutri-forest hover:shadow-md hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold"
                >
                  <span>{activeArea.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-nutri-gold" aria-hidden="true" />
                </a>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default FocusAreasSection;
