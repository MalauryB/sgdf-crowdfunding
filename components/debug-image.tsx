/**
 * Composant de debug pour tester les chemins d'images
 * À supprimer une fois que les images fonctionnent
 */

import { getAssetPath } from "@/lib/utils";

export function DebugImage({ src, alt }: { src: string, alt: string }) {
  const computedPath = getAssetPath(src);

  return (
    <div className="border-2 border-dashed border-red-300 p-4 m-2">
      <p><strong>Debug Image:</strong></p>
      <p><strong>Chemin original:</strong> {src}</p>
      <p><strong>Chemin calculé:</strong> {computedPath}</p>
      <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
      <p><strong>Window exists:</strong> {typeof window !== 'undefined' ? 'yes' : 'no'}</p>
      {typeof window !== 'undefined' && (
        <p><strong>Current URL:</strong> {window.location.href}</p>
      )}

      <img
        src={computedPath}
        alt={alt}
        onError={(e) => {
          console.error('Image failed to load:', computedPath);
          e.currentTarget.style.border = '2px solid red';
        }}
        onLoad={() => {
          console.log('Image loaded successfully:', computedPath);
        }}
        style={{ maxWidth: '200px', marginTop: '10px' }}
      />
    </div>
  );
}