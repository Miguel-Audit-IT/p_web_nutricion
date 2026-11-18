import React, { useEffect } from 'react';

export interface SeoHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

/**
 * Componente SEO y Datos Estructurados Schema.org
 * 
 * Enfoque Legal-Médico:
 * - Emplea el tipo "HealthAndBeautyBusiness" en conformidad con el marco regulatorio
 *   sanitario de Chile (DFL N° 725 Código Sanitario y Ley N° 20.584), evitando
 *   la tipificación de "MedicalBusiness" en territorio nacional antes de la finalización
 *   del proceso de revalidación/convalidación universitaria.
 * - Segmenta claramente el área de servicio: Telemedicina clínica hacia Bolivia y
 *   Educación Alimentaria y Hábitos en Chile.
 */
export const SeoHead: React.FC<SeoHeadProps> = ({
  title = 'Jeanette Ajata | Nutrición, Hábitos y Bienestar',
  description = 'Nutricionista titulada en Bolivia brindando Telemedicina internacional y Asesorías de Educación Alimentaria y hábitos en Calama, Chile.',
  canonicalUrl = 'https://jeanetteajata.com',
  ogImage = '/og-image.jpg',
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: 'Jeanette Ajata - Nutrición y Bienestar',
    description: description,
    url: canonicalUrl,
    image: ogImage,
    areaServed: [
      'Bolivia (Atención Clínica Online)',
      'Chile (Educación Alimentaria)',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Calama',
      addressRegion: 'Región de Antofagasta',
      addressCountry: 'CL',
    },
    founder: {
      '@type': 'Person',
      name: 'Jeanette Ajata',
      jobTitle: 'Nutricionista (Titulada en Bolivia) - Educadora Alimentaria en Chile',
      knowsAbout: [
        'Educación Alimentaria',
        'Hábitos Saludables',
        'Nutrición y Bienestar',
        'Telemedicina Nutricional Internacional',
      ],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Nutrición y Asesoría',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Telemedicina Nutricional Internacional (Pacientes Bolivia)',
            description:
              'Atención y consulta nutricional clínica online para pacientes con residencia en Bolivia.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Programa de Educación Alimentaria y Hábitos (Calama, Chile)',
            description:
              'Asesorías presenciales u online en Calama enfocadas en hábitos saludables, compras conscientes y estilo de vida.',
          },
        },
      ],
    },
  };

  useEffect(() => {
    // 1. Actualizar título de la página
    document.title = title;

    // 2. Helper para inyectar/actualizar etiquetas meta
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let meta = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrVal);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:locale', 'es_CL');
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);

    // 3. Inyectar o actualizar Schema JSON-LD en el <head>
    const scriptId = 'seo-structured-data-ldjson';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(structuredData);

    return () => {
      // Limpieza preventiva si el componente se desmonta
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, canonicalUrl, ogImage]);

  return (
    // También renderizamos el script en el DOM del componente para compatibilidad con SSR / prerenderers
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default SeoHead;

