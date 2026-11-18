import { ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface LayoutProps {
  children?: ReactNode;
  /** Optional callback or custom link handler if integrated with router (Next.js/React Router) */
  onNavigate?: (href: string) => void;
}

