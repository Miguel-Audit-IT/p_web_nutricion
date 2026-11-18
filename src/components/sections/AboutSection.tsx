import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  HeartHandshake,
  CheckCircle2,
  GraduationCap,
} from 'lucide-react';
import { FloatingBadge } from '../ui/MotionPrimitives';

export interface PhilosophyPillar {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface AboutSectionProps {
  profileImageUrl?: string;
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  profileImageUrl = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  className = '',
}) => {
  const pillars: PhilosophyPillar[] = [
    {
      id: 'ciencia',
      title: 'Ciencia Actualizada',
      description: 'Enfoque basado en la evidencia nutricional más reciente.',
      icon: <BookOpen className="w-5 h-5 text-nutri-gold" aria-hidden="true" />,
    },
    {
      id: 'cero-culpa',
      title: 'Cero Culpa',
      description: 'Alimentos reales adaptados a tu cultura y presupuesto.',
      icon: <HeartHandshake className="w-5 h-5 text-nutri-gold" aria-hidden="true" />,
    },
    {
      id: 'cercania',
      title: 'Cercanía Real',
      description: 'Acompañamiento humano paso a paso, sin pautas genéricas.',
      icon: <Award className="w-5 h-5 text-nutri-gold" aria-hidden="true" />,
    },
  ];

  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-heading"
      className={`bg-nutri-olive text-nutri-ivory py-20 md:py-28 relative overflow-hidden border-b border-nutri-forest/30 ${className}`}
    >
      {/* Elemento decorativo sutil de fondo */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-nutri-forest/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* COLUMNA IZQUIERDA (5 columnas): Composición visual y credenciales */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Marco fotográfico editorial */}
              <div className="relative overflow-hidden rounded-3xl border border-nutri-gold/40 shadow-2xl aspect-[4/5] bg-nutri-forest">
                <img
                  src={profileImageUrl}
                  alt="Jeanette Ajata Cutipa - Licenciada en Nutrición"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  width="500"
                  height="625"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-nutri-olive via-transparent to-transparent opacity-80 pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Tarjeta flotante animada con FloatingBadge */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 max-w-xs">
                <FloatingBadge amplitude={4} duration={4.5}>
                  <div className="bg-nutri-forest border border-nutri-gold/40 p-5 rounded-2xl shadow-xl">
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-nutri-olive/80 text-nutri-gold border border-nutri-gold/20">
                        <GraduationCap className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-title text-base font-semibold text-nutri-ivory">
                          Formación Universitaria
                        </p>
                        <p className="text-xs text-nutri-ivory/80 mt-1 leading-relaxed">
                          Licenciada en Nutrición (Bolivia) • En trámite de revalidación en Chile.
                        </p>
                      </div>
                    </div>
                  </div>
                </FloatingBadge>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA (7 columnas): Historia y 3 Pilares */}
          <div className="lg:col-span-7 space-y-6 pt-4 lg:pt-0">
            <span className="inline-block text-nutri-gold uppercase tracking-widest text-xs font-semibold">
              SOBRE MÍ
            </span>

            <h2
              id="about-heading"
              className="font-title text-3xl sm:text-4xl md:text-5xl text-nutri-ivory font-normal leading-tight"
            >
              Hola, soy Jeanette Ajata Cutipa
            </h2>

            <div className="space-y-4 font-body text-base sm:text-lg text-nutri-ivory/90 font-light leading-relaxed">
              <p>
                Soy <strong className="font-medium text-white">Licenciada en Nutrición titulada en Bolivia</strong> y actualmente resido en la ciudad de Calama, Chile, donde me encuentro realizando el proceso formal de convalidación de mi título profesional.
              </p>
              <p>
                Mi vocación nace de una convicción clara: la alimentación no debe ser una fuente de ansiedad, culpa ni castigo. Mi enfoque combina la <strong className="font-medium text-nutri-gold">evidencia científica más actualizada</strong> con una mirada profundamente humana y empática.
              </p>
              <p>
                Ya sea acompañando a pacientes en Bolivia mediante telemedicina clínica o guiando a personas en Chile a través de la educación alimentaria, mi objetivo es enseñarte a comer comida real, respetando tus gustos, tu cultura y tu presupuesto para construir salud a largo plazo.
              </p>
            </div>

            {/* Puntos clave de compromiso */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm text-nutri-ivory/85">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-nutri-gold" aria-hidden="true" />
                Ética y transparencia profesional
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-nutri-gold" aria-hidden="true" />
                Atención 100% individualizada
              </span>
            </div>

            {/* 3 Pilares de su Filosofía con whileHover={{ y: -6 }} */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="bg-nutri-forest/60 border border-nutri-gold/30 rounded-2xl p-5 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-nutri-olive/90 flex items-center justify-center mb-3.5 border border-nutri-gold/20">
                    {pillar.icon}
                  </div>
                  <h3 className="font-title text-lg font-medium text-nutri-ivory mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-nutri-ivory/80 leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
