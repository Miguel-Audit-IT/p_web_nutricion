import React, { useState } from 'react';
import {
  Send,
  ShieldCheck,
  Globe,
  MapPin,
  Clock,
  User,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useLegalModal } from '../legal/LegalModal';

export interface ContactSectionProps {
  whatsappNumber?: string;
  className?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  whatsappNumber = '56900000000',
  className = '',
}) => {
  const { openLegalModal } = useLegalModal();

  // Estado del Gatekeeper
  const [jurisdiction, setJurisdiction] = useState<'bolivia' | 'chile'>('bolivia');
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [city, setCity] = useState('');
  const [preferredTime, setPreferredTime] = useState<'manana' | 'tarde'>('manana');
  const [acceptedConsent, setAcceptedConsent] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !contactInfo.trim()) {
      setErrorMessage('Por favor ingresa tu nombre y un medio de contacto (WhatsApp o Email).');
      return;
    }

    if (!acceptedConsent) {
      setErrorMessage('Debes aceptar la política de privacidad y términos para continuar.');
      return;
    }

    setErrorMessage('');

    // Estructurar mensaje seguro sin datos clínicos (Ley N° 21.719)
    const serviceName =
      jurisdiction === 'bolivia'
        ? 'Telemedicina Nutricional Clínica (Bolivia)'
        : 'Educación Alimentaria y Hábitos (Calama / Chile)';

    const timeText = preferredTime === 'manana' ? 'Mañana (09:00 - 13:00)' : 'Tarde (15:00 - 19:00)';

    const message = `Hola Jeanette, deseo coordinar una reserva/asesoría.
*Nombre:* ${fullName.trim()}
*Ubicación:* ${city.trim() || (jurisdiction === 'bolivia' ? 'Bolivia' : 'Chile')}
*Modalidad:* ${serviceName}
*Preferencia horaria:* ${timeText}
*Contacto:* ${contactInfo.trim()}
(Formulario web con consentimiento Ley 21.719 y Ley 20.584 aceptado).`;

    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Abrir WhatsApp con el lead seguro estructurado
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setHasSubmitted(true);
  };

  return (
    <section
      id="contacto"
      aria-labelledby="contact-heading"
      className={`relative bg-nutri-forest text-nutri-ivory py-20 md:py-28 overflow-hidden ${className}`}
    >
      {/* Resplandor ambiental de fondo */}
      <div
        className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-nutri-gold/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-nutri-sage/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 space-y-4">
          <span className="text-nutri-gold uppercase tracking-widest text-xs font-semibold block">
            CONTACTO &amp; RESERVA INICIAL
          </span>
          <h2
            id="contact-heading"
            className="font-title text-3xl sm:text-4xl md:text-5xl text-nutri-ivory font-normal leading-tight"
          >
            Da el primer paso hacia una salud consciente
          </h2>
          <p className="font-body text-base sm:text-lg text-nutri-ivory/80 font-light leading-relaxed">
            Completa este formulario breve para coordinar tu atención. Nuestro sistema segmenta tu solicitud de forma segura y ética.
          </p>
        </div>

        {/* Tarjeta del Formulario con Gatekeeper Legal */}
        <div className="bg-nutri-ivory text-nutri-dark rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-nutri-gold/30">
          
          {hasSubmitted ? (
            <div className="text-center py-10 space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-nutri-sage/20 text-nutri-forest flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-nutri-forest" aria-hidden="true" />
              </div>
              <h3 className="font-title text-2xl sm:text-3xl text-nutri-forest font-normal">
                ¡Solicitud canalizada con éxito!
              </h3>
              <p className="font-body text-nutri-dark/80 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                Se ha generado tu enlace seguro a WhatsApp para conectar directamente con Jeanette Ajata. Si no se abrió la ventana automáticamente, presiona el botón inferior:
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-nutri-sage text-white px-7 py-3.5 rounded-full font-medium hover:bg-nutri-forest transition-colors shadow-md"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>Abrir conversación en WhatsApp</span>
                </a>
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setHasSubmitted(false)}
                  className="text-xs text-nutri-forest underline hover:text-nutri-gold transition-colors"
                >
                  Enviar otra solicitud
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              
              {/* ======================================================= */}
              {/* PASO 1 DEL GATEKEEPER: Segmentación por Jurisdicción   */}
              {/* ======================================================= */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-nutri-forest mb-3">
                  1. Selecciona tu lugar de residencia y modalidad
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Opción Bolivia */}
                  <button
                    type="button"
                    onClick={() => setJurisdiction('bolivia')}
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold ${
                      jurisdiction === 'bolivia'
                        ? 'border-nutri-forest bg-nutri-forest/10 shadow-sm'
                        : 'border-nutri-forest/20 hover:border-nutri-forest/40 bg-white/50'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        jurisdiction === 'bolivia' ? 'bg-nutri-forest text-nutri-ivory' : 'bg-nutri-forest/10 text-nutri-forest'
                      }`}
                    >
                      <Globe className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block font-title text-base text-nutri-forest font-semibold leading-tight">
                        Residencia en Bolivia
                      </span>
                      <span className="block text-xs text-nutri-dark/75 mt-1 font-body">
                        Telemedicina Nutricional Clínica (100% Online)
                      </span>
                    </div>
                  </button>

                  {/* Opción Chile */}
                  <button
                    type="button"
                    onClick={() => setJurisdiction('chile')}
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold ${
                      jurisdiction === 'chile'
                        ? 'border-nutri-gold bg-nutri-gold/10 shadow-sm'
                        : 'border-nutri-forest/20 hover:border-nutri-forest/40 bg-white/50'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        jurisdiction === 'chile' ? 'bg-nutri-gold text-nutri-dark' : 'bg-nutri-forest/10 text-nutri-forest'
                      }`}
                    >
                      <MapPin className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block font-title text-base text-nutri-forest font-semibold leading-tight">
                        Residencia en Chile
                      </span>
                      <span className="block text-xs text-nutri-dark/75 mt-1 font-body">
                        Educación Alimentaria &amp; Hábitos (Calama / Online)
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* ======================================================= */}
              {/* PASO 2: Campos de Contacto Mínimos (Ley N° 21.719)     */}
              {/* ======================================================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-nutri-forest mb-2">
                    Nombre Completo *
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 text-nutri-forest/50 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Camila Morales"
                      className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-nutri-forest/20 text-nutri-dark text-sm focus:outline-none focus:ring-2 focus:ring-nutri-gold focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* WhatsApp o Correo */}
                <div>
                  <label htmlFor="contactInfo" className="block text-xs font-semibold uppercase tracking-wider text-nutri-forest mb-2">
                    WhatsApp o Correo Electrónico *
                  </label>
                  <div className="relative">
                    <MessageCircle className="w-5 h-5 text-nutri-forest/50 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                    <input
                      id="contactInfo"
                      type="text"
                      required
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="Ej. +56 9 1234 5678 o tu@correo.com"
                      className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-nutri-forest/20 text-nutri-dark text-sm focus:outline-none focus:ring-2 focus:ring-nutri-gold focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Ciudad / País */}
                <div>
                  <label htmlFor="city" className="block text-xs font-semibold uppercase tracking-wider text-nutri-forest mb-2">
                    Ciudad de residencia
                  </label>
                  <div className="relative">
                    <MapPin className="w-5 h-5 text-nutri-forest/50 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={jurisdiction === 'bolivia' ? 'Ej. Cochabamba, La Paz' : 'Ej. Calama, Antofagasta'}
                      className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-nutri-forest/20 text-nutri-dark text-sm focus:outline-none focus:ring-2 focus:ring-nutri-gold focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Horario Preferido */}
                <div>
                  <label htmlFor="preferredTime" className="block text-xs font-semibold uppercase tracking-wider text-nutri-forest mb-2">
                    Preferencia horaria de respuesta
                  </label>
                  <div className="relative">
                    <Clock className="w-5 h-5 text-nutri-forest/50 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                    <select
                      id="preferredTime"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value as 'manana' | 'tarde')}
                      className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-nutri-forest/20 text-nutri-dark text-sm focus:outline-none focus:ring-2 focus:ring-nutri-gold focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      <option value="manana">Mañana (09:00 - 13:00)</option>
                      <option value="tarde">Tarde (15:00 - 19:00)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ======================================================= */}
              {/* GATEKEEPER LEGAL: Advertencia de Datos Sensibles        */}
              {/* ======================================================= */}
              <div className="p-4 rounded-2xl bg-nutri-sage/10 border border-nutri-sage/30 flex items-start gap-3 text-xs text-nutri-forest leading-relaxed">
                <ShieldCheck className="w-5 h-5 text-nutri-sage flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p>
                  <strong className="font-semibold">Protección de Datos Sensibles (Ley N° 21.719):</strong> Por tu seguridad y confidencialidad médica, <strong>no ingreses diagnósticos ni antecedentes de salud en este formulario</strong>. Cualquier antecedente clínico se tratará en un canal privado durante tu sesión médica o educativa.
                </p>
              </div>

              {/* Checkbox de Consentimiento Informado Obligatorio */}
              <div className="space-y-3 pt-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedConsent}
                    onChange={(e) => setAcceptedConsent(e.target.checked)}
                    className="w-4 h-4 mt-1 rounded text-nutri-forest focus:ring-nutri-gold border-nutri-forest/30 cursor-pointer"
                  />
                  <span className="text-xs text-nutri-dark/80 font-body leading-relaxed">
                    He leído y acepto la{' '}
                    <button
                      type="button"
                      onClick={() => openLegalModal('privacy')}
                      className="text-nutri-forest underline hover:text-nutri-gold font-medium"
                    >
                      Política de Privacidad (Ley N° 21.719)
                    </button>
                    , los{' '}
                    <button
                      type="button"
                      onClick={() => openLegalModal('terms')}
                      className="text-nutri-forest underline hover:text-nutri-gold font-medium"
                    >
                      Términos de Servicio
                    </button>{' '}
                    y comprendo la delimitación de atención territorial bajo la{' '}
                    <button
                      type="button"
                      onClick={() => openLegalModal('rights')}
                      className="text-nutri-forest underline hover:text-nutri-gold font-medium"
                    >
                      Ley N° 20.584
                    </button>
                    .
                  </span>
                </label>

                {errorMessage && (
                  <p className="flex items-center gap-1.5 text-xs text-red-700 font-medium animate-in fade-in">
                    <AlertCircle className="w-4 h-4" aria-hidden="true" />
                    <span>{errorMessage}</span>
                  </p>
                )}
              </div>

              {/* Botón de Envío */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-nutri-sage text-white px-8 py-4 rounded-full text-base font-medium shadow-md transition-all duration-200 hover:bg-nutri-forest hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold focus-visible:ring-offset-2"
                >
                  <Send className="w-5 h-5 text-nutri-gold" aria-hidden="true" />
                  <span>Enviar solicitud y conectar por WhatsApp</span>
                </button>
                <p className="text-center text-[11px] text-nutri-dark/60 mt-2 font-light">
                  Sin spam. Tus datos de contacto serán tratados exclusivamente para responder a tu solicitud.
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
