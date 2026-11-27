import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextValue {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({ lenis: null });

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.01 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    setLenisInstance(lenis);

    // Sincronizar Lenis con GSAP ScrollTrigger
    const handleLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleLenisScroll);

    const handleTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(handleTicker);
    gsap.ticker.lagSmoothing(0);

    // Interceptar clics en enlaces internos con ancla (#inicio, #servicios, #areas-enfoque, #metodologia, #sobre-mi, #contacto, etc.)
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const destination = document.querySelector<HTMLElement>(href);
      if (!destination) return;

      event.preventDefault();

      const offset = href === '#inicio' ? 0 : -76;
      lenis.scrollTo(destination, {
        offset,
        duration: prefersReducedMotion ? 0 : 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', href);
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Recalcular ScrollTrigger tras la carga inicial de fuentes/imágenes
    const refreshTimeout = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      window.clearTimeout(refreshTimeout);
      document.removeEventListener('click', handleAnchorClick);
      lenis.off('scroll', handleLenisScroll);
      gsap.ticker.remove(handleTicker);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScrollProvider;
