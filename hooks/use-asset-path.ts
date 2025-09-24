import { useState, useEffect } from 'react';

/**
 * Hook pour gérer les chemins d'assets de manière cohérente côté client/serveur
 */
export function useAssetPath() {
  const [basePath, setBasePath] = useState('');

  useEffect(() => {
    // Côté client, détecter si on est sur GitHub Pages
    const isGitHubPages = window.location.hostname.includes('.github.io');
    setBasePath(isGitHubPages ? '/sgdf-crowdfunding' : '');
  }, []);

  const getAssetPath = (path: string) => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    // En SSR ou avant hydratation, on assume GitHub Pages si on est en production
    if (typeof window === 'undefined') {
      const serverBasePath = process.env.NODE_ENV === 'production'
        ? '/sgdf-crowdfunding'
        : '';
      return `${serverBasePath}${normalizedPath}`;
    }

    return `${basePath}${normalizedPath}`;
  };

  return getAssetPath;
}