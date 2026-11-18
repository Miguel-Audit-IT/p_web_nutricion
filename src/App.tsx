import SeoHead from './components/seo/SeoHead';
import Layout from './components/layout/Layout';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';

export function App() {
  return (
    <>
      {/* Datos estructurados Schema.org JSON-LD y metadatos SEO */}
      <SeoHead />

      {/* Layout Base con Navbar Sticky, Main Semántico y Footer de 3 Columnas */}
      <Layout>
        <HeroSection whatsappNumber="56900000000" />
        <ServicesSection whatsappNumber="56900000000" />
        <AboutSection />
        <ContactSection whatsappNumber="56900000000" />
      </Layout>
    </>
  );
}

export default App;
