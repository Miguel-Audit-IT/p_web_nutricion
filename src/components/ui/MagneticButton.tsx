import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.3,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Solo activar en dispositivos con puntero fino (desktop) y sin reduced motion
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(element, 'x', {
        duration: 0.45,
        ease: 'power3.out',
      });
      const yTo = gsap.quickTo(element, 'y', {
        duration: 0.45,
        ease: 'power3.out',
      });

      const handleMouseMove = (event: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const relX = event.clientX - (rect.left + rect.width / 2);
        const relY = event.clientY - (rect.top + rect.height / 2);

        xTo(relX * strength);
        yTo(relY * strength);
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.85,
          ease: 'elastic.out(1, 0.3)',
          overwrite: 'auto',
        });
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [strength]);

  return (
    <div ref={containerRef} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
};

export default MagneticButton;
