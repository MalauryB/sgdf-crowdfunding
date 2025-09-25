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
 * En production, Next.js gère automatiquement le basePath via assetPrefix
 * En développement, on utilise les chemins simples
 */
export function getImagePath(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // En production, Next.js ajoute automatiquement l'assetPrefix
  // donc on retourne juste le chemin normalisé
  return normalizedPath;
}

/**
 * Map des projets avec des extensions spéciales
 */
const PROJECT_EXTENSIONS: Record<string, string> = {
  'materiel-nautique-carnac': 'jpg',
  // Ajouter d'autres projets avec des extensions non-PNG ici
};

/**
 * Génère le chemin de l'image principale d'un projet (image_1)
 * @param projectSlug - Le slug du projet (ex: "camp-ete-ardeche")
 * @param extension - L'extension du fichier (auto-détectée ou spécifiée)
 * @returns Le chemin vers l'image principale du projet
 */
export function getProjectMainImage(projectSlug: string, extension?: string): string {
  const ext = extension || PROJECT_EXTENSIONS[projectSlug] || 'png';
  return `/projects/${projectSlug}/image_1.${ext}`;
}

/**
 * Génère la liste des chemins d'images d'un projet pour la galerie
 * @param projectSlug - Le slug du projet
 * @param imageCount - Nombre d'images disponibles
 * @param extension - L'extension des fichiers (auto-détectée ou spécifiée)
 * @returns Un tableau des chemins d'images
 */
export function getProjectImages(projectSlug: string, imageCount: number = 4, extension?: string): string[] {
  const ext = extension || PROJECT_EXTENSIONS[projectSlug] || 'png';
  const images = [];
  for (let i = 1; i <= imageCount; i++) {
    images.push(`/projects/${projectSlug}/image_${i}.${ext}`);
  }
  return images;
}

/**
 * Constante pour le préfixe des assets (utile dans les templates/CSS)
 */
export const ASSET_PREFIX = typeof window !== 'undefined'
  ? '' // Côté client, les chemins sont déjà résolus
  : process.env.NODE_ENV === 'production' && process.env.GITHUB_ACTIONS === 'true'
    ? '/sgdf-crowdfunding'
    : '';
