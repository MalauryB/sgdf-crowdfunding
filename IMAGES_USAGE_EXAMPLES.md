# Guide d'usage des images pour GitHub Pages

## 1. Avec Next.js `<Image />` (Recommandé)
```tsx
import Image from 'next/image';

// ✅ CORRECT - Next.js ajoute automatiquement le basePath
function MyComponent() {
  return (
    <Image
      src="/renovation_local_scout_toulouse.png"
      alt="Rénovation local"
      width={400}
      height={300}
    />
  );
}
```

## 2. Avec `<img>` standard
```tsx
import { getAssetPath } from '@/lib/utils';

// ✅ CORRECT - Utilise getAssetPath()
function MyComponent() {
  return (
    <img
      src={getAssetPath('/renovation_local_scout_toulouse.png')}
      alt="Rénovation local"
    />
  );
}
```

## 3. Dans les données (objets)
```tsx
import { getAssetPath } from '@/lib/utils';

const projects = [
  {
    id: "1",
    title: "Camp d'été",
    // ✅ CORRECT - Utilise getAssetPath() dans les données
    image: getAssetPath('/ardèche.png'),
  }
];
```

## 4. CSS background-image
```tsx
import { getAssetPath } from '@/lib/utils';

function HeroSection() {
  const bgImage = getAssetPath('/hero-background.jpg');

  return (
    <div
      className="hero"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      Contenu
    </div>
  );
}
```

## 5. CSS via Tailwind (avec variables CSS)
```css
/* Dans votre CSS global */
:root {
  --asset-prefix: '';
}

[data-github-pages] {
  --asset-prefix: '/sgdf-crowdfunding';
}

.hero-bg {
  background-image: url(var(--asset-prefix)/hero-background.jpg);
}
```

## Points clés à retenir

- **`<Image />`** : Pas besoin de `getAssetPath()`, Next.js le fait automatiquement
- **`<img>`, CSS, objets de données** : Toujours utiliser `getAssetPath()`
- **Développement local** : `getAssetPath()` retourne le chemin normal sans préfixe
- **GitHub Pages** : `getAssetPath()` ajoute automatiquement `/sgdf-crowdfunding`