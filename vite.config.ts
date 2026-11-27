import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Enrutamiento relativo para despliegue sin fricción en GitHub Pages
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion', 'gsap', 'lenis'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
