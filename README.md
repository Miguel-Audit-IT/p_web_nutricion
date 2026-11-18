# Clínica de Nutrición Jeanette Ajata — Layout Base

Diseño y desarrollo del Layout base (Navbar y Footer) con estética **"Natural Premium"**, combinando autoridad médica, rigor clínico y serenidad natural.

---

## 🎨 Paleta de Colores Semántica (Tailwind CSS)

Definida y extendida en `tailwind.config.js`:

| Token | Hex | Uso Semántico |
| :--- | :--- | :--- |
| `nutri-dark` | `#00070A` | Textos principales, alto contraste y legibilidad |
| `nutri-olive` | `#282B1B` | Fondos oscuros institucionales (Footer) |
| `nutri-forest` | `#283B28` | Títulos, branding, logos y estados activos |
| `nutri-sage` | `#4E6A5B` | Botones primarios de acción (CTA) e iconos |
| `nutri-ivory` | `#E0DED1` | Fondo principal (reemplaza el blanco clínico estéril) |
| `nutri-gold` | `#A68D4A` | Acentos sutiles, microinteracciones y hovers |

---

## 🏛️ Arquitectura de Componentes

```text
src/
├── components/
│   └── layout/
│       ├── Navbar.tsx      # Barra sticky, scroll blur, menú desktop y mobile accesible
│       ├── Footer.tsx      # Footer semántico de 3 columnas + WhatsApp + Ley 20.584 + Copyright 2026
│       └── Layout.tsx      # Envoltorio semántico con SkipLink, Header, Main ({children}) y Footer
├── types/
│   └── index.ts            # Tipado TypeScript (NavItem, LayoutProps)
├── App.tsx                 # Demostración del layout con contenido clínico scrollable
├── index.css               # Directivas Tailwind, estilos WCAG y animación de enlace
└── main.tsx                # Punto de entrada React 18
```

---

## ♿ Accesibilidad (WCAG 2.1 Nivel AA/AAA)

1. **Estructura Semántica**:
   - Uso de `<header>`, `<nav>`, `<main id="main-content">`, `<footer>`, `<article>`, `<h1>`-`<h3>`.
2. **Navegación por Teclado y Screen Readers**:
   - Enlace oculto "Skip to content" al inicio de la página (`focus:not-sr-only`).
   - Todos los enlaces y botones poseen `focus-visible:ring-2 focus-visible:ring-nutri-gold`.
   - Soporte para cierre del menú móvil con la tecla `Escape`.
   - Bloqueo de scroll en body cuando el menú móvil está abierto para evitar pérdida de foco.
3. **Contraste de Colores**:
   - Texto `nutri-dark` sobre `nutri-ivory`: Contraste > 11:1 (Supera WCAG AAA).
   - Texto `nutri-ivory` sobre `nutri-olive`: Contraste > 9:1 (Supera WCAG AAA).
   - Botón `nutri-sage` con texto `nutri-ivory`: Contraste > 4.5:1 (Cumple WCAG AA).
4. **Atributos ARIA**:
   - Menú móvil con `aria-expanded`, `aria-controls` y `aria-label`.
   - SVGs e iconos decorativos con `aria-hidden="true"`.
   - Enlace a WhatsApp con `aria-label="Contactar por WhatsApp al +56 9 (abre en una pestaña nueva)"` y `rel="noopener noreferrer"`.

---

## 🚀 Integración con React Router

Para integrar con `react-router-dom`:

```tsx
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { SobreMi } from './pages/SobreMi';

export const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-mi" element={<SobreMi />} />
        {/* ... */}
      </Routes>
    </Layout>
  </BrowserRouter>
);
```

