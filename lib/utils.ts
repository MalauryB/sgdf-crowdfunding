import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Génère le chemin correct pour les assets en tenant compte du basePath
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production'
    ? (process.env.GITHUB_ACTIONS === 'true' ? '/sgdf-crowdfunding' : '')
    : '';

  // Assurer que le chemin commence par /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${basePath}${normalizedPath}`;
}
