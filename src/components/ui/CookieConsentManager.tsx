import React, { useEffect, useRef, useState } from 'react';
import { Cookie, ShieldCheck, SlidersHorizontal, X, Lock } from 'lucide-react';
import { useLegalModal } from '../legal/LegalModal';

export const COOKIE_CONSENT_STORAGE_KEY = 'ja_cookie_consent_v1';
export const COOKIE_CONSENT_VERSION = '1.1';
const OPEN_COOKIE_SETTINGS_EVENT = 'ja:open-cookie-settings';

export type OptionalCookieCategory = 'analytics' | 'marketing';

export interface CookieConsentRecord {
  version: string;
  timestampUtc: string;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

/**
 * Abre el modal de configuración granular de cookies desde cualquier componente (ej. Footer).
 */
export function openCookieSettings(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT));
}

/**
 * Lee las preferencias guardadas en localStorage de forma segura.
 */
export function getCookieConsent(): CookieConsentRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsentRecord>;
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      parsed.necessary !== true ||
      typeof parsed.analytics !== 'boolean' ||
      typeof parsed.marketing !== 'boolean'
    ) {
      return null;
    }
    return {
      version: typeof parsed.version === 'string' ? parsed.version : COOKIE_CONSENT_VERSION,
      timestampUtc:
        typeof parsed.timestampUtc === 'string'
          ? parsed.timestampUtc
          : new Date().toISOString(),
      necessary: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
    };
  } catch {
    return null;
  }
}

/**
 * Helper de bloqueo previo real (Privacy by Design - Ley N° 21.719).
 * Retorna true únicamente si el usuario otorgó consentimiento expreso para la categoría indicada.
 */
export function hasConsent(category: OptionalCookieCategory): boolean {
  const consent = getCookieConsent();
  if (!consent) return false;
  return Boolean(consent[category]);
}

/**
 * Punto único y documentado de inyección condicional de scripts de terceros.
 * Ningún script de analítica (ej. Google Analytics) o marketing (ej. Meta Pixel)
 * debe cargarse en index.html; únicamente debe inicializarse aquí tras verificar hasConsent().
 */
function syncConsentedThirdPartyScripts(consent: CookieConsentRecord): void {
  if (consent.analytics && hasConsent('analytics')) {
    // [PUNTO DE INYECCIÓN CONDICIONAL — ANALÍTICA]
    // Ejemplo futuro: inicializar Google Analytics / Plausible solo cuando consent.analytics === true.
  }

  if (consent.marketing && hasConsent('marketing')) {
    // [PUNTO DE INYECCIÓN CONDICIONAL — MARKETING]
    // Ejemplo futuro: inicializar Meta Pixel / campañas solo cuando consent.marketing === true.
  }
}

export const CookieConsentManager: React.FC = () => {
  const { openLegalModal } = useLegalModal();
  const [showBanner, setShowBanner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Switches opcionales SIEMPRE desactivados por defecto (Privacy by Default)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  const closeModalBtnRef = useRef<HTMLButtonElement>(null);

  // Evaluar preferencia inicial en localStorage
  useEffect(() => {
    const existing = getCookieConsent();
    if (!existing) {
      setShowBanner(true);
    } else {
      setAnalyticsEnabled(existing.analytics);
      setMarketingEnabled(existing.marketing);
      syncConsentedThirdPartyScripts(existing);
    }
  }, []);

  // Escuchar evento global para abrir configuración desde Footer u otros puntos
  useEffect(() => {
    const handleOpenSettings = () => {
      const existing = getCookieConsent();
      setAnalyticsEnabled(existing ? existing.analytics : false);
      setMarketingEnabled(existing ? existing.marketing : false);
      setIsModalOpen(true);
    };

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings);
    return () => {
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings);
    };
  }, []);

  // Accesibilidad del modal: ESC para cerrar y foco inicial
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    const focusTimer = window.setTimeout(() => closeModalBtnRef.current?.focus(), 50);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const persistConsent = (analytics: boolean, marketing: boolean) => {
    const record: CookieConsentRecord = {
      version: COOKIE_CONSENT_VERSION,
      timestampUtc: new Date().toISOString(),
      necessary: true,
      analytics,
      marketing,
    };

    try {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(record));
    } catch {
      // Si localStorage no está disponible (modo privado estricto), continuar sin romper UX
    }

    setAnalyticsEnabled(analytics);
    setMarketingEnabled(marketing);
    setShowBanner(false);
    setIsModalOpen(false);
    syncConsentedThirdPartyScripts(record);
  };

  const handleAcceptAll = () => persistConsent(true, true);
  const handleRejectAll = () => persistConsent(false, false);
  const handleSaveCustom = () => persistConsent(analyticsEnabled, marketingEnabled);

  // Clase unificada para los 3 botones de primera capa (Cero Dark Patterns: idéntico peso, tamaño y contraste)
  const equalLayerButtonClass =
    'inline-flex items-center justify-center gap-1.5 w-full min-h-[44px] px-4 py-2.5 rounded-full text-sm font-medium border-2 border-nutri-forest bg-nutri-ivory text-nutri-forest transition-colors duration-200 hover:bg-nutri-forest hover:text-nutri-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold focus-visible:ring-offset-2 focus-visible:ring-offset-nutri-ivory';

  return (
    <>
      {/* =================================================================== */}
      {/* PRIMERA CAPA: Banner inferior discreto y elegante (Sin Dark Patterns) */}
      {/* =================================================================== */}
      {showBanner && !isModalOpen && (
        <aside
          role="region"
          aria-label="Aviso de privacidad y gestión de cookies"
          className="fixed bottom-4 inset-x-4 z-40 max-w-5xl mx-auto"
        >
          <div className="bg-nutri-ivory/95 backdrop-blur-md text-nutri-dark rounded-2xl border border-nutri-forest/20 shadow-2xl p-5 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="flex items-start gap-3.5 max-w-2xl">
                <div className="w-10 h-10 rounded-xl bg-nutri-forest/10 text-nutri-forest flex items-center justify-center shrink-0 border border-nutri-forest/15 mt-0.5">
                  <Cookie className="w-5 h-5 text-nutri-gold" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-title text-base sm:text-lg font-semibold text-nutri-forest leading-snug">
                    Tu privacidad y preferencias de cookies
                  </h2>
                  <p className="font-body text-xs sm:text-sm text-nutri-dark/80 leading-relaxed">
                    Usamos cookies técnicas estrictamente necesarias para el funcionamiento del sitio. No activamos cookies de analítica ni marketing sin tu consentimiento previo (Ley N° 21.719). Puedes revisar nuestra{' '}
                    <button
                      type="button"
                      onClick={() => openLegalModal('privacy')}
                      className="text-nutri-forest underline hover:text-nutri-gold font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold rounded-sm"
                    >
                      Política de Privacidad
                    </button>
                    .
                  </p>
                </div>
              </div>

              {/* Tres botones con exactamente el mismo peso visual, tamaño y jerarquía */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full lg:w-auto lg:min-w-[430px] shrink-0">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className={equalLayerButtonClass}
                >
                  Aceptar todo
                </button>
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className={equalLayerButtonClass}
                >
                  Rechazar todo
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className={equalLayerButtonClass}
                >
                  <SlidersHorizontal className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Configurar</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* =================================================================== */}
      {/* SEGUNDA CAPA: Modal de Configuración Granular                       */}
      {/* =================================================================== */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-nutri-dark/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="bg-nutri-ivory text-nutri-dark w-full max-w-2xl max-h-[88vh] rounded-3xl shadow-2xl border border-nutri-forest/20 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Cabecera */}
            <div className="flex items-center justify-between px-6 py-5 bg-nutri-forest text-nutri-ivory border-b border-nutri-forest/30">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-nutri-gold shrink-0" aria-hidden="true" />
                <h2
                  id="cookie-modal-title"
                  className="font-title text-xl sm:text-2xl font-normal tracking-wide"
                >
                  Configuración de Cookies
                </h2>
              </div>
              <button
                ref={closeModalBtnRef}
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Cerrar configuración de cookies"
                className="p-1.5 rounded-full text-nutri-ivory/80 hover:text-nutri-ivory hover:bg-nutri-ivory/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Cuerpo con scroll independiente de Lenis */}
            <div
              data-lenis-prevent
              className="px-6 sm:px-8 py-6 overflow-y-auto space-y-5 font-body text-sm text-nutri-dark/85 leading-relaxed"
            >
              <p className="text-xs sm:text-sm text-nutri-dark/80">
                Gestiona tus preferencias de privacidad conforme a la <strong>Ley N° 21.719</strong>. Las categorías opcionales permanecen desactivadas por defecto y puedes modificar o revocar tu decisión en cualquier momento desde el pie de página.
              </p>

              {/* Categoría 1: Técnicas / Estrictamente Necesarias */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/75 border border-nutri-forest/15 space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-nutri-sage shrink-0" aria-hidden="true" />
                    <h3 className="font-title text-base font-semibold text-nutri-forest">
                      Cookies Técnicas / Estrictamente Necesarias
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-nutri-forest bg-nutri-sage/15 px-2.5 py-1 rounded-full">
                      Siempre activas
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={true}
                      aria-label="Cookies técnicas siempre activas"
                      disabled
                      className="relative inline-flex h-6 w-11 items-center rounded-full bg-nutri-forest/70 opacity-80 cursor-not-allowed"
                    >
                      <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-nutri-ivory transition-transform" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-nutri-dark/75 leading-relaxed">
                  Se utilizan exclusivamente para recordar preferencias técnicas esenciales del sitio web, como tu elección en este panel de consentimiento, garantizando una navegación segura y estable.
                </p>
              </div>

              {/* Categoría 2: Analítica y Rendimiento */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/75 border border-nutri-forest/15 space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-title text-base font-semibold text-nutri-forest">
                    Analítica y Rendimiento
                  </h3>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={analyticsEnabled}
                    aria-label="Activar o desactivar cookies de analítica y rendimiento"
                    onClick={() => setAnalyticsEnabled((prev) => !prev)}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold focus-visible:ring-offset-2 ${
                      analyticsEnabled ? 'bg-nutri-forest' : 'bg-nutri-forest/25'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-nutri-ivory shadow-sm transition-transform duration-200 ${
                        analyticsEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-nutri-dark/75 leading-relaxed">
                  Permiten medir de forma agregada el rendimiento y uso del sitio para mejorar la experiencia educativa. Desactivadas por defecto; nunca se ejecutan sin tu autorización previa.
                </p>
              </div>

              {/* Categoría 3: Marketing y Terceros */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/75 border border-nutri-forest/15 space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-title text-base font-semibold text-nutri-forest">
                    Marketing y Terceros
                  </h3>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={marketingEnabled}
                    aria-label="Activar o desactivar cookies de marketing y terceros"
                    onClick={() => setMarketingEnabled((prev) => !prev)}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nutri-gold focus-visible:ring-offset-2 ${
                      marketingEnabled ? 'bg-nutri-forest' : 'bg-nutri-forest/25'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-nutri-ivory shadow-sm transition-transform duration-200 ${
                        marketingEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-nutri-dark/75 leading-relaxed">
                  Destinadas a eventuales integraciones de difusión o medición externa (como Meta Pixel). Desactivadas por defecto y bloqueadas hasta que decidas habilitarlas.
                </p>
              </div>
            </div>

            {/* Pie del Modal: Botones con igual peso visual */}
            <div className="px-6 py-4 bg-nutri-forest/5 border-t border-nutri-forest/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleRejectAll}
                className={equalLayerButtonClass}
              >
                Rechazar opcionales
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className={equalLayerButtonClass}
              >
                Guardar preferencias
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsentManager;
