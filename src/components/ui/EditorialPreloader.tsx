import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export interface EditorialPreloaderProps {
  onComplete?: () => void;
}

export const EditorialPreloader: React.FC<EditorialPreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const curtainRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
          onComplete?.();
        },
      });

      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center center' });
      gsap.set(titleRef.current, { yPercent: 100, opacity: 0 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 8 });

      tl.to(titleRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'power3.out',
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.35'
        )
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.inOut',
          },
          '-=0.4'
        )
        .to(
          [titleRef.current, subtitleRef.current, lineRef.current],
          {
            opacity: 0,
            y: -14,
            duration: 0.35,
            ease: 'power2.in',
          },
          '+=0.1'
        )
        .to(
          curtainRef.current,
          {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.inOut',
          },
          '-=0.15'
        );
    }, curtainRef);

    return () => {
      ctx.revert();
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={curtainRef}
      role="status"
      aria-label="Cargando sitio web de Jeanette Ajata Nutrición"
      className="fixed inset-0 z-50 bg-nutri-forest flex flex-col items-center justify-center px-6 select-none"
    >
      <div className="flex flex-col items-center text-center max-w-md w-full">
        <div className="overflow-hidden">
          <div
            ref={titleRef}
            className="font-title text-nutri-ivory text-3xl sm:text-4xl md:text-5xl tracking-wide font-normal"
          >
            Jeanette Ajata
          </div>
        </div>

        <div className="w-44 sm:w-56 h-[1.5px] bg-nutri-ivory/15 mt-5 overflow-hidden rounded-full">
          <div
            ref={lineRef}
            className="w-full h-full bg-nutri-gold origin-center"
            aria-hidden="true"
          />
        </div>

        <p
          ref={subtitleRef}
          className="mt-4 font-body text-[11px] sm:text-xs uppercase tracking-[0.28em] text-nutri-ivory/75"
        >
          Nutrición y Bienestar
        </p>
      </div>
    </div>
  );
};

export default EditorialPreloader;
