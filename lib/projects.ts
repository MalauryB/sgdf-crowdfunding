/**
 * Utilitaires pour extraire automatiquement les IDs de projets depuis les données mockées
 */

/**
 * Extrait récursivement tous les IDs des objets ayant une propriété 'id'
 */
function extractIds(obj: any): string[] {
  const ids: string[] = [];

  if (obj && typeof obj === 'object') {
    // Si l'objet a une propriété id, l'ajouter
    if (obj.id) {
      ids.push(String(obj.id));
    }

    // Parcourir récursivement toutes les propriétés
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (Array.isArray(obj[key])) {
          // Si c'est un tableau, parcourir chaque élément
          obj[key].forEach((item: any) => {
            ids.push(...extractIds(item));
          });
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          // Si c'est un objet, extraire récursivement
          ids.push(...extractIds(obj[key]));
        }
      }
    }
  }

  return ids;
}

/**
 * Extrait tous les IDs de projets depuis les données mockées de l'application
 */
export function getAllProjectIds(): string[] {
  // IDs trouvés dans app/page.tsx
  const homePageIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];

  // IDs trouvés dans app/projects/page.tsx
  const projectsPageIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // IDs trouvés dans app/my-projects/page.tsx
  const myProjectsIds = ['1', '2', '3', '4', '5'];

  // IDs trouvés dans app/favorites/page.tsx
  const favoritesIds = ['1', '2', '3', '4'];

  // IDs trouvés dans app/validation/page.tsx
  const validationIds = ['1', '2', '3'];

  const allIds = [...homePageIds, ...projectsPageIds, ...myProjectsIds, ...favoritesIds, ...validationIds];

  // Supprimer les doublons et trier numériquement
  const uniqueIds = [...new Set(allIds)]
    .map(id => parseInt(id))
    .filter(id => !isNaN(id))
    .sort((a, b) => a - b)
    .map(id => String(id));

  return uniqueIds;
}

/**
 * Génère les paramètres statiques pour Next.js
 */
export function generateProjectStaticParams() {
  const allIds = getAllProjectIds();

  return allIds.map(id => ({
    id: id
  }));
}