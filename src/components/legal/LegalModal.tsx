import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { X, ShieldCheck, FileText, Scale, Lock } from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms' | 'rights';

interface LegalModalContextType {
  openLegalModal: (type: LegalDocType) => void;
  closeLegalModal: () => void;
}

const LegalModalContext = createContext<LegalModalContextType | undefined>(undefined);

export const useLegalModal = () => {
  const context = useContext(LegalModalContext);
  if (!context) {
    throw new Error('useLegalModal must be used within a LegalModalProvider');
  }
  return context;
};

export const LegalModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeDoc, setActiveDoc] = useState<LegalDocType | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openLegalModal = (type: LegalDocType) => {
    setActiveDoc(type);
  };

  const closeLegalModal = () => {
    setActiveDoc(null);
  };

  // Accesibilidad: Cerrar con Escape y bloquear scroll del body
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeDoc) {
        closeLegalModal();
      }
    };

    if (activeDoc) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDoc]);

  return (
    <LegalModalContext.Provider value={{ openLegalModal, closeLegalModal }}>
      {children}
      {activeDoc && (
        <LegalModalContent
          type={activeDoc}
          onClose={closeLegalModal}
          modalRef={modalRef}
          closeButtonRef={closeButtonRef}
        />
      )}
    </LegalModalContext.Provider>
  );
};

interface LegalModalContentProps {
  type: LegalDocType;
  onClose: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
  closeButtonRef: React.RefObject<HTMLButtonElement>;
}

const LegalModalContent: React.FC<LegalModalContentProps> = ({
  type,
  onClose,
  modalRef,
  closeButtonRef,
}) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-nutri-dark/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="bg-nutri-ivory text-nutri-dark w-full max-w-3xl max-h-[85vh] rounded-3xl shadow-2xl border border-nutri-forest/20 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between px-6 py-5 bg-nutri-forest text-nutri-ivory border-b border-nutri-forest/30">
          <div className="flex items-center gap-3">
            {type === 'privacy' && <Lock className="w-5 h-5 text-nutri-gold" aria-hidden="true" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-nutri-gold" aria-hidden="true" />}
            {type === 'rights' && <Scale className="w-5 h-5 text-nutri-gold" aria-hidden="true" />}
            <h2 id="legal-modal-title" className="font-title text-xl sm:text-2xl font-normal tracking-wide">
              {type === 'privacy' && 'Política de Privacidad y Protección de Datos'}
              {type === 'terms' && 'Términos y Condiciones del Servicio'}
              {type === 'rights' && 'Ley N° 20.584: Derechos y Deberes en Salud'}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal de información legal"
            className="p-1.5 rounded-full text-nutri-ivory/80 hover:text-nutri-ivory hover:bg-nutri-ivory/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Cuerpo del Modal con Scroll */}
        <div className="px-6 sm:px-8 py-6 overflow-y-auto space-y-6 text-sm font-body text-nutri-dark/85 leading-relaxed">
          {type === 'privacy' && <PrivacyContent />}
          {type === 'terms' && <TermsContent />}
          {type === 'rights' && <RightsContent />}
        </div>

        {/* Pie del Modal */}
        <div className="px-6 py-4 bg-nutri-forest/5 border-t border-nutri-forest/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-nutri-dark/70">
          <span>Actualizado al año legal 2026 &bull; Jeanette Ajata Cutipa</span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto bg-nutri-sage text-white px-5 py-2 rounded-full font-medium hover:bg-nutri-forest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold"
          >
            Entendido y Acepto
          </button>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 1. CONTENIDO: POLÍTICA DE PRIVACIDAD (Ley N° 21.719 y Ley N° 21.663)      */
/* ========================================================================= */
const PrivacyContent: React.FC = () => (
  <>
    <div className="p-4 rounded-2xl bg-nutri-sage/10 border border-nutri-sage/30 flex items-start gap-3">
      <ShieldCheck className="w-5 h-5 text-nutri-forest flex-shrink-0 mt-0.5" aria-hidden="true" />
      <p className="text-xs text-nutri-forest leading-relaxed">
        <strong>Cumplimiento Normativo:</strong> Esta política rige bajo el estándar de la <strong>Ley N° 21.719</strong> sobre Protección de Datos Personales en Chile y la <strong>Ley N° 21.663</strong> (Ley Marco de Ciberseguridad), garantizando los derechos de los titulares y el resguardo de la confidencialidad.
      </p>
    </div>

    <section className="space-y-2">
      <h3 className="font-title text-base font-semibold text-nutri-forest">
        1. Responsable del Tratamiento
      </h3>
      <p>
        El tratamiento de los datos personales recabados a través de este sitio web es responsabilidad de <strong>Jeanette Ajata Cutipa</strong>, Licenciada en Nutrición titulada en Bolivia y domiciliada en Calama, Región de Antofagasta, Chile.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="font-title text-base font-semibold text-nutri-forest">
        2. Principio de Minimización: Prohibición de Datos Sensibles en Formularios Web
      </h3>
      <p>
        En estricto apego al principio de minimización de la Ley N° 21.719, este sitio web <strong>no solicita, almacena ni procesa antecedentes médicos, patológicos ni datos sensibles de salud</strong> a través de formularios abiertos. El formulario inicial únicamente recopila datos de contacto básicos (nombre, canal de contacto y ubicación) con la finalidad exclusiva de coordinar el primer contacto.
      </p>
      <p className="text-xs text-nutri-dark/70 bg-nutri-ivory border-l-2 border-nutri-gold pl-3 py-1">
        Cualquier antecedente clínico de pacientes bolivianos en telemedicina es tratado exclusivamente durante la consulta médica privada y confidencial, con consentimiento explícito y bajo secreto profesional.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="font-title text-base font-semibold text-nutri-forest">
        3. Finalidad del Tratamiento
      </h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Coordinar y responder solicitudes de atención o asesoría.</li>
        <li>Verificar la jurisdicción territorial del usuario (Bolivia o Chile) para aplicar el marco de atención legalmente pertinente.</li>
        <li>Gestión administrativa y agendamiento de sesiones.</li>
      </ul>
    </section>

    <section className="space-y-2">
      <h3 className="font-title text-base font-semibold text-nutri-forest">
        4. Derechos del Titular (Derechos ARCO)
      </h3>
      <p>
        Usted podrá ejercer en cualquier momento sus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición</strong> sobre sus datos de contacto, contactando directamente a través de nuestro canal de mensajería oficial.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="font-title text-base font-semibold text-nutri-forest">
        5. Medidas de Ciberseguridad (Ley N° 21.663)
      </h3>
      <p>
        La plataforma implementa protocolos criptográficos de navegación segura (HTTPS/TLS) y no comercializa ni comparte bases de datos con terceros bajo ninguna circunstancia.
      </p>
    </section>
  </>
);

/* ========================================================================= */
/* 2. CONTENIDO: TÉRMINOS Y CONDICIONES DEL SERVICIO DIGITAL                 */
/* ========================================================================= */
const TermsContent: React.FC = () => (
  <>
    <div className="p-4 rounded-2xl bg-nutri-gold/15 border border-nutri-gold/40 flex items-start gap-3">
      <Scale className="w-5 h-5 text-nutri-forest flex-shrink-0 mt-0.5" aria-hidden="true" />
      <p className="text-xs text-nutri-forest leading-relaxed">
        <strong>Diferenciación Jurisdiccional Obligatoria:</strong> Al contratar o solicitar servicios, el usuario declara comprender las modalidades disponibles según su territorio de residencia.
      </p>
    </div>

    <section className="space-y-2">
      <h3 className="font-title text-base font-semibold text-nutri-forest">
        1. Modalidad Bolivia: Telemedicina Nutricional Clínica
      </h3>
      <p>
        Dirigida <strong>exclusivamente a personas residentes en el Estado Plurinacional de Bolivia</strong>. Estos servicios son prestados por Jeanette Ajata Cutipa amparada en su título universitario y habilitación profesional legal de origen, permitiendo la evaluación clínica, análisis de exámenes de laboratorio y emisión de pautas dietoterapéuticas.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="font-title text-base font-semibold text-nutri-forest">
        2. Modalidad Chile: Programas Educativos y Promoción de Hábitos
      </h3>
      <p>
        En la República de Chile, y mientras se encuentra en trámite el procedimiento de convalidación académica universitaria ante las autoridades competentes, los servicios ofrecidos en la ciudad de Calama y territorio nacional tienen carácter <strong>estrictamente educativo, orientador y de promoción de estilos de vida saludables</strong>. No constituyen diagnóstico médico, farmacológico ni dietoterapia clínica reservada por el Código Sanitario chileno (DFL N° 725).
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="font-title text-base font-semibold text-nutri-forest">
        3. Política de Puntualidad y Cancelaciones
      </h3>
      <p>
        Las sesiones se coordinan de forma personalizada. Para reprogramar o cancelar una sesión sin costo, se solicita un aviso mínimo de 24 horas previas vía WhatsApp.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="font-title text-base font-semibold text-nutri-forest">
        4. Exclusión de Urgencias Médicas
      </h3>
      <p>
        Este servicio no atiende urgencias ni emergencias clínicas vitales. Si usted experimenta una crisis de salud aguda, debe acudir de inmediato al centro de urgencias o servicio de emergencias hospitalario más cercano.
      </p>
    </section>
  </>
);

/* ========================================================================= */
/* 3. CONTENIDO: LEY N° 20.584 (DERECHOS Y DEBERES EN SALUD)                 */
/* ========================================================================= */
const RightsContent: React.FC = () => (
  <>
    <div className="p-4 rounded-2xl bg-nutri-forest/10 border border-nutri-forest/20 flex items-start gap-3">
      <FileText className="w-5 h-5 text-nutri-forest flex-shrink-0 mt-0.5" aria-hidden="true" />
      <p className="text-xs text-nutri-forest leading-relaxed">
        <strong>Ley N° 20.584 de Chile:</strong> Regula los derechos y deberes que tienen las personas en relación con acciones vinculadas a su atención en salud, garantizando un trato digno, informado y seguro.
      </p>
    </div>

    <section className="space-y-2">
      <h3 className="font-title text-base font-semibold text-nutri-forest">
        1. Derecho a Información Oportuna y Veraz
      </h3>
      <p>
        Todo usuario tiene derecho a conocer la identidad del profesional, su título de origen (Licenciada en Nutrición, Bolivia) y el alcance exacto de la asesoría o consulta antes de tomar cualquier decisión.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="font-title text-base font-semibold text-nutri-forest">
        2. Consentimiento Informado
      </h3>
      <p>
        Cualquier recomendación alimentaria o modificación de hábitos requiere de su libre aceptación informada, respetando siempre sus valores, creencias culturales y autonomía personal.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="font-title text-base font-semibold text-nutri-forest">
        3. Confidencialidad y Reserva
      </h3>
      <p>
        Toda conversación, registro o comunicación mantenida durante la asesoría está amparada bajo estricto secreto profesional, sin que los datos puedan ser divulgados a terceros sin previa autorización escrita.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="font-title text-base font-semibold text-nutri-forest">
        4. Deberes del Usuario
      </h3>
      <p>
        Proporcionar información veraz sobre sus antecedentes, mantener un trato respetuoso hacia el profesional y seguir las indicaciones acordadas de manera mutua y consciente.
      </p>
    </section>
  </>
);

export default LegalModalProvider;
