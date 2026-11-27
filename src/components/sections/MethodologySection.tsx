import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ClipboardCheck,
  FileCheck2,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export interface StepItem {
  number: string;
  badge: string;
  title: string;
  shortLabel: string;
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
    badge: 'Paso 01 • Punto de Partida',
    title: 'Evaluación Integral',
    shortLabel: 'Evaluación Integral',
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
    badge: 'Paso 02 • Diseño Estratégico',
    title: 'Tu Plan a Medida',
    shortLabel: 'Plan a Medida',
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
    badge: 'Paso 03 • Consolidación',
    title: 'Seguimiento y Ajustes Continuos',
    shortLabel: 'Seguimiento Continuo',
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
  const sectionRef = useRef<HTMLElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Experiencia de Scrollytelling con pinning exclusivamente en Desktop (>= 1024px)
      mm.add('(min-width: 1024px)', () => {
        const cards = cardsRef.current.filter((el): el is HTMLElement => el !== null);
        if (cards.length !== METHODOLOGY_STEPS.length || !sectionRef.current) return;

        // Estado inicial de las tarjetas en Desktop
        gsap.set(cards[0], { opacity: 1, scale: 1, y: 0, zIndex: 30 });
        gsap.set(cards[1], { opacity: 0, scale: 0.94, y: 64, zIndex: 20 });
        gsap.set(cards[2], { opacity: 0, scale: 0.94, y: 64, zIndex: 10 });

        if (progressFillRef.current) {
          gsap.set(progressFillRef.current, { scaleY: 0, transformOrigin: 'top center' });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=1800',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const nextStep = p < 0.34 ? 0 : p < 0.68 ? 1 : 2;
              setActiveStep((prev) => (prev !== nextStep ? nextStep : prev));
            },
          },
        });

        // Progreso continuo de la barra vertical dorada (0 -> 1 en todo el recorrido)
        if (progressFillRef.current) {
          tl.to(
            progressFillRef.current,
            {
              scaleY: 1,
              ease: 'none',
              duration: 2,
            },
            0
          );
        }

        // Transición Paso 01 -> Paso 02
        tl.to(
          cards[0],
          {
            opacity: 0,
            scale: 0.93,
            y: -48,
            duration: 0.85,
            ease: 'power2.inOut',
          },
          0.15
        )
          .fromTo(
            cards[1],
            { opacity: 0, scale: 0.94, y: 64, zIndex: 35 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.85,
              ease: 'power2.out',
            },
            0.25
          );

        // Transición Paso 02 -> Paso 03
        tl.to(
          cards[1],
          {
            opacity: 0,
            scale: 0.93,
            y: -48,
            duration: 0.85,
            ease: 'power2.inOut',
          },
          1.1
        )
          .fromTo(
            cards[2],
            { opacity: 0, scale: 0.94, y: 64, zIndex: 40 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.85,
              ease: 'power2.out',
            },
            1.2
          );

        return () => {
          setActiveStep(0);
        };
      });

      return () => {
        mm.revert();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const activeStepNumber = METHODOLOGY_STEPS[activeStep]?.number ?? '01';

  return (
    <section
      ref={sectionRef}
      id="metodologia"
      aria-labelledby="methodology-heading"
      className={`relative bg-nutri-ivory py-20 lg:py-0 lg:min-h-screen lg:flex lg:items-center border-t border-nutri-forest/10 overflow-hidden ${className}`}
    >
      {/* Sutiles halos decorativos */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-nutri-gold/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 bg-nutri-sage/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-20 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* ================================================================ */}
          {/* COLUMNA IZQUIERDA: Fija en Desktop con Indicador + Barra Dorada */}
          {/* ================================================================ */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
            <div className="space-y-4">
              <span className="text-nutri-gold uppercase tracking-widest text-xs font-semibold block">
                TU PROCESO PASO A PASO
              </span>
              <h2
                id="methodology-heading"
                className="font-title text-3xl sm:text-4xl xl:text-[2.75rem] text-nutri-forest font-normal tracking-tight leading-[1.16]"
              >
                Sin juicios ni pautas imposibles: así es tu acompañamiento
              </h2>
              <div className="w-16 h-0.5 bg-nutri-gold rounded-full" aria-hidden="true" />
              <p className="font-body text-base text-nutri-dark/80 font-light leading-relaxed max-w-lg">
                Olvídate de la rigidez de las dietas del pasado. Diseñamos un camino estructurado y transparente para que sepas con exactitud qué esperar desde nuestro primer contacto.
              </p>
            </div>

            {/* Panel Editorial de Progreso (visible en Desktop Scrollytelling) */}
            <div className="hidden lg:flex items-stretch gap-6 pt-2 w-full">
              {/* Barra de progreso vertical dorada */}
              <div
                className="relative w-1 bg-nutri-forest/15 rounded-full overflow-hidden shrink-0"
                aria-hidden="true"
              >
                <div
                  ref={progressFillRef}
                  className="absolute inset-0 bg-nutri-gold rounded-full origin-top will-change-transform"
                />
              </div>

              <div className="flex flex-col justify-between space-y-5 flex-1">
                {/* Indicador numérico elegante (01 / 03, 02 / 03, 03 / 03) */}
                <div className="flex items-baseline gap-2.5" aria-live="polite">
                  <span className="font-title text-5xl xl:text-6xl text-nutri-forest font-normal leading-none tabular-nums">
                    {activeStepNumber}
                  </span>
                  <span className="font-title text-xl text-nutri-gold/80 font-normal">
                    / 03
                  </span>
                </div>

                {/* Lista de etapas con estado activo */}
                <ol className="space-y-2.5">
                  {METHODOLOGY_STEPS.map((step, idx) => {
                    const isCurrent = idx === activeStep;
                    const isCompleted = idx < activeStep;
                    return (
                      <li
                        key={step.number}
                        className={`flex items-center gap-3 text-sm transition-colors duration-300 ${
                          isCurrent
                            ? 'text-nutri-forest font-semibold'
                            : isCompleted
                              ? 'text-nutri-forest/70 font-normal'
                              : 'text-nutri-dark/45 font-light'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isCurrent
                              ? 'bg-nutri-gold scale-125'
                              : isCompleted
                                ? 'bg-nutri-sage'
                                : 'bg-nutri-forest/20'
                          }`}
                          aria-hidden="true"
                        />
                        <span>
                          Paso {step.number} — {step.shortLabel}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            {/* CTA Desktop integrado en columna izquierda */}
            <div className="hidden lg:block pt-3 space-y-2.5">
              <MagneticButton strength={0.25}>
                <a
                  href="#contacto"
                  aria-label="Comenzar con el Paso 1 y coordinar tu consulta"
                  className="inline-flex items-center justify-center gap-2.5 bg-nutri-sage text-white px-7 py-3.5 rounded-full text-sm font-medium shadow-sm transition-all duration-200 hover:bg-nutri-forest hover:shadow-md hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold focus-visible:ring-offset-2 focus-visible:ring-offset-nutri-ivory"
                >
                  <Sparkles className="w-4 h-4 text-nutri-gold" aria-hidden="true" />
                  <span>Comenzar con el Paso 1</span>
                  <ArrowRight className="w-4 h-4 text-white" aria-hidden="true" />
                </a>
              </MagneticButton>
              <p className="text-xs text-nutri-dark/65 font-body max-w-sm">
                La coordinación inicial no tiene costo. Te orientamos antes de agendar.
              </p>
            </div>
          </div>

          {/* ================================================================ */}
          {/* COLUMNA DERECHA: Tarjetas Dinámicas (Stacked en Desktop, Fluido en Móvil) */}
          {/* ================================================================ */}
          <div className="lg:col-span-7 w-full">
            <div className="flex flex-col gap-6 lg:block lg:relative lg:h-[500px] xl:h-[515px]">
              {METHODOLOGY_STEPS.map((step, idx) => {
                const Icon = step.icon;
                const isInteractive = idx === activeStep;
                return (
                  <article
                    key={step.number}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    className={`flex flex-col justify-between bg-white/85 backdrop-blur-md rounded-3xl p-7 sm:p-9 lg:p-10 border border-nutri-forest/15 shadow-sm lg:shadow-xl lg:border-nutri-gold/40 will-change-transform lg:absolute lg:inset-0 transition-shadow duration-300 ${
                      isInteractive ? 'lg:pointer-events-auto' : 'lg:pointer-events-none'
                    }`}
                  >
                    <div>
                      {/* Fila superior: Número estilizado, Badge y Icono */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <span className="font-title text-3xl sm:text-4xl font-bold text-nutri-gold/80">
                            {step.number}
                          </span>
                          <span className="text-xs uppercase tracking-wider font-semibold text-nutri-forest/70">
                            {step.badge}
                          </span>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-nutri-ivory flex items-center justify-center border border-nutri-forest/10 text-nutri-forest shadow-xs">
                          <Icon className="w-6 h-6 text-nutri-sage" aria-hidden="true" />
                        </div>
                      </div>

                      {/* Badge de Tiempo */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nutri-sage/10 text-nutri-forest text-xs font-medium mb-3">
                        <Clock className="w-3.5 h-3.5 text-nutri-gold" aria-hidden="true" />
                        <span>{step.timeframe}</span>
                      </div>

                      {/* Título del Paso */}
                      <h3 className="font-title text-2xl sm:text-3xl text-nutri-forest font-normal leading-snug mb-3">
                        {step.title}
                      </h3>

                      {/* Descripción */}
                      <p className="font-body text-sm sm:text-base text-nutri-dark/85 leading-relaxed font-light mb-6">
                        {step.description}
                      </p>

                      {/* Highlights en bullet points */}
                      <ul className="space-y-2.5 pt-4 border-t border-nutri-forest/10" role="list">
                        {step.highlights.map((item, hIdx) => (
                          <li
                            key={hIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-nutri-dark/85"
                          >
                            <CheckCircle2
                              className="w-4 h-4 text-nutri-gold shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer de la tarjeta */}
                    <div className="pt-5 mt-6 border-t border-nutri-forest/10 flex items-center justify-between text-xs text-nutri-forest/70 font-medium">
                      <span>Etapa {idx + 1} de 3</span>
                      <span className="text-nutri-gold inline-flex items-center gap-1">
                        {idx < 2 ? 'Desliza para continuar' : 'Listo para comenzar'}{' '}
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cierre de Sección en Móvil (< 1024px) */}
        <div className="mt-12 lg:hidden text-center space-y-4">
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
