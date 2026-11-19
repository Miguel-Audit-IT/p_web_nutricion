import SeoHead from './components/seo/SeoHead';
import Layout from './components/layout/Layout';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import FocusAreasSection from './components/sections/FocusAreasSection';
import MethodologySection from './components/sections/MethodologySection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import { FadeInUp } from './components/ui/MotionPrimitives';

export function App() {
  return (
    <>
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

        {/* Metodología en 3 Pasos: ¿Cómo trabajamos juntos? (id="metodologia") */}
        <FadeInUp>
          <MethodologySection />
        </FadeInUp>

        {/* Sobre Mí: Historia, Formación y 3 Pilares (id="sobre-mi") */}
        <FadeInUp>
          <AboutSection />
        </FadeInUp>

        {/* Contacto y Reserva con Gatekeeper Legal (id="contacto") */}
        <FadeInUp>
          <ContactSection whatsappNumber="56900000000" />
        </FadeInUp>
      </Layout>
    </>
  );
}

export default App;
