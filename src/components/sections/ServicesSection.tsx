import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Stethoscope,
  Apple,
  Globe,
  MapPin,
  ShieldAlert,
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  badge: string;
  badgeStyle: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaStyle: string;
  whatsappMessage: string;
  iconType: 'clinical' | 'educational';
}

export interface ServicesSectionProps {
  whatsappNumber?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  whatsappNumber = '56900000000',
}) => {
  const services: ServiceItem[] = [
    {
      id: 'telemedicina-bolivia',
      badge: '100% Online • Bolivia',
      badgeStyle: 'bg-nutri-forest text-nutri-ivory',
      title: 'Telemedicina Nutricional Clínica',
      subtitle: 'Exclusivo Pacientes en Bolivia',
      description:
        'Atención clínica integral respaldada por título profesional boliviano. Ideal para el manejo nutricional de condiciones de salud (diabetes, hipertensión, estreñimiento, artritis) y mejora de composición corporal.',
      features: [
        'Evaluación clínica nutricional completa por videollamada.',
        'Interpretación de exámenes bioquímicos.',
        'Pauta alimentaria terapéutica personalizada.',
        'Seguimiento y ajustes periódicos.',
      ],
      ctaText: 'Agendar Telemedicina (Bolivia)',
      ctaStyle:
        'bg-nutri-sage text-white hover:bg-nutri-forest shadow-sm hover:shadow-md',
      whatsappMessage:
        'Hola Jeanette, te escribo desde Bolivia. Me gustaría agendar una Consulta de Telemedicina Nutricional Clínica.',
      iconType: 'clinical',
    },
    {
      id: 'educacion-chile',
      badge: 'Calama Presencial & Online Chile',
      badgeStyle:
        'bg-nutri-gold/20 text-nutri-forest border border-nutri-gold',
      title: 'Asesoría en Educación Alimentaria y Hábitos',
      subtitle: 'Chile • Presencial en Calama y Online',
      description:
        'Programa educativo y práctico para transformar tu relación con la comida, organizar tus comidas diarias y construir hábitos sostenibles sin dietas extremas.',
      features: [
        'Diagnóstico de hábitos y estilo de vida actual.',
        'Planificación práctica de comidas semanales.',
        'Educación sobre porciones, hidratación y lectura de etiquetado.',
        'Acompañamiento continuo vía mensajería.',
      ],
      ctaText: 'Solicitar Asesoría (Chile)',
      ctaStyle:
        'border-2 border-nutri-sage text-nutri-sage bg-transparent hover:bg-nutri-sage hover:text-white',
      whatsappMessage:
        'Hola Jeanette, me interesa solicitar información sobre la Asesoría en Educación Alimentaria y Hábitos en Chile.',
      iconType: 'educational',
    },
  ];

  const getWhatsAppUrl = (message: string): string => {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section
      id="servicios"
      aria-labelledby="services-heading"
      className="bg-nutri-ivory py-20 md:py-28 border-b border-nutri-forest/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de Sección */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16 space-y-4">
          <span className="block text-nutri-gold uppercase tracking-widest text-xs font-semibold">
            MODALIDADES DE ATENCIÓN
          </span>
          <h2
            id="services-heading"
            className="font-title text-3xl sm:text-4xl md:text-5xl text-nutri-forest font-normal leading-tight"
          >
            Elige el acompañamiento ideal para ti
          </h2>
          <p className="font-body text-base sm:text-lg text-nutri-dark/80 font-light leading-relaxed">
            Nuestros servicios están estructurados según tu ubicación geográfica y objetivos personales, garantizando rigor profesional, ética y transparencia en cada etapa.
          </p>
        </div>

        {/* Grid de 2 Tarjetas Principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {services.map((service) => (
            <motion.article
              key={service.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex flex-col justify-between bg-white/65 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-nutri-forest/15 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-nutri-gold/50"
            >
              <div>
                {/* Top Bar: Badge e Ícono */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide ${service.badgeStyle}`}
                  >
                    {service.iconType === 'clinical' ? (
                      <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                    {service.badge}
                  </span>

                  <div className="w-11 h-11 rounded-2xl bg-nutri-ivory flex items-center justify-center border border-nutri-forest/10 text-nutri-forest">
                    {service.iconType === 'clinical' ? (
                      <Stethoscope className="w-5 h-5 text-nutri-sage" aria-hidden="true" />
                    ) : (
                      <Apple className="w-5 h-5 text-nutri-gold" aria-hidden="true" />
                    )}
                  </div>
                </div>

                {/* Título y Subtítulo */}
                <p className="text-xs font-semibold uppercase tracking-wider text-nutri-sage mb-1">
                  {service.subtitle}
                </p>
                <h3 className="font-title text-2xl sm:text-3xl text-nutri-forest font-medium mb-4 leading-snug">
                  {service.title}
                </h3>

                {/* Descripción */}
                <p className="font-body text-sm sm:text-base text-nutri-dark/85 leading-relaxed mb-7">
                  {service.description}
                </p>

                {/* Separador sutil */}
                <div className="h-px w-full bg-nutri-forest/10 mb-6" aria-hidden="true" />

                {/* Lista de Características */}
                <ul className="space-y-3.5 mb-8" aria-label={`Incluye en ${service.title}`}>
                  {service.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm sm:text-base text-nutri-dark font-normal"
                    >
                      <CheckCircle2
                        className="w-5 h-5 text-nutri-gold flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botón CTA */}
              <div className="pt-2">
                <a
                  href={getWhatsAppUrl(service.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${service.ctaText} (abre en WhatsApp)`}
                  className={`w-full inline-flex items-center justify-center px-6 py-4 rounded-full text-sm sm:text-base font-medium transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold focus-visible:ring-offset-2 focus-visible:ring-offset-nutri-ivory ${service.ctaStyle}`}
                >
                  {service.ctaText}
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Nota Legal al pie de las tarjetas */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-nutri-forest/5 border border-nutri-forest/10 text-xs sm:text-sm text-nutri-dark/75 leading-relaxed">
            <ShieldAlert
              className="w-5 h-5 text-nutri-gold flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p>
              <strong className="font-semibold text-nutri-forest">Aviso Normativo:</strong>{' '}
              En territorio chileno, los programas de asesoría tienen un carácter exclusivamente educativo, preventivo y de promoción de hábitos saludables, sin constituir diagnóstico clínico, prescripción dietoterapéutica ni sustitución de tratamiento médico, en estricto cumplimiento de la legislación sanitaria vigente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
