# Jeanette Ajata Cutipa — Nutrición y Bienestar (MVP v1.0)

Plataforma web profesional para **Jeanette Ajata Cutipa**, Licenciada en Nutrición (Bolivia) y educadora alimentaria en Calama (Chile). Diseñada con estética **"Natural Premium"**, rigurosidad técnica en **React + TypeScript + Tailwind CSS** y estricto **blindaje legal y regulatorio sanitario**.

---

## ⚖️ Marco Normativo y Blindaje Legal Médico

La plataforma incorpora un **Gatekeeper Legal** y modales de cumplimiento interactivos respetando la legislación vigente:

1. **Ley N° 21.719 (Protección de Datos Personales en Chile)**:
   - **Principio de Minimización:** Prohibición expresa de solicitar datos sensibles de salud (patologías, diagnósticos, peso o fármacos) a través del formulario web abierto.
   - **Consentimiento Informado:** Casilla de verificación obligatoria para el tratamiento de datos de contacto iniciales.
   - **Derechos ARCO:** Información detallada para el ejercicio de los derechos de Acceso, Rectificación, Cancelación y Oposición.
2. **Ley N° 21.663 (Ley Marco de Ciberseguridad)**:
   - Cifrado de extremo a extremo en tránsito (HTTPS/TLS) y buenas prácticas en la no exposición de endpoints o datos de leads.
3. **Ley N° 20.584 (Derechos y Deberes de las Personas en Salud)** y **Código Sanitario (DFL N° 725)**:
   - **Transparencia Activa:** Declaración explícita del origen del título universitario (Bolivia) y del proceso formal de convalidación académica en Chile.
   - **Diferenciación Territorial Obligatoria:**
     - **Bolivia:** Telemedicina nutricional clínica integral (amparada bajo habilitación legal en origen).
     - **Chile:** Servicios orientados exclusivamente a la educación alimentaria, asesoría en hábitos y compras conscientes (sin prescripción clínica ni sustitución médica).

---

## 🎨 Paleta de Colores Semántica (Tailwind CSS)

| Token | Hex | Uso Semántico |
| :--- | :--- | :--- |
| `nutri-dark` | `#00070A` | Textos principales (contraste WCAG AAA > 11:1) |
| `nutri-olive` | `#282B1B` | Fondos oscuros institucionales (AboutSection y Footer) |
| `nutri-forest` | `#283B28` | Títulos, branding, badges clínicos y botones activos |
| `nutri-sage` | `#4E6A5B` | Botones primarios (CTA) y acentos de confianza |
| `nutri-ivory` | `#E0DED1` | Fondo principal (reemplaza el blanco clínico estéril) |
| `nutri-gold` | `#A68D4A` | Acentos dorados, microinteracciones y checkmarks |

---

## 🏛️ Arquitectura Modular del Proyecto

```text
.github/
└── workflows/
    └── deploy.yml              # Pipeline CI/CD GitHub Actions para GitHub Pages
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Barra superior sticky con efecto scroll blur y menú accesible
│   │   ├── Footer.tsx          # Pie de página de 3 columnas con modales legales interactivos
│   │   └── Layout.tsx          # Wrapper semántico (<header>, <main>, <footer>) + SkipLink + Context
│   ├── legal/
│   │   └── LegalModal.tsx      # Modales accesibles: Privacidad (21.719/21.663), Términos y Ley 20.584
│   ├── sections/
│   │   ├── HeroSection.tsx     # Hero con propuesta de valor y segmentación inicial
│   │   ├── ServicesSection.tsx # Comparativa de atención: Telemedicina Bolivia vs. Educación Chile
│   │   ├── AboutSection.tsx    # Historia, formación y los 3 pilares de filosofía (fondo Nutri-Olive)
│   │   └── ContactSection.tsx  # Formulario con Gatekeeper Legal (sin datos sensibles) -> WhatsApp
│   └── seo/
│       └── SeoHead.tsx         # Metadatos dinámicos y Schema.org JSON-LD (HealthAndBeautyBusiness)
├── types/
│   └── index.ts                # Interfaces TypeScript del sistema
├── App.tsx                     # Ensamblado del MVP v1.0
├── index.css                   # Tailwind directives y utilidades WCAG
└── main.tsx                    # Punto de entrada React 18
```

---

## 🚀 Despliegue Automático en GitHub Pages (CI/CD)

El proyecto incluye `.github/workflows/deploy.yml` y `vite.config.ts` preconfigurados con rutas relativas (`base: './'`).

### Pasos para publicar en producción:

1. **Crear el repositorio en GitHub**:
   Crea un nuevo repositorio en tu cuenta de GitHub (ej. `P_WEB_NUTRICION` o `nutricion-jeanette-ajata`).

2. **Vincular el repositorio remoto local**:
   ```bash
   git remote add origin https://github.com/<TU_USUARIO>/<TU_REPOSITORIO>.git
   git push -u origin main
   ```

3. **Habilitar GitHub Pages en el repositorio**:
   - En GitHub, ve a **Settings** -> **Pages**.
   - En **Build and deployment** -> **Source**, selecciona **GitHub Actions**.

¡Listo! Cada vez que ejecutes `git push`, GitHub Actions compilará automáticamente el proyecto y lo publicará con certificado SSL/HTTPS activo en:
`https://<TU_USUARIO>.github.io/<TU_REPOSITORIO>/`
