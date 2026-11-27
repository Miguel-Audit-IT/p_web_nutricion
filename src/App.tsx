import SeoHead from './components/seo/SeoHead';
import Layout from './components/layout/Layout';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import FocusAreasSection from './components/sections/FocusAreasSection';
import MethodologySection from './components/sections/MethodologySection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import { FadeInUp } from './components/ui/MotionPrimitives';
import { SmoothScrollProvider } from './components/ui/SmoothScrollProvider';
import { EditorialPreloader } from './components/ui/EditorialPreloader';
import { CookieConsentManager } from './components/ui/CookieConsentManager';

export function App() {
  return (
    <SmoothScrollProvider>
      {/* Datos estructurados Schema.org JSON-LD y metadatos SEO */}
      <SeoHead />

      {/* Layout Base con Navbar Sticky, Main Semántico y Footer de 3 Columnas */}
      <Layout>
        {/* Hero Section (id="inicio") */}
        <HeroSection whatsappNumber="56900000000" />

        {/* Modalidades de Atención: Bolivia vs Chile (id="servicios") */}
        <FadeInUp>
          <ServicesSection whatsappNumber="56900000000" />
        </FadeInUp>

        {/* Áreas de Enfoque con Tabs Interactivos (id="areas-enfoque") */}
        <FadeInUp>
          <FocusAreasSection />
        </FadeInUp>

        {/* Metodología en 3 Pasos con Scrollytelling & Pinning en Desktop (id="metodologia") */}
        <MethodologySection />

        {/* Sobre Mí: Historia, Formación y 3 Pilares (id="sobre-mi") */}
        <FadeInUp>
          <AboutSection />
        </FadeInUp>

        {/* Contacto y Reserva con Gatekeeper Legal (id="contacto") */}
        <FadeInUp>
          <ContactSection whatsappNumber="56900000000" />
        </FadeInUp>

        {/* Gestor de Consentimiento de Cookies (Ley N° 21.719, dentro de LegalModalProvider) */}
        <CookieConsentManager />
      </Layout>

      {/* Preloader Editorial de Lujo (se monta al final para cubrir el navbar z-50 y se desmonta al completar) */}
      <EditorialPreloader />
    </SmoothScrollProvider>
  );
}

export default App;
