/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nutri-dark': '#00070A',    // Para textos principales
        'nutri-olive': '#282B1B',   // Para fondos oscuros como el footer
        'nutri-forest': '#283B28',  // Para títulos y logos
        'nutri-sage': '#4E6A5B',    // Para botones primarios e iconos
        'nutri-ivory': '#E0DED1',   // Para el fondo principal de la página, reemplaza el blanco puro
        'nutri-gold': '#A68D4A',    // Para acentos y hovers
      },
      fontFamily: {
        title: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

