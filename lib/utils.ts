import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Génère le chemin correct pour les liens de navigation en tenant compte du basePath
 * Utilisez cette fonction UNIQUEMENT pour les liens href, pas pour les images
 */
export function getAssetPath(path: string): string {
  // En dev, pas de basePath
  if (process.env.NODE_ENV === 'development') {
    return path.startsWith('/') ? path : `/${path}`;
  }

  // En production, TOUJOURS utiliser le basePath pour GitHub Pages
  // (plus simple et évite les problèmes d'hydratation)
  const basePath = '/sgdf-crowdfunding';
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${basePath}${normalizedPath}`;
}

/**
 * Génère le chemin correct pour les images et assets statiques
 * Next.js gère automatiquement le basePath pour les assets, pas besoin de l'ajouter manuellement
 */
export function getImagePath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

/**
 * Constante pour le préfixe des assets (utile dans les templates/CSS)
 */
export const ASSET_PREFIX = typeof window !== 'undefined'
  ? '' // Côté client, les chemins sont déjà résolus
  : process.env.NODE_ENV === 'production' && process.env.GITHUB_ACTIONS === 'true'
    ? '/sgdf-crowdfunding'
    : '';
