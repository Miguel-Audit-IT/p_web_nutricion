import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface FadeInUpProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

/**
 * Contenedor con animación de entrada suave hacia arriba al hacer scroll (scroll-triggered).
 */
export const FadeInUp: React.FC<FadeInUpProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  distance = 24,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export interface FloatingBadgeProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  amplitude?: number;
  duration?: number;
  className?: string;
}

/**
 * Flotación sutil continua y elegante (loop infinito sin fin brusco) para badges e insignias.
 */
export const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  children,
  amplitude = 4,
  duration = 4,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export interface HoverCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  lift?: number;
  className?: string;
}

/**
 * Contenedor interactivo con elevación suave en hover.
 */
export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  lift = -6,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ y: lift }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

